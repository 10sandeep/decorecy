'use client';

/**
 * ScrollWorld — ultra-smooth scroll-driven multi-scene video engine.
 *
 * Smoothness strategy
 * ───────────────────
 * Naïve approach: set video.currentTime every RAF frame
 *   → browser must decode from nearest keyframe on every frame → CHOPPY
 *
 * This engine:
 *   1. Tracks scroll VELOCITY (px/ms) in the scroll event.
 *   2. Converts velocity → playbackRate and lets the video play naturally.
 *   3. Lerps the active playbackRate toward the target.
 *   4. When scrolling stops the rate decays to 0, video pauses,
 *      then ONE precise currentTime seek snaps it to the exact frame.
 *   5. If accumulated drift > threshold, a correction seek happens silently.
 */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import {
  Phone,
  Facebook,
  Instagram,
  Youtube,
  MoveDown,
  ArrowRight,
  MessageCircle,
  MapPin,
} from 'lucide-react';

import { motion } from 'framer-motion';

import { siteConfig } from '@/lib/site-config';
import type { WorldConfig } from '@/lib/scroll-world';


/* ══════════════════════════════════════════════════════
   LAYOUT CONSTANTS
══════════════════════════════════════════════════════ */

const STRIP_H = 92;

// Rounded corners of bottom white section
const CORNER_R = 72;

// How much the white tabs rise into the video
const TAB_RISE = CORNER_R;

// Total height of bottom tabs
const TAB_H = STRIP_H + TAB_RISE;


/* ══════════════════════════════════════════════════════
   FRAMER MOTION
══════════════════════════════════════════════════════ */

const EASE = [0.22, 1, 0.36, 1] as const;


/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */

