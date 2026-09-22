import { mount } from './mount.jsx';
import Layout from '../components/Layout.jsx';
import PageHero from '../components/PageHero.jsx';
import ContactForm from '../components/ContactForm.jsx';
import Icon from '../components/Icon.jsx';
import { Button, Reveal, SectionTag } from '../components/ui.jsx';
import { SITE } from '../data/site.js';

const DETAILS = [
  { icon: 'phone', h: 'Phone', text: SITE.phone.display, href: SITE.phone.href },
  { icon: 'fax', h: 'Fax', text: SITE.fax },
  { icon: 'mail', h: 'Email', text: SITE.email, href: `mailto:${SITE.email}` },
  {
    icon: 'pin',
    h: 'Visit',
    text: `${SITE.address.street}, ${SITE.address.suburb}, ${SITE.address.city}, Pretoria`,
  },
  { icon: 'clock', h: 'Hours', text: `${SITE.availability}, across Southern Africa` },
  { icon: 'instagram', h: 'Instagram', text: SITE.instagram.handle, href: SITE.instagram.href, external: true },
];

mount(
  <Layout current="contact">
    <PageHero
      eyebrow="Contact"
      title={['Let’s plan', 'your lift.']}
      intro="Call, email or send us the details below. Cranes are available 24/7 for short and long-term hire across Southern Africa."
      image="lime-crane"
      focus="62% 30%"
    />

    <section className="sec sec--paper">
      <div className="sec__inner contact">
        <Reveal className="contact__info">
          <SectionTag n="01">Contact details</SectionTag>
          <ul className="contact__list">
            {DETAILS.map((d) => (
              <li key={d.h}>
                <span className="contact__icon">
                  <Icon name={d.icon} size={22} />
                </span>
                <div>
                  <h2 className="contact__h">{d.h}</h2>
                  {d.href ? (
                    <a href={d.href} {...(d.external && { target: '_blank', rel: 'noopener noreferrer' })}>
                      {d.text}
                    </a>
                  ) : (
                    <p>{d.text}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <Button href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" icon="arrowUpRight">
            Open in Google Maps
          </Button>
        </Reveal>

        <Reveal className="contact__form" delay={120} id="enquiry">
          <SectionTag n="02">Enquiry</SectionTag>
          <h2 className="h3">Send us the details</h2>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  </Layout>
);
