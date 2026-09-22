import { useState } from 'react';
import { mount } from './mount.jsx';
import Layout from '../components/Layout.jsx';
import PageHero from '../components/PageHero.jsx';
import CtaBand from '../components/CtaBand.jsx';
import Lightbox from '../components/Lightbox.jsx';
import Icon from '../components/Icon.jsx';
import { Photo, Reveal, SectionTag } from '../components/ui.jsx';
import { GALLERY, photo } from '../data/photos.js';

function Gallery() {
  const [index, setIndex] = useState(null);
  return (
    <>
      <section className="sec sec--paper">
        <div className="sec__inner">
          <header className="gallery-head">
            <SectionTag n="01">Projects</SectionTag>
            <p className="mono-label">
              {GALLERY.length} photos · select one to enlarge
            </p>
          </header>
          <ul className="gallery">
            {GALLERY.map((name, i) => {
              const p = photo(name);
              return (
                <Reveal as="li" key={name} className="gallery__item" delay={(i % 3) * 70}>
                  <button className="gallery__btn" onClick={() => setIndex(i)} aria-label={`Enlarge photo: ${p.caption}`}>
                    <Photo name={name} sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                    <span className="gallery__cap">
                      {p.caption}
                      <Icon name="plus" size={16} />
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>
      <Lightbox items={GALLERY} index={index} onChange={setIndex} />
    </>
  );
}

mount(
  <Layout current="gallery">
    <PageHero
      eyebrow="Gallery"
      title={['On the', 'job.']}
      intro="A selection of lifts by the 1st Crane team: billboards, steel structures, containers, machinery and plant."
      image="billboard-lift"
      focus="84% 40%"
    />
    <Gallery />
    <CtaBand n="02" image="lime-crane" />
  </Layout>
);
