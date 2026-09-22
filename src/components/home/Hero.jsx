import { useEffect, useRef, useState } from 'react';
import Icon from '../Icon.jsx';
import { HERO } from '../../data/hero.js';
import { SITE } from '../../data/site.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { url } from '../../url.js';

/* Large stills for desktops and high-density phones; keep in step with the
   preload tags in index.html. */
const SMALL_SCREEN = '(max-width: 700px) and (max-resolution: 1.49dppx)';

/**
 * The moving backdrop. Only the current photo and the one it is dissolving
 * from are visible (and composited); the rest wait hidden. The incoming photo
 * fades in on top, so there is never a dip to black between shots.
 */
function PhotoLoop({ current, previous, paused }) {
  return (
    <div className={`hero__loop${paused ? ' is-paused' : ''}`} aria-hidden="true">
      {HERO.shots.map((s, i) => (
        <picture
          key={s.name}
          className={`hero__shot${i === current ? ' is-on' : ''}${i === previous ? ' is-off' : ''}`}
          style={{ '--focus': s.focus, '--px': s.drift[0], '--py': s.drift[1] }}
        >
          <source media={SMALL_SCREEN} srcSet={url(`/film/${s.name}-sm.webp`)} />
          <img
            src={url(`/film/${s.name}-lg.webp`)}
            alt=""
            decoding="async"
            fetchpriority={i === 0 ? 'high' : 'low'}
          />
        </picture>
      ))}
    </div>
  );
}

export default function Hero() {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const reduce = useReducedMotion();
  const [shot, setShot] = useState({ current: 0, previous: -1 });
  const [onScreen, setOnScreen] = useState(true);
  const paused = reduce || !onScreen;
  const count = HERO.shots.length;

  // advance the loop; stops while off-screen, and never starts with reduced motion
  useEffect(() => {
    if (paused || HERO.video) return;
    const id = setInterval(() => setShot((s) => ({ previous: s.current, current: (s.current + 1) % count })), HERO.hold);
    return () => clearInterval(id);
  }, [paused, count]);

  useEffect(() => {
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (paused) v.pause();
    else v.play().catch(() => {});
  }, [paused]);

  const { lines, accent } = HERO.title;

  return (
    <section ref={ref} className="hero" aria-label="Introduction">
      {HERO.video ? (
        <video
          ref={videoRef}
          className="hero__video"
          src={url(HERO.video)}
          poster={url(`/film/${HERO.shots[0].name}-lg.webp`)}
          autoPlay={!reduce}
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <PhotoLoop current={shot.current} previous={shot.previous} paused={paused} />
      )}
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      {/* top-anchored, not vertically centred — it sits high in the frame */}
      <div className="hero__inner">
        <p className="hero__badge">
          <span className="hero__live" aria-hidden="true" />
          {HERO.badge[0]}
          <span className="hero__badge-more">{HERO.badge[1]}</span>
        </p>

        <h1 className="hero__title">
          {lines[0]}
          <br />
          {lines[1]} <em>{accent}</em>
        </h1>

        <p className="hero__sub">{HERO.sub}</p>

        <form className="hero__quote" action={url('/contact-us/#enquiry')} method="get">
          <label htmlFor="hero-job" className="sr-only">
            What do you need lifted?
          </label>
          <Icon name="crane" size={18} />
          <input id="hero-job" name="job" type="text" placeholder={HERO.placeholder} autoComplete="off" maxLength={300} />
          <button className="hero__go" type="submit">
            Get a quote
            <span aria-hidden="true">
              <Icon name="arrow" size={16} />
            </span>
          </button>
        </form>

        <a className="hero__call" href={SITE.phone.href}>
          <Icon name="phone" size={14} />
          Or call {SITE.phone.display}, day or night
        </a>
      </div>

      <div className="hero__strip">
        <p className="hero__strip-label">{HERO.strip.label}</p>
        <ul className="hero__strip-list">
          {HERO.strip.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