export function ScrollWorld({
  config,
}: {
  config: WorldConfig;
}) {
  const {
    scenes,
    headline,
    headlineHighlight,
    description,
    primaryCta,
    eyebrow,
  } = config;


  /* ══════════════════════════════════════════════════════
     REFS
  ══════════════════════════════════════════════════════ */

  const containerRef = useRef<HTMLDivElement>(null);

  const videoRefs =
    useRef<(HTMLVideoElement | null)[]>([]);

  const scrollPos = useRef(0);

  const targetRate = useRef(0);

  const activeRate = useRef(0);

  const lastScrollY = useRef(0);

  const lastScrollMs = useRef(0);

  const rafId = useRef<number>();


  /* ══════════════════════════════════════════════════════
     STATE
  ══════════════════════════════════════════════════════ */

  const [sceneMeta, setSceneMeta] = useState<
    {
      duration: number;
      scrollPx: number;
    }[]
  >([]);

  const [totalHeight, setTotalHeight] =
    useState(0);

  const [globalProgress, setGlobalProgress] =
    useState(0);


  /* ══════════════════════════════════════════════════════
     LOAD VIDEO METADATA
  ══════════════════════════════════════════════════════ */

  useEffect(() => {
    let loaded = 0;

    const meta: (
      | {
          duration: number;
          scrollPx: number;
        }
      | null
    )[] = new Array(scenes.length).fill(null);


    const tryFinish = () => {
      if (loaded < scenes.length) return;

      if (meta.some((m) => m === null)) return;

      const validated =
        meta as {
          duration: number;
          scrollPx: number;
        }[];

      setSceneMeta(validated);

      const totalScroll = validated.reduce(
        (sum, item) => sum + item.scrollPx,
        0
      );

      setTotalHeight(
        window.innerHeight + totalScroll
      );
    };


    scenes.forEach((scene, i) => {
      const vid = videoRefs.current[i];

      if (!vid) return;

      const pxPerSec =
        scene.scrollPxPerSecond ?? 120;


      const calc = () => {
        meta[i] = {
          duration: vid.duration,
          scrollPx: vid.duration * pxPerSec,
        };

        loaded++;

        tryFinish();
      };


      if (vid.readyState >= 1) {
        calc();
      } else {
        vid.addEventListener(
          'loadedmetadata',
          calc,
          {
            once: true,
          }
        );
      }
    });

  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  /* ══════════════════════════════════════════════════════
     MAIN SCROLL ENGINE
  ══════════════════════════════════════════════════════ */

  useEffect(() => {
    const container = containerRef.current;

    if (
      !container ||
      totalHeight === 0 ||
      sceneMeta.length === 0
    ) {
      return;
    }


    const totalScroll =
      sceneMeta.reduce(
        (sum, item) => sum + item.scrollPx,
        0
      );


    const thresholds = sceneMeta.map(
      (_, i) =>
        sceneMeta
          .slice(0, i + 1)
          .reduce(
            (sum, item) =>
              sum + item.scrollPx,
            0
          )
    );


    /* ── SCROLL EVENT ── */

    const onScroll = () => {
      const now = performance.now();

      const dt = Math.max(
        now - lastScrollMs.current,
        1
      );

      const dy =
        window.scrollY -
        lastScrollY.current;


      const scrolled =
        -container.getBoundingClientRect()
          .top;


      scrollPos.current = Math.min(
        Math.max(
          scrolled / totalScroll,
          0
        ),
        1
      );


      const rawScrolled =
        scrollPos.current *
        totalScroll;


      const sceneIdx =
        getSceneIndex(
          rawScrolled,
          thresholds
        );


      const pxPerSec =
        scenes[sceneIdx]
          ?.scrollPxPerSecond ?? 120;


      const rate =
        (dy / dt) *
        1000 /
        pxPerSec;


      targetRate.current =
        Math.max(
          0,
          Math.min(12, rate)
        );


      lastScrollY.current =
        window.scrollY;

      lastScrollMs.current =
        now;
    };


    /* ── ANIMATION LOOP ── */

    const tick = () => {
      targetRate.current *= 0.80;

      activeRate.current +=
        (
          targetRate.current -
          activeRate.current
        ) * 0.25;


      const rate =
        activeRate.current;


      const rawScrolled =
        scrollPos.current *
        totalScroll;


      const sceneIdx =
        getSceneIndex(
          rawScrolled,
          thresholds
        );


      const m =
        sceneMeta[sceneIdx];


      const vid =
        videoRefs.current[sceneIdx];


      const elapsed =
        thresholds[sceneIdx - 1] ?? 0;


      const localP =
        Math.min(
          (
            rawScrolled -
            elapsed
          ) / m.scrollPx,
          1
        );


      const targetTime =
        localP * m.duration;


      if (
        vid &&
        vid.readyState >= 2
      ) {
        if (rate > 0.06) {

          const clamped =
            Math.max(
              0.0625,
              Math.min(12, rate)
            );


          if (vid.paused) {
            vid.play().catch(() => {});
          }


          vid.playbackRate =
            clamped;


          if (
            Math.abs(
              vid.currentTime -
              targetTime
            ) > 1.2
          ) {
            vid.currentTime =
              targetTime;
          }

        } else {

          if (!vid.paused) {
            vid.pause();

            vid.playbackRate = 1;
          }


          if (
            Math.abs(
              vid.currentTime -
              targetTime
            ) > 0.03
          ) {
            vid.currentTime =
              targetTime;
          }
        }
      }


      /* ── RESET OTHER SCENES ── */

      videoRefs.current.forEach(
        (v, i) => {
          if (!v || i === sceneIdx)
            return;


          if (!v.paused) {
            v.pause();

            v.playbackRate = 1;
          }


          const boundary =
            i < sceneIdx
              ? sceneMeta[i]?.duration ??
                0
              : 0;


          if (
            Math.abs(
              v.currentTime -
              boundary
            ) > 0.05
          ) {
            v.currentTime =
              boundary;
          }
        }
      );


      /* ── GLOBAL PROGRESS ── */

      const p =
        scrollPos.current;


      setGlobalProgress(p);


      const key =
        p < 1
          ? 'true'
          : 'false';


      if (
        document.documentElement
          .dataset.heroActive !== key
      ) {
        document.documentElement
          .dataset.heroActive = key;


        window.dispatchEvent(
          new CustomEvent(
            'heroactivechange'
          )
        );
      }


      rafId.current =
        requestAnimationFrame(
          tick
        );
    };


    lastScrollY.current =
      window.scrollY;


    lastScrollMs.current =
      performance.now();


    document.documentElement
      .dataset.heroActive = 'true';


    window.dispatchEvent(
      new CustomEvent(
        'heroactivechange'
      )
    );


    window.addEventListener(
      'scroll',
      onScroll,
      {
        passive: true,
      }
    );


    rafId.current =
      requestAnimationFrame(
        tick
      );


    return () => {
      window.removeEventListener(
        'scroll',
        onScroll
      );


      if (rafId.current) {
        cancelAnimationFrame(
          rafId.current
        );
      }


      document.documentElement
        .dataset.heroActive = 'false';


      window.dispatchEvent(
        new CustomEvent(
          'heroactivechange'
        )
      );
    };

  }, [
    totalHeight,
    sceneMeta,
    scenes,
  ]);


  /* ══════════════════════════════════════════════════════
     DERIVED ANIMATION VALUES
  ══════════════════════════════════════════════════════ */

  const entryOpacity =
    globalProgress >= 0.20
      ? 0
      : Math.max(
          0,
          1 -
            easeOutQuart(
              globalProgress /
                0.20
            )
        );


  const endReveal =
    globalProgress < 0.80
      ? 0
      : easeOutQuart(
          (
            globalProgress -
            0.80
          ) / 0.20
        );


  const overlayDark =
    0.48 +
    entryOpacity * 0.14 +
    endReveal * 0.18;


  /* ══════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════ */

  return (
    <div
      ref={containerRef}
      style={{
        height:
          totalHeight > 0
            ? totalHeight
            : '100vh',
      }}
    >

      {/* ═════════════════════════════════════════════
          STICKY VIEWPORT
      ═════════════════════════════════════════════ */}

      <div
        style={{
          position: 'sticky',
          top: 0,

          height: '100vh',

          background: '#ffffff',

          overflow: 'hidden',
        }}
      >


        {/* ═════════════════════════════════════════════
            DECORECY NAVBAR
        ═════════════════════════════════════════════ */}

        <nav
          style={{
            position: 'absolute',

            top: 20,

            left: '50%',

            transform:
              'translateX(-50%)',

            width:
              'min(1150px, calc(100% - 80px))',

            height: 68,

            padding:
              '8px 10px 8px 12px',

            display: 'flex',

            alignItems: 'center',

            border:
              '1px solid rgba(255,255,255,0.17)',

            borderRadius: 40,

            background:
              'rgba(12,12,13,0.76)',

            backdropFilter:
              'blur(20px)',

            WebkitBackdropFilter:
              'blur(20px)',

            boxShadow:
              '0 12px 40px rgba(0,0,0,0.28)',

            zIndex: 50,
          }}
        >

          {/* LOGO */}

          <div
            style={{
              display: 'flex',

              alignItems: 'center',

              gap: 12,

              marginRight: 'auto',

              color: '#fff',

              fontSize: 17,

              fontWeight: 600,
            }}
          >

            <div
              style={{
                width: 40,

                height: 40,

                display: 'flex',

                alignItems: 'center',

                justifyContent:
                  'center',

                border:
                  '1px solid rgba(255,255,255,0.25)',

                borderRadius: 12,

                color: '#fff',

                fontSize: 16,

                fontWeight: 600,
              }}
            >
              D
            </div>

            <span>
              Decorecy
            </span>

          </div>


          {/* NAVIGATION LINKS */}

          <div
            className="sw-navbar-links"
            style={{
              display: 'flex',

              alignItems: 'center',

              gap: 4,
            }}
          >

            {[
              'Home',
              'About',
              'Services',
              'Projects',
              'Design Ideas',
              'Why Decorecy',
            ].map(
              (
                item,
                index
              ) => (

                <Link
                  key={item}
                  href={
                    index === 0
                      ? '#home'
                      : `#${item
                          .toLowerCase()
                          .replaceAll(
                            ' ',
                            '-'
                          )}`
                  }
                  style={{
                    padding:
                      '11px 15px',

                    borderRadius: 24,

                    color:
                      index === 0
                        ? '#fff'
                        : 'rgba(255,255,255,0.70)',

                    background:
                      index === 0
                        ? 'rgba(255,255,255,0.14)'
                        : 'transparent',

                    textDecoration:
                      'none',

                    fontSize: 14,

                    whiteSpace:
                      'nowrap',

                    transition:
                      'all .25s ease',
                  }}
                >
                  {item}
                </Link>

              )
            )}

          </div>


          {/* DIVIDER */}

          <div
            className="sw-nav-divider"
            style={{
              width: 1,

              height: 25,

              margin:
                '0 14px',

              background:
                'rgba(255,255,255,0.20)',
            }}
          />


          {/* CONSULTATION BUTTON */}

          <Link
            href="/contact"
            className="sw-nav-cta"
            style={{
              height: 46,

              padding:
                '0 9px 0 18px',

              display: 'flex',

              alignItems: 'center',

              gap: 12,

              color: '#fff',

              textDecoration:
                'none',

              border:
                '1px solid rgba(255,255,255,0.20)',

              borderRadius: 30,

              background:
                'rgba(255,255,255,0.10)',

              fontSize: 14,

              fontWeight: 600,

              whiteSpace:
                'nowrap',
            }}
          >

            <span>
              Book Consultation
            </span>

            <span
              style={{
                width: 30,

                height: 30,

                display: 'flex',

                alignItems: 'center',

                justifyContent:
                  'center',

                borderRadius:
                  '50%',

                background:
                  'rgba(255,255,255,0.20)',
              }}
            >
              <ArrowRight
                size={15}
              />
            </span>

          </Link>

        </nav>


        {/* ═════════════════════════════════════════════
            VIDEO CARD
        ═════════════════════════════════════════════ */}

        <motion.div
          initial={{
            scale: 1.045,
          }}

          animate={{
            scale: 1,
          }}

          transition={{
            duration: 1.8,
            ease: EASE,
          }}

          style={{
            position: 'absolute',

            top: 0,

            left: 0,

            right: 0,

            bottom: STRIP_H,

            overflow: 'hidden',

            borderRadius: 0,

            background: '#080808',

            transformOrigin:
              'center center',

            zIndex: 1,
          }}
        >

          {/* VIDEO LAYERS */}

          {scenes.map(
            (scene, i) => (

              <video
                key={scene.src}

                ref={(el) => {
                  videoRefs.current[i] =
                    el;
                }}

                src={scene.src}

                muted

                playsInline

                preload="auto"

                style={{
                  position:
                    'absolute',

                  inset: 0,

                  width: '100%',

                  height: '100%',

                  objectFit: 'cover',

                  opacity:
                    i === 0
                      ? 1
                      : 0,

                  transition:
                    'opacity 0.7s ease',

                  willChange:
                    'opacity',
                }}
              />

            )
          )}


          {/* DARK OVERLAY */}

          <div
            style={{
              position:
                'absolute',

              inset: 0,

              pointerEvents:
                'none',

              background:
                `rgba(0,0,0,${f(
                  overlayDark
                )})`,
            }}
          />


          {/* ENTRY HERO */}

          <HeroLayout
            isEntry
            opacity={
              entryOpacity
            }
            reveal={1}
            pointerEvents={
              entryOpacity >
              0.05
                ? 'auto'
                : 'none'
            }
            headline={headline}
            headlineHighlight={
              headlineHighlight
            }
            description={
              description
            }
            primaryCta={
              primaryCta
            }
            eyebrow={eyebrow}
          />


          {/* CLOSING HERO */}

          <HeroLayout
            opacity={
              endReveal
            }
            reveal={
              endReveal
            }
            pointerEvents={
              endReveal >
              0.5
                ? 'auto'
                : 'none'
            }
            headline={headline}
            headlineHighlight={
              headlineHighlight
            }
            description={
              description
            }
            primaryCta={
              primaryCta
            }
            eyebrow={eyebrow}
          />


          {/* PROGRESS BAR */}

          <div
            style={{
              position:
                'absolute',

              bottom: 0,

              left: 0,

              height: 2,

              width:
                `${globalProgress * 100}%`,

              background:
                'rgba(255,255,255,0.35)',

              pointerEvents:
                'none',

              transition:
                'width 0.05s linear',
            }}
          />

        </motion.div>


        {/* ═════════════════════════════════════════════
            LEFT BOTTOM WHITE TAB
        ═════════════════════════════════════════════ */}

        <div
          className="sw-tab"
          style={{
            position:
              'absolute',

            bottom: 0,

            left: 0,

            width:
              'clamp(210px, 20vw, 300px)',

            height:
              TAB_H,

            background:
              '#ffffff',

            borderRadius:
              `0 ${CORNER_R}px 0 0`,

            zIndex: 30,

            display: 'flex',

            alignItems:
              'flex-end',

            paddingBottom: 18,

            paddingLeft: 30,

            overflow:
              'visible',
          }}
        >

          <div
            style={{
              display:
                'flex',

              alignItems:
                'center',

              gap: 12,

              transform:
                'translateY(-8px)',
            }}
          >

            {/* PHONE CIRCLE */}

            <div
              style={{
                width: 54,

                height: 54,

                flexShrink: 0,

                display:
                  'flex',

                alignItems:
                  'center',

                justifyContent:
                  'center',

                borderRadius:
                  '50%',

                background:
                  '#c9a96e',

                color: '#fff',

                boxShadow:
                  '0 8px 25px rgba(0,0,0,0.15)',
              }}
            >
              <Phone
                size={20}
              />
            </div>


            {/* SCROLL TEXT */}

            <span
              style={{
                fontSize:
                  '0.68rem',

                fontWeight: 600,

                letterSpacing:
                  '0.14em',

                textTransform:
                  'uppercase',

                color:
                  '#111',

                opacity: 0.52,

                whiteSpace:
                  'nowrap',
              }}
            >
              Scroll
            </span>


            <span
              style={{
                color:
                  '#111',

                opacity: 0.25,

                fontSize: 13,
              }}
            >
              |
            </span>


            {/* DOWN ARROW */}

            <motion.div
              animate={{
                y: [0, 5, 0],
              }}

              transition={{
                duration: 1.8,

                repeat: Infinity,

                ease: 'easeInOut',
              }}

              style={{
                lineHeight: 0,
              }}
            >
              <MoveDown
                size={14}
                style={{
                  color: '#111',
                  opacity: 0.45,
                }}
              />
            </motion.div>

          </div>

        </div>


        {/* ═════════════════════════════════════════════
            RIGHT BOTTOM SOCIAL TAB
        ═════════════════════════════════════════════ */}

        <div
          className="sw-tab"
          style={{
            position:
              'absolute',

            bottom: 0,

            right: 0,

            width:
              'clamp(260px, 24vw, 350px)',

            height:
              TAB_H,

            background:
              '#ffffff',

            borderRadius:
              `${CORNER_R}px 0 0 0`,

            zIndex: 30,

            display: 'flex',

            alignItems:
              'flex-end',

            justifyContent:
              'flex-end',

            paddingBottom: 18,

            paddingRight: 30,

            overflow:
              'visible',
          }}
        >

          <div
            style={{
              display:
                'flex',

              alignItems:
                'center',

              gap: 8,

              transform:
                'translateY(-8px)',

              padding: 8,

              borderRadius:
                40,

              background:
                'rgba(255,255,255,0.96)',

              boxShadow:
                '0 8px 30px rgba(0,0,0,0.08)',
            }}
          >

            {/* FACEBOOK */}

            <SocialButton
              href={
                siteConfig
                  .social
                  .facebook
              }
              label="Facebook"
            >
              <Facebook
                size={14}
              />
            </SocialButton>


            {/* INSTAGRAM */}

            <SocialButton
              href={
                siteConfig
                  .social
                  .instagram
              }
              label="Instagram"
            >
              <Instagram
                size={14}
              />
            </SocialButton>


            {/* YOUTUBE */}

            <SocialButton
              href={
                siteConfig
                  .social
                  .youtube
              }
              label="YouTube"
            >
              <Youtube
                size={14}
              />
            </SocialButton>


            {/* WHATSAPP */}

            <a
              href="#contact"

              aria-label="WhatsApp"

              style={{
                width: 48,

                height: 48,

                marginLeft: 2,

                display:
                  'flex',

                alignItems:
                  'center',

                justifyContent:
                  'center',

                borderRadius:
                  '50%',

                background:
                  '#c9a96e',

                color: '#fff',

                textDecoration:
                  'none',

                boxShadow:
                  '0 8px 22px rgba(0,0,0,0.14)',

                transition:
                  'transform .25s ease',
              }}

              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  'translateY(-3px)';
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  'translateY(0)';
              }}
            >
              <MessageCircle
                size={19}
              />
            </a>

          </div>

        </div>


        {/* ═════════════════════════════════════════════
            RESPONSIVE STYLES
        ═════════════════════════════════════════════ */}

        <style>{`

          @keyframes sw-pulse {

            0%,100% {
              opacity: .25;
              transform: scaleY(1);
            }

            50% {
              opacity: .70;
              transform: scaleY(1.15);
            }

          }


          @media (max-width: 1100px) {

            .sw-navbar-links {
              display: none !important;
            }

            .sw-nav-divider {
              display: none !important;
            }

          }


          @media (max-width: 700px) {

            .sw-tab {
              display: none !important;
            }

          }


          @media (max-width: 600px) {

            .sw-nav-cta span:first-child {
              display: none;
            }

          }

        `}</style>

      </div>

    </div>
  );
}


