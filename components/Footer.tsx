'use client';

import Link from 'next/link';
import { Instagram, Facebook, Youtube, MapPin, Phone, Mail } from 'lucide-react';

function PinterestIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}
import { siteConfig } from '@/lib/site-config';
import { serviceNavLinks } from '@/lib/services';

const quickLinks = siteConfig.nav.map((n) => ({ label: n.label, href: n.href }));

export function Footer() {
  return (
    <footer style={{ background: '#0e0e0e', color: '#fff', position: 'relative' }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(1.25rem, 4vw, 2.5rem) 0',
      }}>

        {/* ── 4-column grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'clamp(2rem, 4vw, 3rem)',
          alignItems: 'start',
        }}>

          {/* ── Col 1: Brand ── */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <div style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 32, fontWeight: 700,
                color: '#fff', lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                Decorecy
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginTop: 6,
              }}>
                <span style={{
                  display: 'inline-block', width: 24, height: 1,
                  background: '#c9a96e',
                }} />
                <span style={{
                  fontSize: '0.6rem', letterSpacing: '0.22em',
                  textTransform: 'uppercase', color: '#c9a96e', fontWeight: 500,
                }}>Interiors</span>
              </div>
            </Link>

            <p style={{
              marginTop: 20,
              fontSize: 13.5, lineHeight: 1.7,
              color: 'rgba(255,255,255,0.48)',
              maxWidth: 260,
            }}>
              A Bhubaneswar-based interior design studio creating personalized,
              functional and beautiful residential and commercial interiors.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {[
                { href: siteConfig.social.instagram, label: 'Instagram',  icon: <Instagram  size={15} /> },
                { href: siteConfig.social.facebook,  label: 'Facebook',   icon: <Facebook   size={15} /> },
                { href: siteConfig.social.pinterest, label: 'Pinterest',  icon: <PinterestIcon size={15} /> },
                { href: siteConfig.social.youtube,   label: 'YouTube',    icon: <Youtube    size={15} /> },
              ].map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 38, height: 38, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.16)',
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.50)';
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.16)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h3 style={{
              fontSize: '0.65rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.40)', marginBottom: 20,
            }}>
              Quick Links
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={{
                    fontSize: 14, color: 'rgba(255,255,255,0.62)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.62)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Services ── */}
          <div>
            <h3 style={{
              fontSize: '0.65rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.40)', marginBottom: 20,
            }}>
              Services
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {serviceNavLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} style={{
                    fontSize: 14, color: 'rgba(255,255,255,0.62)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.62)')}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/best-interior-designers-in-bhubaneswar" style={{
                  fontSize: 14, color: 'rgba(255,255,255,0.62)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.62)')}
                >
                  Interior Designers in Bhubaneswar
                </Link>
              </li>
            </ul>
          </div>

          {/* ── Col 4: Get In Touch card ── */}
          <div style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 16,
            padding: '28px 24px',
          }}>
            <h3 style={{
              fontSize: '0.62rem', fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: '#c9a96e', marginBottom: 22,
            }}>
              Get In Touch
            </h3>

            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <li style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <MapPin size={15} style={{ color: 'rgba(255,255,255,0.40)', flexShrink: 0, marginTop: 2 }} />
                <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.62)', lineHeight: 1.5 }}>
                  {siteConfig.address.locality}, {siteConfig.address.region}, {siteConfig.address.postalCode}
                </span>
              </li>
              <li style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Phone size={15} style={{ color: 'rgba(255,255,255,0.40)', flexShrink: 0 }} />
                <a href={`tel:${siteConfig.phoneHref}`} style={{
                  fontSize: 13.5, color: 'rgba(255,255,255,0.62)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.62)')}
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Mail size={15} style={{ color: 'rgba(255,255,255,0.40)', flexShrink: 0 }} />
                <a href={`mailto:${siteConfig.email}`} style={{
                  fontSize: 13.5, color: 'rgba(255,255,255,0.62)',
                  textDecoration: 'none', transition: 'color 0.2s',
                  wordBreak: 'break-all',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.62)')}
                >
                  {siteConfig.email}
                </a>
              </li>
            </ul>

            <div style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid rgba(255,255,255,0.07)',
            }}>
              <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 15, fontStyle: 'italic',
                color: '#c9a96e', marginBottom: 6,
              }}>
                Let&apos;s bring your vision to life.
              </p>
              <p style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.42)', lineHeight: 1.5 }}>
                We&apos;d love to hear about your project.
              </p>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div style={{
          marginTop: 56,
          paddingTop: 20, paddingBottom: 24,
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 12,
        }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms',          href: '/terms' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} style={{
                fontSize: 12, color: 'rgba(255,255,255,0.35)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}
