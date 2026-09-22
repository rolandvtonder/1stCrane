import { Button, SectionTag } from './ui.jsx';
import { photo } from '../data/photos.js';
import { QUOTE_HREF, SITE } from '../data/site.js';

/** Full-bleed closing band on a dusk still — the "next step" of every page. */
export default function CtaBand({
  n = '08',
  title = ['Tell us what', 'you’re lifting.'],
  text = 'Cranes are available 24/7 for short and long-term hire across Southern Africa.',
  image = 'lime-crane',
  focus = '60% 35%',
  align = 'left',
}) {
  const p = photo(image);
  return (
    <section className={`cta${align === 'right' ? ' cta--right' : ''}`}>
      <picture className="cta__media">
        <source media="(max-width: 700px)" srcSet={p.film.sm} />
        <img src={p.film.lg} alt="" width={p.w} height={p.h} loading="lazy" style={{ objectPosition: focus }} />
      </picture>
      <div className="cta__scrim" aria-hidden="true" />
      <div className="cta__inner">
        <SectionTag n={n} className="tag--dark">
          Get in touch
        </SectionTag>
        <h2 className="cta__title">
          {title.map((line, i) => (
            <span key={i}>{line}</span>
          ))}
        </h2>
        <p className="cta__text">{text}</p>
        <div className="cta__actions">
          <Button href={QUOTE_HREF} variant="lime">
            Get a quote
          </Button>
          <Button href={SITE.phone.href} variant="ghost" icon="phone">
            Call {SITE.phone.display}
          </Button>
        </div>
      </div>
    </section>
  );
}
