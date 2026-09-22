import Icon from './Icon.jsx';
import { Button, Logo } from './ui.jsx';
import { NAV, QUOTE_HREF, SITE } from '../data/site.js';

const SERVICE_LINKS = [
  'Crane hire',
  'Rigging',
  'Transport & abnormal loads',
  'Machine moving',
  'Crating & warehousing',
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="hazard" aria-hidden="true" />
      <div className="footer__inner">
        <div className="footer__brand">
          <Logo height={120} />
          <p>
            {SITE.legalName} was established in {SITE.founded}. It is owner run and managed, and specialises in crane
            and plant hire across Southern Africa.
          </p>
          <Button href={QUOTE_HREF} variant="lime">
            Get a quote
          </Button>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h2 className="footer__h">Explore</h2>
          <a href="/">Home</a>
          {NAV.map((l) => (
            <a key={l.id} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="footer__col">
          <h2 className="footer__h">Services</h2>
          {SERVICE_LINKS.map((s) => (
            <a key={s} href="/services/">
              {s}
            </a>
          ))}
        </div>

        <div className="footer__col footer__col--contact">
          <h2 className="footer__h">Contact</h2>
          <a href={SITE.phone.href}>
            <Icon name="phone" size={16} /> {SITE.phone.display}
          </a>
          <p>
            <Icon name="fax" size={16} /> Fax {SITE.fax}
          </p>
          <a href={`mailto:${SITE.email}`}>
            <Icon name="mail" size={16} /> {SITE.email}
          </a>
          <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer">
            <Icon name="pin" size={16} />
            <span>
              {SITE.address.street}, {SITE.address.suburb}
              <br />
              {SITE.address.city}, Pretoria
            </span>
          </a>
          <p>
            <Icon name="clock" size={16} /> {SITE.availability}
          </p>
        </div>
      </div>

      <div className="footer__base">
        <span>
          © {year} {SITE.legalName}
        </span>
        <span>Crane hire · Rigging · Transport · Centurion, Pretoria</span>
        <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="footer__social">
          <Icon name="facebook" size={16} /> Facebook
        </a>
      </div>
    </footer>
  );
}
