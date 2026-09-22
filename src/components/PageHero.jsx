import { photo } from '../data/photos.js';

/**
 * The dark band that opens every inner page: a dusk-graded still, a scrim on
 * the copy side, and the title sitting low on the left — the film's language
 * without the scroll.
 */
export default function PageHero({ eyebrow, title, intro, image, focus = '50% 50%', children }) {
  const p = photo(image);
  return (
    <section className="phero">
      <picture className="phero__media">
        <source media="(max-width: 700px)" srcSet={p.film.sm} />
        <img src={p.film.lg} alt="" width={p.w} height={p.h} style={{ objectPosition: focus }} fetchpriority="high" />
      </picture>
      <div className="phero__scrim" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <div className="phero__inner">
        <p className="phero__eyebrow">{eyebrow}</p>
        <h1 className="phero__title">
          {title.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h1>
        {intro && <p className="phero__intro">{intro}</p>}
        {children && <div className="phero__actions">{children}</div>}
      </div>
    </section>
  );
}
