import { mount } from './mount.jsx';
import Layout from '../components/Layout.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import { Photo, Reveal, RevealText, SectionTag } from '../components/ui.jsx';
import { FAQS, INDUSTRIES, SERVICE_GROUPS, STEPS } from '../data/services.js';

mount(
  <Layout current="services">
    <PageHero
      eyebrow="Services"
      title={['Lifting, rigging', '& moving.']}
      intro="A full-range crane, rigging and transport service, from a single day-to-day hire to shut-downs, infrastructure projects and turnkey installations."
      image="steel-truss"
      focus="45% 42%"
    />

    <section className="sec sec--paper">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="01">Our focus</SectionTag>
          <RevealText className="statement">
            Through integrity and foresight we cultivate loyalty and long-lasting partnerships that ensure
            coordinated, custom-made, high-quality and safe lifting for our clients in Southern Africa.
          </RevealText>
        </header>

        <div className="groups">
          {SERVICE_GROUPS.map((g, i) => (
            <Reveal key={g.title} className="group">
              <div className="group__head">
                <span className="group__n">0{i + 1}</span>
                <Icon name={g.icon} size={30} className="group__icon" />
                <h2 className="group__title">{g.title}</h2>
              </div>
              <p className="group__text">{g.text}</p>
              <ul className="group__list">
                {g.items.map((it) => (
                  <li key={it}>
                    <Icon name="check" size={16} />
                    {it}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>

    <section className="sec sec--white">
      <div className="sec__inner">
        <div className="split">
          <Reveal className="split__copy">
            <SectionTag n="02">Mobile crane services</SectionTag>
            <h2 className="h2">Reliability and precision on every lift.</h2>
            <div className="prose">
              <p>
                Our mobile crane services are designed for the lifting needs of diverse industries across South
                Africa. With all-terrain, rough-terrain and Franna cranes, we take on projects of any scale and
                complexity, from lifting heavy machinery to relocating equipment on site.
              </p>
              <p>
                Every lift is supported by careful preparation, planning and CAD-based rigging studies, and our
                fleet and operators have made bridge beam erection one of our specialities.
              </p>
            </div>
            <p className="mono-label">Where manoeuvrability and high reach matter</p>
            <ul className="chips">
              {INDUSTRIES.map((x) => (
                <li key={x.name}>{x.name}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="split__media split__media--tall" delay={120}>
            <Photo name="container-lift" sizes="(max-width: 860px) 100vw, 42vw" caption />
          </Reveal>
        </div>
      </div>
    </section>

    <section className="sec sec--dark">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="03" className="tag--dark">
            How it works
          </SectionTag>
          <RevealText className="statement">
            How a lift comes together, from the first call to the final placement.
          </RevealText>
        </header>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.title} className="step" delay={i * 90}>
              <span className="step__n">0{i + 1}</span>
              <h3 className="step__title">{s.title}</h3>
              <p className="step__text">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>

    <section className="sec sec--paper" id="faq">
      <div className="sec__inner faq-wrap">
        <header>
          <SectionTag n="04">FAQs</SectionTag>
          <h2 className="h2">Questions we hear a lot.</h2>
        </header>
        <div className="faq">
          {FAQS.map((f) => (
            <details key={f.q} className="faq__item">
              <summary>
                <span>{f.q}</span>
                <Icon name="plus" size={20} className="faq__icon" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>

    <CtaBand n="05" image="boom-low-angle" focus="72% 30%" />
  </Layout>
);