/* ══════════════════════════════════════════════════════
   HERO LAYOUT
══════════════════════════════════════════════════════ */

function HeroLayout({
  isEntry = false,

  opacity,

  reveal,

  pointerEvents,

  headline,

  headlineHighlight,

  description,

  primaryCta,

  eyebrow,

}: {
  isEntry?: boolean;

  opacity: number;

  reveal: number;

  pointerEvents:
    React.CSSProperties['pointerEvents'];

  headline: string;

  headlineHighlight?: string;

  description: string;

  primaryCta: {
    label: string;
    href: string;
  };

  eyebrow?: string;
}) {

  const words =
    headline.split(' ');


  const highlightWords =
    headlineHighlight
      ? headlineHighlight.split(' ')
      : [];


  const totalWords =
    words.length +
    highlightWords.length;


  const subtitleDelay =
    0.32 +
    totalWords * 0.07 +
    0.05;


  const ctaDelay =
    subtitleDelay + 0.18;


  const containerStyle:
    React.CSSProperties = {

    position:
      'absolute',

    inset: 0,

    display:
      'flex',

    flexDirection:
      'column',

    alignItems:
      'center',

    justifyContent:
      'center',

    textAlign:
      'center',

    padding:
      'clamp(100px, 13vh, 140px) clamp(1.5rem, 6vw, 6rem) clamp(16px, 3vh, 40px)',

    opacity,

    pointerEvents,

  };


  /* ═════════════════════════════════════════════════════
     CLOSING LAYOUT
  ═════════════════════════════════════════════════════ */

  if (!isEntry) {

    const up =
      (d: number) =>
        fadeUp(
          reveal,
          d,
          28
        );


    return (

      <div
        style={
          containerStyle
        }
      >

        <div
          style={up(0)}
        >
          <Badge
            eyebrow={
              eyebrow
            }
          />
        </div>


        <div
          style={{
            ...up(0.08),

            marginTop:
              '1.5rem',
          }}
        >

          <h2
            style={
              headingStyle
            }
          >

            <span>
              {headline}
            </span>


            {headlineHighlight && (
              <span
                style={{
                  display:
                    'block',

                  color:
                    '#c9a96e',
                }}
              >
                {
                  headlineHighlight
                }
              </span>
            )}

          </h2>

        </div>


        <div
          style={{
            ...up(0.20),

            marginTop:
              '1.25rem',
          }}
        >
          <p
            style={
              subtitleStyle
            }
          >
            {description}
          </p>
        </div>


        <div
          style={{
            ...up(0.30),

            marginTop:
              '2rem',
          }}
        >
          <CtaButton
            href={
              primaryCta.href
            }
            label={
              primaryCta.label
            }
          />
        </div>

      </div>

    );
  }


  /* ═════════════════════════════════════════════════════
     ENTRY LAYOUT
  ═════════════════════════════════════════════════════ */

  return (

    <div
      style={
        containerStyle
      }
    >

      {/* BADGE */}

      <motion.div
        initial={{
          opacity: 0,
          y: -18,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.7,

          delay: 0.15,

          ease: EASE,
        }}
      >

        <Badge
          eyebrow={
            eyebrow
          }
        />

      </motion.div>


      {/* HEADING */}

      <h1
        style={{
          ...headingStyle,

          marginTop:
            'clamp(1rem, 2vh, 1.75rem)',
        }}
      >

        {/* MAIN HEADLINE */}

        <span
          style={{
            display:
              'block',
          }}
        >

          {words.map(
            (
              word,
              i
            ) => (

              <span
                key={i}

                style={{
                  display:
                    'inline-block',

                  overflow:
                    'hidden',

                  verticalAlign:
                    'bottom',
                }}
              >

                <motion.span
                  style={{
                    display:
                      'inline-block',
                  }}

                  initial={{
                    y: '105%',
                  }}

                  animate={{
                    y: '0%',
                  }}

                  transition={{
                    duration: 0.72,

                    delay:
                      0.30 +
                      i * 0.07,

                    ease: EASE,
                  }}
                >

                  {word}
                  {' '}

                </motion.span>

              </span>

            )
          )}

        </span>


        {/* HIGHLIGHT */}

        {highlightWords.length >
          0 && (

          <span
            style={{
              display:
                'block',
            }}
          >

            {highlightWords.map(
              (
                word,
                i
              ) => (

                <span
                  key={`h${i}`}

                  style={{
                    display:
                      'inline-block',

                    overflow:
                      'hidden',

                    verticalAlign:
                      'bottom',
                  }}
                >

                  <motion.span
                    style={{
                      display:
                        'inline-block',

                      color:
                        '#c9a96e',
                    }}

                    initial={{
                      y: '105%',
                    }}

                    animate={{
                      y: '0%',
                    }}

                    transition={{
                      duration: 0.72,

                      delay:
                        0.30 +
                        (
                          words.length +
                          i
                        ) *
                          0.07,

                      ease: EASE,
                    }}
                  >

                    {word}

                    {i <
                      highlightWords.length -
                        1
                      ? ' '
                      : ''}

                  </motion.span>

                </span>

              )
            )}

          </span>

        )}

      </h1>


      {/* DESCRIPTION */}

      <motion.p
        style={{
          ...subtitleStyle,

          marginTop:
            'clamp(0.9rem, 1.8vh, 1.5rem)',
        }}

        initial={{
          opacity: 0,
          y: 22,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.85,

          delay:
            subtitleDelay,

          ease: EASE,
        }}
      >

        {description}

      </motion.p>


      {/* CTA */}

      <motion.div
        style={{
          marginTop:
            'clamp(1.5rem, 2.8vh, 2.25rem)',
        }}

        initial={{
          opacity: 0,
          y: 22,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.75,

          delay:
            ctaDelay,

          ease: EASE,
        }}
      >

        <CtaButton
          href={
            primaryCta.href
          }
          label={
            primaryCta.label
          }
        />

      </motion.div>

    </div>

  );
}


