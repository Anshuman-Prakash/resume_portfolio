import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Fade-and-rise once when the block scrolls into view. */
export const Reveal = ({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
}) => {
  const Comp = motion[as];
  return (
    <Comp
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Comp>
  );
};

/**
 * Section opener: a full-width ink rule, the section number and kicker
 * set in mono, then the headline in the display serif.
 */
export const SectionHead = ({
  index,
  kicker,
  title,
  aside,
  quiet,
  className,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  aside?: ReactNode;
  /** Set the heading in the mono row instead of the display serif. */
  quiet?: boolean;
  className?: string;
}) => (
  <header className={cn(quiet ? "mb-10 md:mb-14" : "mb-14 md:mb-20 lg:mb-28", className)}>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, ease: EASE }}
      className="h-px origin-left bg-foreground"
    />
    <div className="grid-12 pt-3">
      <span className="label col-span-3 md:col-span-2 text-accent">§ {index}</span>
      <span className="label col-span-9 md:col-span-4 text-muted-foreground">{kicker}</span>
      {quiet ? (
        <h2 className="label col-span-12 md:col-span-6 mt-1 md:mt-0 md:text-right">{title}</h2>
      ) : (
        aside && <span className="label hidden md:block md:col-span-6 text-right text-muted-foreground">{aside}</span>
      )}
    </div>
    {!quiet && (
    <Reveal className="grid-12 mt-8 md:mt-12">
      <h2 className="display col-span-12 md:col-start-3 md:col-span-10 text-[clamp(3rem,8.5vw,8.5rem)]">
        {title}
      </h2>
    </Reveal>
    )}
  </header>
);

/** A thin diagonal arrow drawn to sit on the text baseline. */
export const Arrow = ({
  className,
  direction = "ne",
}: {
  className?: string;
  direction?: "up" | "ne" | "e" | "se" | "down";
}) => {
  const rotate = { up: -45, ne: 0, e: 45, se: 90, down: 135 }[direction];
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("inline-block h-[0.8em] w-[0.8em] shrink-0", className)}
      style={{ transform: `rotate(${rotate}deg)` }}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
    >
      <path d="M4 12 12 4M5.5 4H12v6.5" />
    </svg>
  );
};
