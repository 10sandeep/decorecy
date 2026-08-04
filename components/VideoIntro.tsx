'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface VideoIntroProps {
  src: string;
  /** px of scroll per second of video — controls how fast scrolling advances the clip */
  scrollPxPerSecond?: number;
}

export function VideoIntro({ src, scrollPxPerSecond = 120 }: VideoIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [sectionHeight, setSectionHeight] = useState(0);
  const [progress, setProgress] = useState(0);

  // Once video metadata is ready, compute how tall the scroll section should be
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const calculate = () => {
      const scrollable = video.duration * scrollPxPerSecond;
      setSectionHeight(window.innerHeight + scrollable);
    };

    if (video.readyState >= 1) {
      calculate();
    } else {
      video.addEventListener('loadedmetadata', calculate, { once: true });
    }
  }, [scrollPxPerSecond]);

  // Map scroll position → video currentTime
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video || sectionHeight === 0) return;

    const onScroll = () => {
      const scrolled = -container.getBoundingClientRect().top;
      const scrollable = sectionHeight - window.innerHeight;

      if (scrolled <= 0) {
        setProgress(0);
        video.currentTime = 0;
        return;
      }

      const p = Math.min(scrolled / scrollable, 1);
      setProgress(p);

      if (video.readyState >= 2) {
        video.currentTime = p * video.duration;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionHeight]);

  // Scroll-to-explore hint fades out in first 15% of scroll
  const hintOpacity = Math.max(0, 1 - progress / 0.15);

  return (
    <div
      ref={containerRef}
      style={{ height: sectionHeight > 0 ? sectionHeight : '100vh' }}
    >
      {/* Sticky container that stays in view while the outer div scrolls */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Gradient overlay so the transparent navbar stays readable */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.45) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Scroll-to-explore hint */}
        <div
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'white',
            opacity: hintOpacity,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontSize: '0.65rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Scroll to explore
          </span>
          <ChevronDown size={18} className="vi-bounce" />
        </div>

        {/* Progress bar along the bottom edge */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: `${progress * 100}%`,
            background: 'rgba(255,255,255,0.55)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <style>{`
        .vi-bounce {
          animation: vi-bounce 2s ease-in-out infinite;
        }
        @keyframes vi-bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(7px); }
        }
      `}</style>
    </div>
  );
}