/* ══════════════════════════════════════════════════════
   BADGE
══════════════════════════════════════════════════════ */

function Badge({
  eyebrow,
}: {
  eyebrow?: string;
}) {

  return (

    <span
      style={{
        display:
          'inline-flex',

        alignItems:
          'center',

        gap: 9,

        padding:
          '10px 20px',

        borderRadius:
          999,

        background:
          'rgba(255,255,255,0.10)',

        border:
          '1px solid rgba(255,255,255,0.22)',

        backdropFilter:
          'blur(14px)',

        WebkitBackdropFilter:
          'blur(14px)',

        fontSize:
          '0.75rem',

        fontWeight: 500,

        letterSpacing:
          '0.035em',

        color:
          'rgba(255,255,255,0.90)',

        whiteSpace:
          'nowrap',
      }}
    >

      <span
        style={{
          width: 7,

          height: 7,

          borderRadius:
            '50%',

          background:
            '#c9a96e',

          flexShrink: 0,

          boxShadow:
            '0 0 6px rgba(201,169,110,0.8)',
        }}
      />

      <MapPin
        size={13}
        style={{
          color:
            '#c9a96e',
        }}
      />

      {eyebrow ??
        'Premium Interior Design Studio'}

    </span>

  );
}


/* ══════════════════════════════════════════════════════
   CTA BUTTON
══════════════════════════════════════════════════════ */

