'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';
import { MobileMenu } from './MobileMenu';

const desktopNav = siteConfig.nav.filter((item) => item.href !== '/contact');

export function Navbar() {
  const [overHero, setOverHero]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const sync = () =>
      setOverHero(document.documentElement.dataset.heroActive === 'true');
    sync();
    window.addEventListener('heroactivechange', sync);
    return () => window.removeEventListener('heroactivechange', sync);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const isActive = (href: string) => {
    if (href.includes('#')) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  /* ── colours flip between hero (dark glass) and page (white pill) ── */
  const pill = overHero
    ? {
        bg:          'rgba(15,15,15,0.60)',
        border:      '1px solid rgba(255,255,255,0.12)',
        shadow:      'none',
        linkColor:   'rgba(255,255,255,0.72)',
        linkActive:  '#fff',
        linkHover:   '#fff',
        logoColor:   '#fff',
        logoSub:     'rgba(255,255,255,0.42)',
        logoBorder:  'rgba(255,255,255,0.28)',
        divider:     'rgba(255,255,255,0.14)',
        ctaBg:       'rgba(255,255,255,0.14)',
        ctaBorder:   'rgba(255,255,255,0.28)',
        ctaColor:    '#fff',
        burgerColor: 'rgba(255,255,255,0.88)',
      }
    : {
        bg:          '#ffffff',
        border:      '1px solid rgba(0,0,0,0.08)',
        shadow:      '0 4px 28px rgba(0,0,0,0.08)',
        linkColor:   'rgba(0,0,0,0.55)',
        linkActive:  '#000',
        linkHover:   '#000',
        logoColor:   '#111',
        logoSub:     'rgba(0,0,0,0.38)',
        logoBorder:  'rgba(0,0,0,0.14)',
        divider:     'rgba(0,0,0,0.08)',
        ctaBg:       '#111',
        ctaBorder:   '#111',
        ctaColor:    '#fff',
        burgerColor: '#111',
      };

  return (
    <>
      {/* ── Floating pill wrapper ── */}
      <div style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        width: 'calc(100% - 2rem)',
        maxWidth: 1160,
      }}>
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 8,
          height: 58,
          padding: '0 10px 0 14px',
          borderRadius: 999,
          background: pill.bg,
          border: pill.border,
          boxShadow: pill.shadow,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        }}>

          {/* ── Logo ── */}
          <Link href="/" style={{
            display: 'flex', alignItems: 'center', gap: 10,
            textDecoration: 'none', flexShrink: 0,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${pill.logoBorder}`,
              transition: 'border-color 0.4s',
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 16, fontWeight: 700,
                color: pill.logoColor,
                transition: 'color 0.4s',
              }}>D</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 17, fontWeight: 600,
              letterSpacing: '-0.01em',
              color: pill.logoColor,
              transition: 'color 0.4s',
            }}>Decorecy</span>
          </Link>

          {/* ── Desktop nav links ── */}
          <nav className="navbar-desktop" style={{
            display: 'none',
            alignItems: 'center',
            gap: 2,
            flex: 1,
            justifyContent: 'center',
          }}>
            {desktopNav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="navbar-link"
                  style={{
                    position: 'relative',
                    padding: '6px 14px',
                    fontSize: 13.5,
                    fontWeight: active ? 600 : 400,
                    color: active ? pill.linkActive : pill.linkColor,
                    textDecoration: 'none',
                    borderRadius: 999,
                    transition: 'color 0.2s, background 0.2s',
                    background: active
                      ? overHero ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.05)'
                      : 'transparent',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>

            {/* Divider */}
            <div className="navbar-divider" style={{
              display: 'none',
              width: 1, height: 18,
              background: pill.divider,
              margin: '0 4px',
              transition: 'background 0.4s',
            }} />

            {/* Book CTA */}
            <Link
              href="/contact"
              className="navbar-cta"
              style={{
                display: 'none',
                alignItems: 'center',
                gap: 6,
                padding: '8px 18px',
                borderRadius: 999,
                background: pill.ctaBg,
                border: `1px solid ${pill.ctaBorder}`,
                color: pill.ctaColor,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s',
                whiteSpace: 'nowrap',
              }}
            >
              Book Consultation
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 22, height: 22, borderRadius: '50%',
                background: overHero ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.22)',
              }}>
                <ArrowRight size={12} />
              </span>
            </Link>

            {/* Mobile burger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="navbar-burger"
              style={{
                display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center',
                width: 38, height: 38,
                borderRadius: 999,
                border: 'none', background: 'transparent',
                cursor: 'pointer',
                color: pill.burgerColor,
                transition: 'color 0.4s',
              }}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </header>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .navbar-desktop { display: flex !important; }
          .navbar-cta     { display: inline-flex !important; }
          .navbar-divider { display: block !important; }
          .navbar-burger  { display: none !important; }
        }
        @media (min-width: 640px) {
          .navbar-cta { display: inline-flex !important; }
        }
        .navbar-link:hover {
          background: ${overHero ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)'} !important;
          color: ${pill.linkHover} !important;
        }
      `}</style>

      <MobileMenu open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  );
}
