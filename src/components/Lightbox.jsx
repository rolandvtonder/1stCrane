import { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';
import { photo } from '../data/photos.js';

/* <dialog> arrived in Safari 15.4. Before that, fall back to the [open]
   attribute and fire the close event ourselves. */
const isOpen = (d) => d.hasAttribute('open');
const openDialog = (d) => (typeof d.showModal === 'function' ? d.showModal() : d.setAttribute('open', ''));
const closeDialog = (d) => {
  if (typeof d.close === 'function') return d.close();
  d.removeAttribute('open');
  d.dispatchEvent(new Event('close'));
};

/**
 * Photo viewer on the native <dialog>: the browser handles the focus trap,
 * Esc to close and returning focus to the thumbnail. Arrow keys and swipes
 * step through; the buttons do the same for everyone else.
 */
export default function Lightbox({ items, index, onChange }) {
  const ref = useRef(null);
  const swipe = useRef(null);
  const swiped = useRef(false);
  const open = index !== null;
  const count = items.length;

  useEffect(() => {
    const d = ref.current;
    if (open && !isOpen(d)) {
      openDialog(d);
      document.documentElement.classList.add('is-locked');
    }
    if (!open && isOpen(d)) closeDialog(d);
  }, [open]);

  useEffect(() => {
    const d = ref.current;
    const onClose = () => {
      document.documentElement.classList.remove('is-locked');
      onChange(null);
    };
    d.addEventListener('close', onClose);
    return () => d.removeEventListener('close', onClose);
  }, [onChange]);

  const step = (dir) => onChange((i) => (i + dir + count) % count);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
    // the native Esc close can be skipped by the browser's close-request
    // rules, so don't rely on it
    if (e.key === 'Escape') {
      e.preventDefault();
      closeDialog(ref.current);
    }
  };

  const p = open ? photo(items[index]) : null;

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Photo viewer"
      onKeyDown={onKeyDown}
      onClick={(e) => {
        // a swipe ends in a click too — only a genuine tap on the backdrop closes
        if (swiped.current) return void (swiped.current = false);
        if (e.target === ref.current) closeDialog(ref.current);
      }}
      onPointerDown={(e) => (swipe.current = e.clientX)}
      onPointerUp={(e) => {
        if (swipe.current === null) return;
        const dx = e.clientX - swipe.current;
        swipe.current = null;
        if (Math.abs(dx) > 60) {
          swiped.current = true;
          step(dx < 0 ? 1 : -1);
        }
      }}
    >
      {p && (
        <figure className="lightbox__figure">
          <img src={p.src} srcSet={p.srcSet} sizes="92vw" width={p.w} height={p.h} alt={p.alt} />
          <figcaption className="lightbox__cap">
            <span>{p.caption}</span>
            <span className="lightbox__count">
              {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
            </span>
          </figcaption>
        </figure>
      )}
      <button className="lightbox__btn lightbox__close" onClick={() => closeDialog(ref.current)} aria-label="Close">
        <Icon name="close" size={22} />
      </button>
      <button className="lightbox__btn lightbox__prev" onClick={() => step(-1)} aria-label="Previous photo">
        <Icon name="chevronLeft" size={22} />
      </button>
      <button className="lightbox__btn lightbox__next" onClick={() => step(1)} aria-label="Next photo">
        <Icon name="chevronRight" size={22} />
      </button>
    </dialog>
  );
}
