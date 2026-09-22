import { mount } from './mount.jsx';
import Layout from '../components/Layout.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Stats from '../components/Stats.jsx';
import Icon from '../components/Icon.jsx';
import { Photo, Reveal, RevealText, SectionTag } from '../components/ui.jsx';

const VALUES = [
  {
    icon: 'shield',
    title: 'High quality',
    text: 'Modern equipment and experienced people, and a reputation for reliability, professionalism and excellence to match.',
  },
  {
    icon: 'hardhat',
    title: 'Safe lifting',
    text: 'Certified operators and riggers who bring precision and expertise to every project, regardless of size or complexity.',
  },
  {
    icon: 'clipboard',
    title: 'Custom-made',
    text: 'Every crane and plant hire is customised to its site, to raise the level of optimisation on the job.',
  },
];

const WHY = [
  '12+ years of combined experience in crane and plant hire',
  'All-terrain and truck-mounted cranes available',
  'Highly experienced operators and riggers',
  'Cranes available 24/7 in Southern Africa, for short or long-term hire',
];

mount(
  <Layout current="about">
    <PageHero
      eyebrow="About us"
      title={['Owner-run.', 'Since 2012.']}
      intro="1st Crane, Rigging & Transport (Pty) Ltd is owner run and managed. We specialise in crane and plant hire for construction, mining and industry across Southern Africa."
      image="container-lift"
      focus="40% 42%"
    />

    <section className="sec sec--paper">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="01">Get to know us</SectionTag>
          <RevealText className="statement">
            We’re passionate about providing the highest calibre of crane and plant hire to a multitude of
            industries, and we customise every hire to get the most out of your site.
          </RevealText>
        </header>
        <Stats />
      </div>
    </section>

    <section className="sec sec--white">
      <div className="sec__inner">
        <div className="split split--text">
          <Reveal>
            <SectionTag n="02">Our mission</SectionTag>
            <h2 className="h2">Safe, efficient, cost-effective lifting.</h2>
          </Reveal>
          <Reveal className="prose" delay={120}>
            <p>
              1st Crane is a leading provider of crane hire, rigging and transport services in South Africa.
              Established to deliver high-quality solutions to the construction, mining and industrial sectors, we’ve
              earned a reputation for reliability, professionalism and excellence.
            </p>
            <p>
              Our mission is to provide safe, efficient and cost-effective crane and transport services while
              maintaining the highest standards of quality, prioritising safety, reliability and client satisfaction
              at every step.
            </p>
            <p>
              By continuously investing in our fleet and training our team, we make sure you get the best possible
              service for every lifting or transport requirement, delivered safely, efficiently and on time.
            </p>
          </Reveal>
        </div>
      </div>
    </section>

    <section className="sec sec--paper">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="03">What we stand for</SectionTag>
          <RevealText className="statement">High quality. Safe lifting. Custom-made.</RevealText>
        </header>
        <ul className="cards cards--3">
          {VALUES.map((v, i) => (
            <Reveal as="li" key={v.title} className="card" delay={i * 90}>
              <div className="card__top">
                <span className="card__icon">
                  <Icon name={v.icon} size={30} />
                </span>
                <span className="card__n">0{i + 1}</span>
              </div>
              <h3 className="card__title">{v.title}</h3>
              <p className="card__text">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    <section className="sec sec--dark">
      <div className="sec__inner">
        <div className="split">
          <Reveal className="split__media">
            <Photo name="drilling-site" sizes="(max-width: 860px) 100vw, 40vw" caption />
          </Reveal>
          <Reveal className="split__copy" delay={120}>
            <SectionTag n="04" className="tag--dark">
              Why 1st Crane
            </SectionTag>
            <h2 className="h2">A personal, professional, all-round crane hire solution.</h2>
            <ul className="checks">
              {WHY.map((w) => (
                <li key={w}>
                  <Icon name="check" size={20} />
                  {w}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>

    <CtaBand n="05" image="lime-crane" />
  </Layout>
);
