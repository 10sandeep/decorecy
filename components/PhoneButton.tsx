'use client';

import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/lib/site-config';

export function PhoneButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href={`tel:${siteConfig.phoneHref}`}
      aria-label="Call us"
      style={{
        position: 'fixed', bottom: 22, left: 22, zIndex: 50,
        width: 52, height: 52, borderRadius: '50%',
        background: '#c9a96e',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff',
        textDecoration: 'none',
        boxShadow: '0 4px 18px rgba(201,169,110,0.50)',
        transition: 'opacity 0.3s, transform 0.3s',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <Phone size={22} />
    </a>
  );
}
