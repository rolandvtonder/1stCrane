/**
 * Colour grades applied to the 2015 site photos so they read as one set.
 *
 * FILM  — the "dusk" look for the hero film and dark bands: midday skies are
 *         pulled down to slate, highlights come down with them, and the crane
 *         paint (yellow + lime) is protected so it still pops.
 * PHOTO — a gentle version of the same curve for photos on light sections.
 *
 * Masks are built from smoothsteps rather than thresholds; hard edges turn the
 * WhatsApp-compressed skies into posterised bands.
 */
const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const smooth = (e0, e1, x) => {
  const t = clamp((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
};

export const FILM = { exposure: 0.82, sky: 0.3, cloud: 0.3, warmKeep: 0.1, contrast: 1.06, sat: 0.88 };
export const PHOTO = { exposure: 0.98, sky: 0.08, cloud: 0.08, warmKeep: 0.02, contrast: 1.04, sat: 0.95 };

/** Grades an interleaved RGB buffer in place. */
export function grade(data, o = FILM) {
  const { exposure, sky, cloud, warmKeep, contrast, sat } = o;
  for (let i = 0; i < data.length; i += 3) {
    let r = data[i] / 255;
    let g = data[i + 1] / 255;
    let b = data[i + 2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const s = max > 0 ? (max - min) / max : 0;
    const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    const blue = smooth(-0.04, 0.34, b - Math.max(r, g * 0.9)); // sky
    const bright = smooth(0.5, 0.95, L); // clouds, haze, highlights
    const warm = smooth(0.04, 0.3, Math.min(r, g) - b) * smooth(0.3, 0.6, max) * smooth(0.35, 0.6, s); // crane paint

    // one continuous exposure curve: skies and highlights come down together
    const k = exposure - sky * blue * (0.4 + 0.6 * bright) - cloud * bright * (1 - warm) + warmKeep * warm;
    r *= k;
    g *= k;
    b *= k;

    const L2 = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const sMul = sat * (1 - 0.4 * blue) * (1 + 0.18 * warm);
    r = L2 + (r - L2) * sMul;
    g = L2 + (g - L2) * sMul;
    b = L2 + (b - L2) * sMul;
    r -= 0.008 * blue;
    b += 0.016 * blue;

    const P = 0.3; // low pivot keeps the contrast moody rather than punchy
    r = P + (r - P) * contrast;
    g = P + (g - P) * contrast;
    b = P + (b - P) * contrast;

    data[i] = clamp(r) * 255;
    data[i + 1] = clamp(g) * 255;
    data[i + 2] = clamp(b) * 255;
  }
  return data;
}
