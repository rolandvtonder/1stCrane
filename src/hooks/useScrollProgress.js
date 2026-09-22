import { useEffect, useRef } from 'react';

/*
 * One shared, rAF-throttled scroll/resize listener for every scroll-linked
 * element on the page, instead of one listener each.
 */
const items = new Set();
let queued = false;
let listening = false;

function run() {
  queued = false;
  const vh = window.innerHeight;
  for (const update of items) update(vh);
}
function queue() {
  if (queued) return;
  queued = true;
  requestAnimationFrame(run);
}
function listen() {
  if (listening) return;
  listening = true;
  window.addEventListener('scroll', queue, { passive: true });
  window.addEventListener('resize', queue);
}

const clamp = (v) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Progress while an element travels from 88% to 45% of the viewport. */
export const readingProgress = (rect, vh) => (vh * 0.88 - rect.top) / (vh * 0.43 + rect.height);

/** Progress through a tall section whose child is `position: sticky`. */
export const pinnedProgress = (rect, vh) => -rect.top / Math.max(1, rect.height - vh);

/**
 * Calls onChange(p) with 0–1 progress whenever it changes.
 * `measure(rect, viewportHeight)` defines what progress means for this element.
 */
export function useScrollProgress(ref, measure, onChange) {
  const cb = useRef(onChange);
  cb.current = onChange;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = -1;
    const update = (vh) => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -vh || rect.top > vh * 2) return; // far off-screen
      const p = Math.round(clamp(measure(rect, vh)) * 1000) / 1000;
      if (p !== last) {
        last = p;
        cb.current(p);
      }
    };
    items.add(update);
    listen();
    update(window.innerHeight);
    return () => items.delete(update);
  }, [ref, measure]);
}
