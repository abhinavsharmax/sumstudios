'use client';

import Link from 'next/link';

const NAV = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Journal' },
  { href: '/products', label: 'Objects' },
  { href: '/about', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
];

const SOCIAL = [
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Pinterest' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <p className="footer__brand">Sum<br />Studio</p>
            <p className="footer__tagline">
              A place where commitment is given in pursuit of function, aesthetic, coherence, and joy.
            </p>
          </div>

          <div>
            <p className="footer__col-title">Navigation</p>
            <ul className="footer__links">
              {NAV.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="footer__link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer__col-title">Follow</p>
            <ul className="footer__links">
              {SOCIAL.map(link => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="footer__col-title">Location</p>
            <address style={{ fontStyle: 'normal' }}>
              <p className="footer__link">Studio 4B, Ballard Estate</p>
              <p className="footer__link">Mumbai 400 001</p>
              <p className="footer__link" style={{ marginTop: '0.75rem' }}>India</p>
              <a href="mailto:hello@sumstudio.in" className="footer__link" style={{ marginTop: '0.75rem', display: 'block' }}>
                hello@sumstudio.in
              </a>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} Sum Studio. All rights reserved.</p>
          <p className="footer__copy">Architecture · Interiors · Objects</p>
        </div>
      </div>
    </footer>
  );
}
