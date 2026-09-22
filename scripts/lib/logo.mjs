import sharp from 'sharp';

/**
 * Cuts a logo drawn on solid black out of its background.
 *
 * The black is flood-filled in from the image edges, so dark areas enclosed
 * by the drawing (the cab window, the wheel hubs) stay solid. Within that
 * outside region, black is treated as "no paint": each pixel's alpha comes
 * from its brightest channel and its colour is un-darkened to match, which
 * keeps the soft glow around the shapes as a translucent halo instead of a
 * grey smudge. Returns an RGBA buffer trimmed to the drawing plus `pad`.
 */
export async function cutOutOnBlack(file, { edge = 60, pad = 12 } = {}) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const bright = (k) => Math.max(data[k * 3], data[k * 3 + 1], data[k * 3 + 2]);

  // 1. everything dark that connects to the border is background
  const outside = new Uint8Array(W * H);
  const stack = [];
  const visit = (x, y) => {
    const k = y * W + x;
    if (outside[k] || bright(k) > edge) return;
    outside[k] = 1;
    stack.push(k);
  };
  for (let x = 0; x < W; x++) visit(x, 0), visit(x, H - 1);
  for (let y = 0; y < H; y++) visit(0, y), visit(W - 1, y);
  while (stack.length) {
    const k = stack.pop();
    const x = k % W;
    const y = (k - x) / W;
    if (x > 0) visit(x - 1, y);
    if (x < W - 1) visit(x + 1, y);
    if (y > 0) visit(x, y - 1);
    if (y < H - 1) visit(x, y + 1);
  }

  // 2. background → transparent (colour-to-alpha against black)
  const rgba = Buffer.alloc(W * H * 4);
  let x0 = W, y0 = H, x1 = 0, y1 = 0;
  for (let k = 0; k < W * H; k++) {
    let r = data[k * 3], g = data[k * 3 + 1], b = data[k * 3 + 2], a = 255;
    if (outside[k]) {
      const m = Math.max(r, g, b);
      a = m <= 10 ? 0 : m;
      if (a) {
        const f = 255 / m;
        r = Math.min(255, Math.round(r * f));
        g = Math.min(255, Math.round(g * f));
        b = Math.min(255, Math.round(b * f));
      }
    }
    rgba[k * 4] = r;
    rgba[k * 4 + 1] = g;
    rgba[k * 4 + 2] = b;
    rgba[k * 4 + 3] = a;
    if (a > 24) {
      const x = k % W, y = (k - x) / W;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
  }

  // 3. trim to the drawing
  const left = Math.max(0, x0 - pad);
  const top = Math.max(0, y0 - pad);
  const width = Math.min(W, x1 + pad + 1) - left;
  const height = Math.min(H, y1 + pad + 1) - top;
  const buffer = await sharp(rgba, { raw: { width: W, height: H, channels: 4 } })
    .extract({ left, top, width, height })
    .png()
    .toBuffer();
  return { buffer, box: { left, top, width, height } };
}