function CtaButton({
  href,
  label,
}: {
  href: string;

  label: string;
}) {

  return (

    <Link
      href={href}

      style={{
        display:
          'inline-flex',

        alignItems:
          'center',

        gap: 14,

        padding:
          '8px 25px 8px 8px',

        minHeight: 62,

        borderRadius:
          999,

        background:
          '#ffffff',

        color:
          '#17120f',

        fontSize:
          '0.95rem',

        fontWeight: 650,

        letterSpacing:
          '0.01em',

        textDecoration:
          'none',

        boxShadow:
          '0 8px 36px rgba(0,0,0,0.28)',

        transition:
          'transform 300ms cubic-bezier(0.22,1,0.36,1), box-shadow 300ms cubic-bezier(0.22,1,0.36,1)',
      }}

      onMouseEnter={(e) => {

        (
          e.currentTarget as HTMLElement
        ).style.transform =
          'scale(1.04)';

        (
          e.currentTarget as HTMLElement
        ).style.boxShadow =
          '0 12px 44px rgba(0,0,0,0.36)';

      }}

      onMouseLeave={(e) => {

        (
          e.currentTarget as HTMLElement
        ).style.transform =
          'scale(1)';

        (
          e.currentTarget as HTMLElement
        ).style.boxShadow =
          '0 8px 36px rgba(0,0,0,0.28)';

      }}
    >

      {/* PHONE */}

      <span
        style={{
          display:
            'inline-flex',

          alignItems:
            'center',

          justifyContent:
            'center',

          width: 45,

          height: 45,

          borderRadius:
            '50%',

          background:
            '#17120f',

          color:
            '#ffffff',

          flexShrink: 0,
        }}
      >

        <Phone
          size={17}
        />

      </span>


      {/* TEXT */}

      <span>
        {label}
      </span>


      {/* ARROW */}

      <ArrowRight
        size={20}
      />

    </Link>

  );
}


