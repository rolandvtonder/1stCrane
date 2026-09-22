import { mount } from './mount.jsx';
import Layout from '../components/Layout.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import MachineArt from '../components/MachineArt.jsx';
import { Photo, Reveal, RevealText, SectionTag } from '../components/ui.jsx';
import { FLEET, MAKES } from '../data/fleet.js';

const pad = (n) => String(n).padStart(2, '0');

mount(
  <Layout current="fleet">
    <PageHero
      eyebrow="Fleet"
      title={['Cranes for every', 'kind of ground.']}
      intro="All-terrain cranes for busy urban roads, rough-terrain cranes for difficult off-road ground, and Franna and truck-mounted cranes for tight confines."
      image="boom-low-angle"
      focus="72% 35%"
    />

    <section className="sec sec--dark">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="01" className="tag--dark">
            Crane types
          </SectionTag>
          <RevealText className="statement">
            Our fleet and our operators’ experience let us take on lifts in tight confines, on hard ground and at
            height, where manoeuvrability and reach are critical.
          </RevealText>
        </header>

        <div className="types">
          {FLEET.map((f, i) => (
            <Reveal as="article" key={f.id} id={f.id} className="type">
              <div className="type__art blueprint">
                <MachineArt name={f.art} />
                <span className="tile__dwg">DWG-{pad(i + 1)}</span>
              </div>
              <div className="type__body">
                <p className="type__n">{pad(i + 1)}</p>
                <h2 className="type__name">{f.name}</h2>
                <p className="type__short">{f.short}</p>
                <p className="type__text">{f.text}</p>
                <ul className="chips chips--dark" aria-label="Typical work">
                  {f.uses.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="sec sec--paper">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="02">Makes</SectionTag>
          <RevealText className="statement">Liebherr and Grove, chosen for durability, efficiency and reach.</RevealText>
        </header>
        <div className="makes-grid">
          {MAKES.map((m) => (
            <Reveal as="article" key={m.id} id={m.id} className="make">
              <p className="make__name">{m.name}</p>
              <h2 className="make__title">{m.title}</h2>
              {m.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="sec sec--white" id="mobile-cranes">
      <div className="sec__inner">
        <div className="split">
          <Reveal className="split__media split__media--tall">
            <Photo name="lime-crane" sizes="(max-width: 860px) 100vw, 42vw" caption />
          </Reveal>
          <Reveal className="split__copy" delay={120}>
            <SectionTag n="03">Mobile cranes</SectionTag>
            <h2 className="h2">What is a mobile crane?</h2>
            <div className="prose">
              <p>
                A mobile crane is a hydraulic-powered crane with a telescoping boom, mounted on a truck-type or
                rubber-tyred carrier. It travels between sites easily and needs little or no setup, so heavy loads
                can be lifted wherever the job is.
              </p>
              <p>
                The boom carries a hook on wire rope and sheaves, controlled from the operator’s cab. Modern
                electronic control of the hydraulics gives smooth, precise movement of the load.
              </p>
              <p>
                Every 1st Crane mobile crane comes with a skilled, certified operator. Fully certified riggers and
                rigging equipment are available if your lift needs them.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>

    <CtaBand n="04" image="container-lift" focus="40% 50%" />
  </Layout>
);
