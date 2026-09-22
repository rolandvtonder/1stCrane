import { useCallback, useRef } from 'react';
import Icon from './Icon.jsx';
import { LOGO, photo } from '../data/photos.js';
import { useInView } from '../hooks/useInView.js';
import { readingProgress, useScrollProgress } from '../hooks/useScrollProgress.js';

/** The company logo, as supplied. */
export function Logo({ height = 56, className = '', eager = false }) {
  return (
    <img
      className={`logo ${className}`}
      src={LOGO.src}
      width={Math.round((LOGO.w / LOGO.h) * height)}
      height={height}
      alt="1st Crane Mining & Transport"
      decoding="async"
      loading={eager ? 'eager' : 'lazy'}
    />
  );
}

/**
 * Button-styled link: mono label plus a square arrow tab.
 * variant: dark (on light sections) · lime · light · ghost (on dark)
 */
export function Button({ href, children, variant = 'dark', icon = 'arrow', className = '', ...rest }) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag href={href} className={`btn btn--${variant} ${className}`} {...rest}>
      <span className="btn__label">{children}</span>
      <span className="btn__icon" aria-hidden="true">
        <Icon name={icon} size={18} />
      </span>
    </Tag>
  );
}

/** "(S.01) ABOUT US" — the numbered section tag. */
export function SectionTag({ n, children, className = '' }) {
  return (
    <p className={`tag ${className}`}>
      <span className="tag__n">(S.{n})</span>
      <span className="tag__label">{children}</span>
    </p>
  );
}

/**
 * A statement whose words fill in as it scrolls through the viewport.
 * One CSS variable per element drives every word's opacity.
 */
export function RevealText({ as: Tag = 'h2', children, className = '' }) {
  const ref = useRef(null);
  const words = String(children).split(/\s+/);
  const onChange = useCallback((p) => ref.current?.style.setProperty('--p', p), []);
  useScrollProgress(ref, readingProgress, onChange);
  return (
    <Tag ref={ref} className={`reveal-text ${className}`} style={{ '--n': words.length }}>
      {words.map((w, i) => (
        <span key={i} className="rw" style={{ '--i': i }}>
          {w}{' '}
        </span>
      ))}
    </Tag>
  );
}

/** Fades its children up the first time they scroll into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' is-in' : ''} ${className}`}
      style={delay ? { '--d': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Responsive photo with intrinsic size reserved (no layout shift). */
export function Photo({ name, sizes = '100vw', className = '', eager = false, caption, alt }) {
  const p = photo(name);
  const img = (
    <img
      src={p.src}
      srcSet={p.srcSet}
      sizes={sizes}
      width={p.w}
      height={p.h}
      alt={alt ?? p.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
  if (!caption) return <div className={`photo ${className}`}>{img}</div>;
  return (
    <figure className={`photo ${className}`}>
      {img}
      <figcaption className="photo__cap">{caption === true ? p.caption : caption}</figcaption>
    </figure>
  );
}
