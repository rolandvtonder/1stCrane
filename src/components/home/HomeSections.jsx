import { useCallback, useEffect, useRef, useState } from 'react';
import Icon from '../Icon.jsx';
import MachineArt from '../MachineArt.jsx';
import Stats from '../Stats.jsx';
import { Button, Photo, Reveal, RevealText, SectionTag } from '../ui.jsx';
import { FLEET } from '../../data/fleet.js';
import { LISTINGS } from '../../data/forSale.js';
import { INDUSTRIES, SERVICE_CARDS } from '../../data/services.js';
import { photo } from '../../data/photos.js';
import { QUOTE_HREF } from '../../data/site.js';
import { pinnedProgress, useScrollProgress } from '../../hooks/useScrollProgress.js';

const pad = (n) => String(n).padStart(2, '0');

/* ───────── S.01 ABOUT ───────── */
export function About() {
  return (
    <section className="sec sec--paper" id="about">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="01">About us</SectionTag>
          <RevealText className="statement">
            1st Crane is an owner-run crane hire, rigging and transport company in Centurion. Since 2012 we’ve
            lifted, moved and installed for construction, mining and industry across Southern Africa.
          </RevealText>
        </header>

        <Stats />

        <div className="about">
          <Reveal className="about__photo">
            <Photo name="popup-container-lift" sizes="(max-width: 860px) 100vw, 46vw" caption />
          </Reveal>
          <Reveal className="about__copy" delay={120}>
            <p className="lead">
              We specialise in crane and plant hire: day-to-day and long-term hires, infrastructure projects,
              shut-downs, heavy lifting and many other lifting jobs.
            </p>
            <p>
              We can also supply fully certified riggers and equipment. The aim is a personal, professional,
              all-round crane hire solution for whatever your lifting needs may be.
            </p>
            <Button href="/aboutus/">About us</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ───────── S.02 SERVICES ───────── */
export function Services() {
  return (
    <section className="sec sec--paper sec--tight-top">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="02">Services</SectionTag>
          <RevealText className="statement">
            Through integrity and foresight we build long-lasting partnerships, and coordinated, custom-made,
            high-quality and safe lifting for every client.
          </RevealText>
        </header>

        <ul className="cards">
          {SERVICE_CARDS.map((c, i) => (
            <Reveal as="li" key={c.title} className="card" delay={(i % 3) * 90}>
              <div className="card__top">
                <span className="card__icon">
                  <Icon name={c.icon} size={30} />
                </span>
                <span className="card__n">{pad(i + 1)}</span>
              </div>
              <h3 className="card__title">{c.title}</h3>
              <p className="card__text">{c.text}</p>
            </Reveal>
          ))}
        </ul>

        <div className="sec__foot">
          <Button href="/services/">All 17 services</Button>
        </div>
      </div>
    </section>
  );
}

/* ───────── S.03 FLEET ───────── */
export function Fleet() {
  return (
    <section className="sec sec--dark">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="03" className="tag--dark">
            Fleet
          </SectionTag>
          <RevealText className="statement">
            All-terrain cranes for busy urban roads, rough-terrain cranes for hard off-road ground, and the
            manoeuvrability to lift in tight confines.
          </RevealText>
        </header>

        <ul className="tiles">
          {FLEET.map((f, i) => (
            <Reveal as="li" key={f.id} className="tile" delay={(i % 3) * 90}>
              <a href={`/fleet/#${f.id}`} className="tile__link">
                <div className="tile__art blueprint">
                  <MachineArt name={f.art} />
                  <span className="tile__dwg">DWG-{pad(i + 1)}</span>
                </div>
                <div className="tile__body">
                  <h3 className="tile__title">{f.name}</h3>
                  <p className="tile__text">{f.short}</p>
                  <span className="tile__more">
                    Details <Icon name="plus" size={14} />
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <div className="makes">
          <RevealText as="p" className="statement statement--center">
            We run Liebherr and Grove cranes, operated by skilled, certified professionals who put safety first
            on every lift.
          </RevealText>
          <Button href="/fleet/" variant="light">
            Our fleet
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ───────── S.04 INDUSTRIES ───────── */
function Dial({ ticks = 96 }) {
  const r = 150;
  const c = 2 * Math.PI * (r + 14);
  return (
    <svg className="dial" viewBox="-180 -180 360 360" aria-hidden="true">
      <g className="dial__ticks">
        {Array.from({ length: ticks }, (_, i) => (
          <line key={i} x1="0" y1={-r} x2="0" y2={i % 8 === 0 ? -r + 16 : -r + 8} transform={`rotate(${(360 / ticks) * i})`} />
        ))}
      </g>
      <circle className="dial__track" r={r + 14} />
      <circle className="dial__arc" r={r + 14} style={{ strokeDasharray: c }} transform="rotate(-90)" />
      <circle className="dial__core" r={r - 34} />
    </svg>
  );
}

export function Industries() {
  const ref = useRef(null);
  const trackRef = useRef(null);
  const n = INDUSTRIES.length;
  const [active, setActive] = useState(0);

  const onChange = useCallback(
    (p) => {
      ref.current?.style.setProperty('--ip', p);
      setActive(Math.min(n - 1, Math.floor(p * n * 0.999)));
    },
    [n]
  );
  useScrollProgress(ref, pinnedProgress, onChange);

  // slide the row so the active word sits on the left margin
  useEffect(() => {
    const track = trackRef.current;
    const word = track?.children[active];
    if (word) track.style.setProperty('--x', `${track.firstElementChild.offsetLeft - word.offsetLeft}px`);
  }, [active]);

  return (
    <section ref={ref} className="ind" style={{ '--count': n }}>
      <div className="ind__stage">
        <div className="ind__top">
          <SectionTag n="04">Industries</SectionTag>
          <p className="ind__kicker">Where manoeuvrability and high reach matter</p>
        </div>

        <div className="ind__center" aria-hidden="true">
          <Dial />
          <div className="ind__readout">
            <span className="ind__index">{pad(active + 1)}</span>
            <span className="ind__of">/ {pad(n)}</span>
          </div>
        </div>

        <div className="ind__bottom">
          <p className="ind__desc" aria-hidden="true">
            <span className="ind__label">{INDUSTRIES[active].name}</span>
            {INDUSTRIES[active].text}
          </p>
          <div className="ind__words" aria-hidden="true">
            <div ref={trackRef} className="ind__track">
              {INDUSTRIES.map((x, i) => (
                <span key={x.name} className={i === active ? 'is-on' : ''}>
                  {x.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <ul className="sr-only">
          {INDUSTRIES.map((x) => (
            <li key={x.name}>
              {x.name}: {x.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────── S.05 SAFETY ───────── */
const PILLARS = [
  {
    icon: 'clipboard',
    title: 'Planned',
    text: 'Careful preparation, planning and CAD-based rigging studies before anything leaves the ground.',
  },
  {
    icon: 'hardhat',
    title: 'Certified',
    text: 'Highly experienced, certified operators, and fully certified riggers and equipment when you need them.',
  },
  {
    icon: 'wrench',
    title: 'Maintained',
    text: 'Modern equipment, inspected and maintained for reliability, performance and safety.',
  },
];

export function Safety() {
  return (
    <section className="sec sec--white">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="05">Safety</SectionTag>
          <RevealText className="statement">
            Every crane is run by skilled, certified operators who put safety first on every lift. And every
            lift starts with a plan.
          </RevealText>
        </header>
        <ol className="pillars">
          {PILLARS.map((p, i) => (
            <Reveal as="li" key={p.title} className="pillar" delay={i * 90}>
              <span className="pillar__n">{pad(i + 1)}</span>
              <Icon name={p.icon} size={34} className="pillar__icon" />
              <h3 className="pillar__title">{p.title}</h3>
              <p className="pillar__text">{p.text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="sec__foot">
          <Button href={QUOTE_HREF}>Plan your lift</Button>
        </div>
      </div>
    </section>
  );
}

/* ───────── S.06 PROJECTS ───────── */
const MOSAIC = [
  { name: 'billboard-lift-wide', cls: 'm-a', sizes: '(max-width: 860px) 100vw, 50vw' },
  { name: 'container-lift', cls: 'm-b', sizes: '(max-width: 860px) 50vw, 25vw' },
  { name: 'steel-truss', cls: 'm-c', sizes: '(max-width: 860px) 50vw, 25vw' },
  { name: 'warehouse-machine-lift', cls: 'm-d', sizes: '(max-width: 860px) 100vw, 50vw' },
];

export function Projects() {
  return (
    <section className="sec sec--paper">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="06">Projects</SectionTag>
          <RevealText className="statement">
            Billboards, steel structures, containers and plant: a few of the lifts behind the name.
          </RevealText>
        </header>
        <div className="mosaic">
          {MOSAIC.map((m, i) => {
            const p = photo(m.name);
            return (
              <Reveal as="a" key={m.name} href="/gallery/" className={`mosaic__item ${m.cls}`} delay={i * 80}>
                <Photo name={m.name} sizes={m.sizes} />
                <span className="mosaic__cap">{p.caption}</span>
              </Reveal>
            );
          })}
        </div>
        <div className="sec__foot">
          <Button href="/gallery/">View the gallery</Button>
        </div>
      </div>
    </section>
  );
}

/* ───────── S.07 FOR SALE ───────── */
export function SaleTeaser() {
  const first = LISTINGS[0];
  return (
    <section className="sec sec--paper sec--tight-top">
      <div className="sec__inner">
        <div className="split">
          <Reveal className="split__media">
            <Photo name="crane-golden-hour" sizes="(max-width: 860px) 100vw, 50vw" />
          </Reveal>
          <Reveal className="split__copy" delay={120}>
            <SectionTag n="07">For sale</SectionTag>
            <h2 className="h2">Looking to buy a crane?</h2>
            <p>
              We offer a carefully selected range of new and used cranes, each thoroughly inspected and maintained
              for reliability, performance and safety, and we’ll help you choose the right one.
            </p>
            {first && (
              <p className="chip">
                <Icon name="tag" size={16} />
                {first.make} {first.model} · {first.price}
              </p>
            )}
            <Button href="/for-sale/">Cranes for sale</Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
