import { motion } from "framer-motion";
import { EASE, Reveal, SectionHead } from "@/components/editorial";

interface Skill {
  name: string;
  level: number;
}

const categories: { title: string; skills: Skill[] }[] = [
  {
    title: "MERN Stack",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "Express.js", level: 80 },
      { name: "React", level: 90 },
      { name: "Node.js", level: 85 },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 80 },
      { name: "C++", level: 90 },
      { name: "Python", level: 80 },
      { name: "HTML/CSS", level: 90 },
    ],
  },
  {
    title: "Databases & Tools",
    skills: [
      { name: "MySQL", level: 75 },
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "REST APIs", level: 85 },
    ],
  },
  {
    title: "CS Fundamentals",
    skills: [
      { name: "OOPs", level: 75 },
      { name: "OS", level: 85 },
      { name: "CN", level: 90 },
      { name: "DBMS", level: 85 },
    ],
  },
];

const TICKS = 20;

/** A 20-division meter, read like an instrument scale rather than a progress bar. */
const Meter = ({ level, delay }: { level: number; delay: number }) => {
  const filled = Math.round((level / 100) * TICKS);
  return (
    <div className="flex h-3 items-end justify-between" role="img" aria-label={`${level} percent`}>
      {Array.from({ length: TICKS }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scaleY: 0.3, opacity: 0.4 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: delay + i * 0.018, ease: EASE }}
          className={`block w-px origin-bottom ${
            i < filled ? "bg-foreground" : "bg-foreground/20"
          } ${i % 5 === 4 ? "h-full" : "h-[55%]"}`}
        />
      ))}
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section">
      <div className="frame">
        <SectionHead
          index="02"
          kicker="What I work with"
          title={<>Skills <em>&amp;</em> Technologies</>}
          aside="Scale 0 — 100"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-foreground">
          {categories.map((cat, ci) => (
            <Reveal
              key={cat.title}
              delay={ci * 0.08}
              className="border-b border-border py-8 sm:px-6 sm:odd:pl-0 sm:even:border-l lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-6 lg:last:pr-0"
            >
              <p className="label text-accent">{String.fromCharCode(65 + ci)}.</p>
              <h3 className="display mt-3 mb-8 text-[2.25rem] leading-none">{cat.title}</h3>
              <ul className="space-y-5">
                {cat.skills.map((skill, si) => (
                  <li key={skill.name}>
                    <div className="mb-2 flex items-baseline justify-between gap-3">
                      <span className="text-[0.95rem] font-medium">{skill.name}</span>
                      <span className="meta tabular-nums text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Meter level={skill.level} delay={0.15 + si * 0.06} />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