/* ══════════════════════════════════════════════════════
   SOCIAL BUTTON
══════════════════════════════════════════════════════ */

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;

  label: string;

  children: React.ReactNode;
}) {

  return (

    <a
      href={href}

      target="_blank"

      rel="noopener noreferrer"

      aria-label={label}

      style={{
        width: 36,

        height: 36,

        display:
          'flex',

        alignItems:
          'center',

        justifyContent:
          'center',

        borderRadius:
          '50%',

        background:
          '#111111',

        color:
          '#ffffff',

        textDecoration:
          'none',

        transition:
          'transform .25s ease, background .25s ease',
      }}

      onMouseEnter={(e) => {

        e.currentTarget.style
          .background =
          '#2b2118';

        e.currentTarget.style
          .transform =
          'translateY(-3px)';

      }}

      onMouseLeave={(e) => {

        e.currentTarget.style
          .background =
          '#111111';

        e.currentTarget.style
          .transform =
          'translateY(0)';

      }}
    >

      {children}

    </a>

  );
}


/* ══════════════════════════════════════════════════════
   STATIC STYLES
══════════════════════════════════════════════════════ */

const headingStyle:
  React.CSSProperties = {

  fontFamily:
    'var(--font-serif)',

  fontSize:
    'clamp(3.2rem, 6.2vw, 6.3rem)',

  fontWeight: 700,

  letterSpacing:
    '-0.045em',

  lineHeight:
    0.94,

  color:
    '#ffffff',

  margin: 0,

  maxWidth:
    '1200px',

  textAlign:
    'center',

};


