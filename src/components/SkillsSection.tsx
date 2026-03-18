import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  color: "primary" | "secondary" | "accent";
}

const categories: { title: string; skills: Skill[] }[] = [
  {
    title: "MERN Stack",
    skills: [
      { name: "MongoDB", level: 85, color: "accent" },
      { name: "Express.js", level: 80, color: "accent" },
      { name: "React", level: 90, color: "primary" },
      { name: "Node.js", level: 85, color: "accent" },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "JavaScript", level: 90, color: "primary" },
      { name: "TypeScript", level: 80, color: "primary" },
      { name: "C/C++", level: 75, color: "secondary" },
      { name: "HTML/CSS", level: 90, color: "primary" },
    ],
  },
  {
    title: "Databases & Tools",
    skills: [
      { name: "MySQL", level: 75, color: "secondary" },
      { name: "Git & GitHub", level: 85, color: "primary" },
      { name: "VS Code", level: 90, color: "primary" },
      { name: "REST APIs", level: 85, color: "accent" },
    ],
  },
  {
    title: "CS Fundamentals",
    skills: [
      { name: "OOPs", level: 75, color: "secondary" },
      { name: "OS", level: 85, color: "primary" },
      { name: "CN", level: 90, color: "primary" },
      { name: "DBMS", level: 85, color: "accent" },
    ],
  },
];

const colorMap = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
};

const glowMap = {
  primary: "shadow-[0_0_8px_hsl(217_91%_60%/0.5)]",
  secondary: "shadow-[0_0_8px_hsl(271_81%_56%/0.5)]",
  accent: "shadow-[0_0_8px_hsl(160_84%_39%/0.5)]",
};

const SkillsSection = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2 tracking-widest uppercase">What I work with</p>
          <h2 className="text-3xl md:text-5xl font-bold">Skills & Technologies</h2>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.15 }}
              className="glass-hover rounded-2xl p-6"
            >
              <h3 className="font-semibold text-lg mb-6 text-foreground">{cat.title}</h3>
              <div className="space-y-5">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span className="text-sm font-mono text-muted-foreground">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-border/50 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: ci * 0.15 + si * 0.1, ease: "easeOut" }}
                        className={`h-full rounded-full ${colorMap[skill.color]} ${glowMap[skill.color]}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
