import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import { Logo } from './ui.jsx';
import { NAV, QUOTE_HREF, SITE } from '../data/site.js';
import { useScrolled } from '../hooks/useInView.js';
import { url } from '../url.js';

/**
 * Fixed top bar. Transparent over the dark page heroes, then a smoked-glass
 * bar once the page moves. Below 1080px the links fold into a drawer.
 */
export default function Nav({ current }) {
  const [open, setOpen] = useState(false);
  const stuck = useScrolled(12);
  const drawerRef = useRef(null);
  const burgerRef = useRef(null);

  // Drawer: lock page scroll, close on Esc, keep focus inside, hand focus back.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    document.documentElement.classList.add('is-locked');
    drawer.querySelector('a')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key !== 'Tab') return;
      const focusables = [burgerRef.current, ...drawer.querySelectorAll('a')];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.classList.remove('is-locked');
      document.removeEventListener('keydown', onKey);
      burgerRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className={`nav${stuck || open ? ' nav--stuck' : ''}`}>
        <a className="nav__home" href={url('/')} aria-label="1st Crane Mining & Transport, home">
          <Logo height={52} eager />
        </a>

        <nav className="nav__links" aria-label="Main">
          {NAV.map((l) => (
            <a key={l.id} href={l.href} aria-current={current === l.id ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav__end">
          <a className="nav__phone" href={SITE.phone.href} aria-label={`Call ${SITE.phone.display}`}>
            <Icon name="phone" size={16} />
            <span>{SITE.phone.display}</span>
          </a>
          <a className="nav__cta" href={QUOTE_HREF}>
            Get a quote
          </a>
          <button
            ref={burgerRef}
            className={`nav__burger${open ? ' nav__burger--open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="drawer"
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <div
        id="drawer"
        ref={drawerRef}
        className={`drawer${open ? ' drawer--open' : ''}`}
        inert={open ? undefined : ''}
        aria-hidden={open ? undefined : 'true'}
      >
        <nav className="drawer__links" aria-label="Main">
          <a href={url('/')} aria-current={current === 'home' ? 'page' : undefined}>
            Home
          </a>
          {NAV.map((l) => (
            <a key={l.id} href={l.href} aria-current={current === l.id ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="drawer__foot">
          <a href={SITE.phone.href}>
            <Icon name="phone" size={18} /> {SITE.phone.display}
          </a>
          <a href={`mailto:${SITE.email}`}>
            <Icon name="mail" size={18} /> {SITE.email}
          </a>
          <p>{SITE.availability}</p>
        </div>
      </div>
    </>
  );
}
