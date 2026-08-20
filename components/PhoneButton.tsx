'use client';

import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function PhoneButton() {
  return (
    <a
      href={`tel:${siteConfig.phoneHref}`}
      aria-label="Call us"
      style={{
        position: 'fixed', bottom: 18, left: 18, zIndex: 60,
        width: 52, height: 52, borderRadius: '50%',
        background: '#c9a96e',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff',
        textDecoration: 'none',
        boxShadow: '0 4px 20px rgba(201,169,110,0.55)',
        transition: 'transform 0.25s, box-shadow 0.25s',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(201,169,110,0.70)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(201,169,110,0.55)';
      }}
    >
      <Phone size={21} />
    </a>
  );
}
