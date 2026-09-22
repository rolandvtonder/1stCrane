import { mount } from './mount.jsx';
import Layout from '../components/Layout.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Icon from '../components/Icon.jsx';
import MachineArt from '../components/MachineArt.jsx';
import { Button, Photo, Reveal, RevealText, SectionTag } from '../components/ui.jsx';
import { BUYING, LISTINGS } from '../data/forSale.js';

function Listing({ item }) {
  const name = `${item.make} ${item.model}`;
  return (
    <Reveal as="article" className="listing" id={item.id}>
      <div className="listing__media">
        {item.photo ? (
          <Photo name={item.photo} sizes="(max-width: 860px) 100vw, 45vw" />
        ) : (
          <div className="listing__art blueprint">
            <MachineArt name="allTerrain" />
          </div>
        )}
      </div>
      <div className="listing__body">
        <p className="listing__status">
          <span className="listing__dot" aria-hidden="true" />
          {item.status}
        </p>
        <h3 className="listing__name">
          <span>{item.make}</span> {item.model}
        </h3>
        <p className="listing__type">{item.type}</p>
        <p className="listing__summary">{item.summary}</p>
        <dl className="specs">
          {item.specs.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="listing__foot">
          <p className="listing__price">{item.price}</p>
          <Button href={`/contact-us/?interest=${encodeURIComponent(name)}#enquiry`}>Enquire</Button>
        </div>
      </div>
    </Reveal>
  );
}

mount(
  <Layout current="for-sale">
    <PageHero
      eyebrow="For sale"
      title={['Cranes', 'for sale.']}
      intro="Looking to purchase a crane? We offer a carefully selected range of new and used cranes, including all-terrain, rough-terrain and Franna cranes."
      image="crane-golden-hour"
      focus="72% 45%"
    />

    <section className="sec sec--paper">
      <div className="sec__inner">
        <header className="sec__head">
          <SectionTag n="01">Available now</SectionTag>
          <RevealText className="statement">
            Durable, quality-driven cranes, each thoroughly inspected and maintained, for construction, mining and
            industrial work.
          </RevealText>
        </header>
        <div className="listings">
          {LISTINGS.map((item) => (
            <Listing key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>

    <section className="sec sec--white">
      <div className="sec__inner">
        <div className="split split--text">
          <Reveal>
            <SectionTag n="02">Buying with us</SectionTag>
            <h2 className="h2">Help from choosing to after-sales.</h2>
          </Reveal>
          <Reveal className="prose" delay={120}>
            <p>
              We work closely with you to select the ideal crane, taking into account your operational
              requirements, budget and long-term goals.
            </p>
            <p>
              Each listing comes with its specification, including counterweight and lifting capacities on
              outriggers. Ask and we’ll send the details for the machine you’re interested in.
            </p>
          </Reveal>
        </div>
        <ul className="cards cards--3 cards--flat">
          {BUYING.map((b, i) => (
            <Reveal as="li" key={b.title} className="card" delay={i * 90}>
              <div className="card__top">
                <span className="card__icon">
                  <Icon name={b.icon} size={30} />
                </span>
                <span className="card__n">0{i + 1}</span>
              </div>
              <h3 className="card__title">{b.title}</h3>
              <p className="card__text">{b.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>

    <CtaBand
      n="03"
      title={['Ask about', 'a crane.']}
      text="Tell us what you need and we’ll send the specifications, counterweights and lifting capacities."
      image="lime-crane"
    />
  </Layout>
);