const subtitleStyle:
  React.CSSProperties = {

  fontSize:
    'clamp(0.95rem, 1.35vw, 1.12rem)',

  lineHeight:
    1.65,

  color:
    'rgba(255,255,255,0.76)',

  maxWidth:
    650,

  margin:
    '0 auto',

  textAlign:
    'center',

};


/* ══════════════════════════════════════════════════════
   UTILITIES
══════════════════════════════════════════════════════ */

function getSceneIndex(
  rawScrolled: number,
  thresholds: number[]
): number {

  for (
    let i = 0;
    i < thresholds.length;
    i++
  ) {

    if (
      rawScrolled <=
      thresholds[i]
    ) {
      return i;
    }

  }

  return (
    thresholds.length - 1
  );

}


function fadeUp(
  reveal: number,
  delay: number,
  lift: number
): React.CSSProperties {

  const local =
    easeOutQuart(
      Math.min(
        Math.max(
          (
            reveal -
            delay
          ) /
            (
              1 -
              delay +
              0.001
            ),
          0
        ),
        1
      )
    );


  return {

    opacity: local,

    transform:
      `translateY(${lift * (1 - local)}px)`,

  };

}


function easeOutQuart(
  t: number
): number {

  return (
    1 -
    Math.pow(
      1 - t,
      4
    )
  );

}


function f(
  n: number
) {

  return n.toFixed(2);

}