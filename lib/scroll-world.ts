/** scroll-world — config types */

export interface WorldScene {
  /** Path to video file (served from /public) */
  src: string;
  /** How many px of scroll = 1 s of video (default 120) */
  scrollPxPerSecond?: number;
  /** Optional label shown briefly as the scene transitions in */
  label?: string;
}

export interface WorldConfig {
  scenes: WorldScene[];
  /** Text shown over the final frame once all scenes are done */
  headline: string;
  headlineHighlight?: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Eyebrow line above headline */
  eyebrow?: string;
}
