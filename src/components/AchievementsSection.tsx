import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHead } from "@/components/editorial";

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setDisplay(Math.round(eased * value));
          if (progress < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}

const stats = [
  { label: "Problems Solved", value: 500, suffix: "+" },
  { label: "Max Streak", value: 100, suffix: " days" },
  { label: "LeetCode Rating", value: 1697, suffix: "+" },
  { label: "Contests Done", value: 10, suffix: "+" },
];

const achievements = [
  { title: "Amazon Hackon Semi-Finalist 2026", desc: "Selected as a semi-finalist in the Amazon Hackon competition." },
  { title: "LeetCode 50 Days Badge", desc: "Achieved 1697+ rating in weekly contests" },
  { title: "100 Days Streak", desc: "Maintained consistent daily problem solving" },
  { title: "Scholarship Recipient", desc: "Awarded GP Birla and regional merit-based scholarships twice for academic excellence." },
  { title: "SSB Interview Shortlist", desc: "Shortlisted for SSB interview– Indian Navy (South 24 Parganas)" },
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="section">
      <div className="frame">
        <SectionHead
          index="05"
          kicker="Competitive coding"
          title={<>Achievements <em>&amp;</em> LeetCode</>}
          aside="Record"
        />

        {/* Figures */}
        <dl className="grid grid-cols-2 lg:grid-cols-4 border-y border-foreground">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.06}
              className="flex flex-col-reverse justify-between gap-6 border-border py-8 pr-4 even:border-l even:pl-4 [&:nth-child(-n+2)]:border-b lg:[&:nth-child(-n+2)]:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-6"
            >
              <dt className="label text-muted-foreground">{stat.label}</dt>
              <dd className="display text-[clamp(3.25rem,7.5vw,7.5rem)] leading-[0.85] whitespace-nowrap">
                <AnimatedCounter value={stat.value} />
                <span className={stat.suffix === "+" ? "text-accent" : "italic text-[0.42em] text-muted-foreground"}>
                  {stat.suffix}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>

        {/* Ledger */}
        <ol className="mt-20 md:mt-28">
          {achievements.map((ach, i) => (
            <Reveal
              as="li"
              key={ach.title}
              delay={i * 0.05}
              className="grid-12 gap-y-2 border-b border-border py-6 md:py-7 first:border-t first:border-t-foreground"
            >
              <span className="label col-span-2 md:col-span-1 pt-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display col-span-10 md:col-span-6 text-[clamp(1.75rem,2.8vw,2.5rem)] leading-[1.05]">
                {ach.title}
              </h3>
              <p className="col-span-10 col-start-3 md:col-start-8 md:col-span-5 text-[0.975rem] leading-relaxed text-muted-foreground md:pt-2">
                {ach.desc}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default AchievementsSection;
