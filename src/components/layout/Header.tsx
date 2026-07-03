'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';

const NAV_LINKS = [
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Journal' },
  { href: '/products', label: 'Objects' },
  { href: '/about', label: 'Studio' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const headerClasses = [
    'header',
    scrolled ? 'scrolled' : '',
    isHome && !scrolled ? 'header--transparent' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClasses}>
      <div className="header__inner">
        <Link href="/" className="header__logo">
          Sum Studio
        </Link>

        <nav className={`header__nav${menuOpen ? ' open' : ''}`} role="navigation">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`header__nav-link${pathname.startsWith(link.href) ? ' active' : ''}`}
            >
              <span data-text={link.label}>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="header__right">
          <ThemeToggle />
          <button
            className="header__menu-btn"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span style={{ transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : '' }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : '' }} />
          </button>
        </div>
      </div>
    </header>
  );
}
