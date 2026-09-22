import { useEffect } from 'react';
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';

export default function Layout({ current, children }) {
  // The browser tries to jump to #anchors before React has rendered them
  // (e.g. /liebherr/ → /fleet/#liebherr), so repeat the jump once we exist.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id && document.getElementById(id);
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }));
  }, []);

  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Nav current={current} />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}
