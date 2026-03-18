import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Trophy, Target, Flame, Star, Award, Zap } from "lucide-react";

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const start = performance.now();
          const duration = 2000;
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <span ref={ref} className="font-mono text-3xl md:text-4xl font-bold">
      {display}{suffix}
    </span>
  );
}

const stats = [
  { icon: Target, label: "Problems Solved", value: 500, suffix: "+", color: "text-accent" },
  { icon: Flame, label: "Max Streak", value: 120, suffix: " days", color: "text-primary" },
  { icon: Star, label: "LeetCode Rating", value: 1800, suffix: "+", color: "text-secondary" },
  { icon: Trophy, label: "Contests Done", value: 10, suffix: "+", color: "text-accent" },
];

const achievements = [
  { icon: Award, title: "LeetCode Knight Badge", desc: "Achieved 1800+ rating in weekly contests" },
  { icon: Zap, title: "100 Days Streak", desc: "Maintained consistent daily problem solving" },
  { icon: Trophy, title: "Scholarship Recipient", desc: "Awarded GP Birla and regional merit-based scholarships twice for academic excellence." },
  { icon: Star, title: "SSB Interview Shortlist", desc: "Shortlisted for SSB interview– Indian Navy (South 24 Parganas)" },
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-accent mb-2 tracking-widest uppercase">Competitive coding</p>
          <h2 className="text-3xl md:text-5xl font-bold">Achievements & LeetCode</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-hover rounded-2xl p-6 text-center"
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-3`} />
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="text-xs text-muted-foreground mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {achievements.map((ach, i) => (
            <motion.div
              key={ach.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 5 }}
              className="glass-hover rounded-xl p-5 flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <ach.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{ach.title}</h3>
                <p className="text-sm text-muted-foreground">{ach.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
