import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Facebook,
  Instagram,
  Youtube,
} from 'lucide-react';

type HeroProps = {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function Hero({
  eyebrow = 'Premium Interior Design Agency',
  title,
  titleHighlight,
  description,
  image,
  imageAlt,
  primaryLabel = 'Book Free Consultation',
  primaryHref = '/contact',
  secondaryLabel = 'View Our Projects',
  secondaryHref = '/projects',
}: HeroProps) {
  return (
    <section className="relative w-full bg-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <div
        id="hero"
        className="
          group
          relative
          h-[88svh]
          min-h-[680px]
          w-full
          overflow-hidden

          md:h-[90svh]
          lg:h-[92vh]
          lg:min-h-[760px]
        "
      >
        {/* ===================================================
            BACKGROUND
        ==================================================== */}

        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="
              object-cover
              object-center
              scale-[1.02]
              transition-transform
              duration-[3000ms]
              ease-out
              group-hover:scale-[1.045]
            "
          />

          {/* Main overlay */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Top overlay */}
          <div
            className="
              absolute
              inset-x-0
              top-0
              h-[35%]
              bg-gradient-to-b
              from-black/40
              via-black/15
              to-transparent
            "
          />

          {/* Center vignette */}
          <div
            className="
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,transparent_10%,rgba(0,0,0,0.12)_70%,rgba(0,0,0,0.22)_100%)]
            "
          />

          {/* Bottom overlay */}
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-[42%]
              bg-gradient-to-t
              from-black/45
              via-black/10
              to-transparent
            "
          />
        </div>

        {/* ===================================================
            HERO CONTENT
        ==================================================== */}

        <div
          className="
            absolute
            inset-0
            z-10
            flex
            items-center
            justify-center
            px-5
            pb-[90px]
            pt-24

            sm:px-8

            md:pb-[105px]

            lg:px-12
            lg:pb-[115px]
            lg:pt-28
          "
        >
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[1180px]
              flex-col
              items-center
              text-center
            "
          >
            {/* =================================================
                EYEBROW
            ================================================== */}

            {eyebrow && (
              <div
                className="
                  mb-6
                  inline-flex
                  items-center
                  gap-2.5

                  rounded-full

                  border
                  border-white/30

                  bg-white/10

                  px-4
                  py-2.5

                  text-[12px]
                  font-medium
                  tracking-[0.02em]
                  text-white

                  shadow-[0_8px_30px_rgba(0,0,0,0.12)]

                  backdrop-blur-md

                  sm:text-sm

                  lg:mb-8
                  lg:px-5
                "
              >
                <span
                  className="
                    h-2.5
                    w-2.5
                    shrink-0
                    rounded-full
                    bg-[#E6AD4F]
                    shadow-[0_0_15px_rgba(230,173,79,0.65)]
                  "
                />

                {eyebrow}
              </div>
            )}

            {/* =================================================
                TITLE
            ================================================== */}

            <h1
              className="
                max-w-[1120px]

                text-balance

                font-sans

                text-[44px]
                font-bold

                leading-[0.98]

                tracking-[-0.055em]

                text-white

                sm:text-[56px]

                md:text-[68px]

                lg:text-[82px]

                xl:text-[94px]
              "
            >
              {title}

              {titleHighlight && (
                <>
                  {' '}

                  <span className="text-[#E6AD4F]">
                    {titleHighlight}
                  </span>
                </>
              )}
            </h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mt-6

                max-w-[780px]

                text-balance

                text-[15px]
                font-normal

                leading-[1.65]

                text-white/90

                sm:text-[17px]

                md:text-[18px]

                lg:mt-7
                lg:text-[19px]
              "
            >
              {description}
            </p>

            {/* =================================================
                CTA BUTTONS
            ================================================== */}

            <div
              className="
                mt-8

                flex
                flex-col
                items-center

                gap-3

                sm:flex-row

                lg:mt-9
              "
            >
              {/* PRIMARY */}

              <Link
                href={primaryHref}
                className="
                  group/primary

                  inline-flex

                  h-[56px]

                  items-center
                  justify-center

                  gap-3

                  rounded-full

                  bg-white

                  px-7

                  text-[15px]
                  font-semibold

                  text-[#2B170D]

                  shadow-[0_12px_35px_rgba(0,0,0,0.18)]

                  transition-all
                  duration-300

                  hover:-translate-y-1

                  hover:bg-[#E6AD4F]

                  hover:shadow-[0_18px_45px_rgba(0,0,0,0.25)]

                  sm:h-[62px]
                  sm:px-8
                  sm:text-[16px]
                "
              >
                <span>{primaryLabel}</span>

                <ArrowRight
                  className="
                    h-[18px]
                    w-[18px]

                    transition-transform
                    duration-300

                    group-hover/primary:translate-x-1
                  "
                />
              </Link>

              {/* SECONDARY */}

              {secondaryLabel && secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="
                    group/secondary

                    inline-flex

                    h-[56px]

                    items-center
                    justify-center

                    gap-3

                    rounded-full

                    border
                    border-white/35

                    bg-white/10

                    px-7

                    text-[15px]
                    font-medium

                    text-white

                    backdrop-blur-md

                    transition-all
                    duration-300

                    hover:-translate-y-1

                    hover:border-white

                    hover:bg-white

                    hover:text-[#2B170D]

                    sm:h-[62px]
                    sm:px-8
                    sm:text-[16px]
                  "
                >
                  <span>{secondaryLabel}</span>

                  <ArrowRight
                    className="
                      h-[17px]
                      w-[17px]

                      transition-transform
                      duration-300

                      group-hover/secondary:translate-x-1
                    "
                  />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================
            DESKTOP LEFT CUTOUT
        ====================================================== */}

        <div
          className="
            absolute
            bottom-0
            left-0
            z-30

            hidden

            md:block
          "
        >
          <div
            className="
              relative

              flex

              h-[94px]
              w-[230px]

              items-center
              justify-center

              rounded-tr-[48px]

              bg-white

              lg:h-[102px]
              lg:w-[255px]
              lg:rounded-tr-[54px]
            "
          >
            {/* ===============================================
                CURVE ABOVE LEFT EDGE
            ================================================ */}

            <div
              className="
                pointer-events-none

                absolute

                -top-[48px]
                left-0

                h-[48px]
                w-[48px]

                overflow-hidden

                lg:-top-[54px]
                lg:h-[54px]
                lg:w-[54px]
              "
            >
              <div
                className="
                  absolute

                  bottom-0
                  left-0

                  h-[96px]
                  w-[96px]

                  -translate-x-1/2
                  translate-y-1/2

                  rounded-full

                  shadow-[0_0_0_60px_white]

                  lg:h-[108px]
                  lg:w-[108px]
                "
              />
            </div>

            {/* ===============================================
                RIGHT INVERSE CURVE
            ================================================ */}

            <div
              className="
                pointer-events-none

                absolute

                -right-[48px]
                bottom-0

                h-[48px]
                w-[48px]

                overflow-hidden

                lg:-right-[54px]
                lg:h-[54px]
                lg:w-[54px]
              "
            >
              <div
                className="
                  absolute

                  -left-[48px]
                  -top-[48px]

                  h-[96px]
                  w-[96px]

                  rounded-full

                  shadow-[0_0_0_60px_white]

                  lg:-left-[54px]
                  lg:-top-[54px]
                  lg:h-[108px]
                  lg:w-[108px]
                "
              />
            </div>

            {/* SCROLL DOWN */}

            <a
              href="#after-hero"
              className="
                group/scroll

                relative
                z-10

                flex
                items-center

                gap-3

                text-[15px]
                font-medium

                text-[#2B170D]

                transition-opacity

                hover:opacity-60

                lg:text-[16px]
              "
            >
              <span>Scroll Down</span>

              <ArrowDown
                className="
                  h-5
                  w-5

                  transition-transform
                  duration-300

                  group-hover/scroll:translate-y-1
                "
              />
            </a>
          </div>
        </div>

        {/* =====================================================
            DESKTOP RIGHT CUTOUT
        ====================================================== */}

        <div
          className="
            absolute
            bottom-0
            right-0
            z-30

            hidden

            md:block
          "
        >
          <div
            className="
              relative

              flex

              h-[94px]
              w-[235px]

              items-center
              justify-center

              rounded-tl-[48px]

              bg-white

              lg:h-[102px]
              lg:w-[265px]
              lg:rounded-tl-[54px]
            "
          >
            {/* ===============================================
                LEFT INVERSE CURVE
            ================================================ */}

            <div
              className="
                pointer-events-none

                absolute

                -left-[48px]
                bottom-0

                h-[48px]
                w-[48px]

                overflow-hidden

                lg:-left-[54px]
                lg:h-[54px]
                lg:w-[54px]
              "
            >
              <div
                className="
                  absolute

                  -right-[48px]
                  -top-[48px]

                  h-[96px]
                  w-[96px]

                  rounded-full

                  shadow-[0_0_0_60px_white]

                  lg:-right-[54px]
                  lg:-top-[54px]
                  lg:h-[108px]
                  lg:w-[108px]
                "
              />
            </div>

            {/* ===============================================
                CURVE ABOVE RIGHT EDGE
            ================================================ */}

            <div
              className="
                pointer-events-none

                absolute

                -top-[48px]
                right-0

                h-[48px]
                w-[48px]

                overflow-hidden

                lg:-top-[54px]
                lg:h-[54px]
                lg:w-[54px]
              "
            >
              <div
                className="
                  absolute

                  bottom-0
                  right-0

                  h-[96px]
                  w-[96px]

                  translate-x-1/2
                  translate-y-1/2

                  rounded-full

                  shadow-[0_0_0_60px_white]

                  lg:h-[108px]
                  lg:w-[108px]
                "
              />
            </div>

            {/* SOCIAL ICONS */}

            <div
              className="
                relative
                z-10

                flex
                items-center

                gap-3
              "
            >
              <SocialButton
                href="https://facebook.com"
                label="Facebook"
              >
                <Facebook
                  className="h-[17px] w-[17px]"
                  strokeWidth={2}
                />
              </SocialButton>

              <SocialButton
                href="https://instagram.com"
                label="Instagram"
              >
                <Instagram
                  className="h-[17px] w-[17px]"
                  strokeWidth={2}
                />
              </SocialButton>

              <SocialButton
                href="https://youtube.com"
                label="YouTube"
              >
                <Youtube
                  className="h-[18px] w-[18px]"
                  strokeWidth={2}
                />
              </SocialButton>
            </div>
          </div>
        </div>

        {/* =====================================================
            MOBILE BOTTOM CONTROLS
        ====================================================== */}

        <div
          className="
            absolute

            bottom-4
            left-4
            right-4

            z-30

            flex
            items-center
            justify-between

            md:hidden
          "
        >
          {/* SCROLL */}

          <a
            href="#after-hero"
            className="
              flex

              h-[46px]

              items-center

              gap-2

              rounded-full

              bg-white/95

              px-4

              text-[12px]
              font-medium

              text-[#2B170D]

              shadow-lg

              backdrop-blur-md
            "
          >
            Scroll Down

            <ArrowDown className="h-4 w-4" />
          </a>

          {/* SOCIAL */}

          <div
            className="
              flex

              items-center

              gap-1

              rounded-full

              bg-white/95

              p-1.5

              shadow-lg

              backdrop-blur-md
            "
          >
            <MobileSocialButton
              href="https://facebook.com"
              label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </MobileSocialButton>

            <MobileSocialButton
              href="https://instagram.com"
              label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </MobileSocialButton>

            <MobileSocialButton
              href="https://youtube.com"
              label="YouTube"
            >
              <Youtube className="h-4 w-4" />
            </MobileSocialButton>
          </div>
        </div>
      </div>

      {/* =====================================================
          NEXT SECTION ANCHOR
      ====================================================== */}

      <div
        id="after-hero"
        className="scroll-mt-24"
      />
    </section>
  );
}


/* ==========================================================
   SOCIAL BUTTON
========================================================== */

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
      className="
        flex

        h-[44px]
        w-[44px]

        items-center
        justify-center

        rounded-full

        bg-[#351709]

        text-[#E6AD4F]

        transition-all
        duration-300

        hover:-translate-y-1

        hover:scale-105

        hover:bg-[#E6AD4F]

        hover:text-[#351709]

        lg:h-[46px]
        lg:w-[46px]
      "
    >
      {children}
    </a>
  );
}


/* ==========================================================
   MOBILE SOCIAL BUTTON
========================================================== */

function MobileSocialButton({
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
      className="
        flex

        h-9
        w-9

        items-center
        justify-center

        rounded-full

        bg-[#351709]

        text-[#E6AD4F]

        transition-colors
        duration-300

        hover:bg-[#E6AD4F]

        hover:text-[#351709]
      "
    >
      {children}
    </a>
  );
}