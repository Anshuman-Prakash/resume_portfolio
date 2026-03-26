import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";

const education = [
  {
    degree: "B.Tech in Electronics & Communication Engineering",
    institution: "Birla Institute of Technology",
    period: "2023 – 2027",
    grade: "CGPA: 7.5+/10",
    highlights: ["DSA & Algorithm Design", "Microprocessors & Embedded Systems", "Web Technologies"],
  },
  {
    degree: "Higher Secondary (XII)",
    institution: "Rose Public School",
    period: "2021 – 2023",
    grade: "91.2%",
    highlights: ["Physics, Chemistry, Mathematics"],
  },
  {
    degree: "Senior Secondary (X)",
    institution: "Rose Public School",
    period: "2019 – 2021",
    grade: "90.4%",
    highlights: ["Physics, Chemistry, Mathematics", "Computer Science"],
  },
];

const EducationSection = () => {
  return (
    <section id="education" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-secondary mb-2 tracking-widest uppercase">Academic background</p>
          <h2 className="text-3xl md:text-5xl font-bold">Education</h2>
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-hover rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                    <h3 className="text-lg font-bold text-foreground">{edu.degree}</h3>
                    <span className="font-mono text-xs text-primary flex items-center gap-1">
                      <Calendar size={12} /> {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{edu.institution}</p>
                  <p className="text-sm font-mono text-accent mb-3">{edu.grade}</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((h) => (
                      <span key={h} className="text-xs px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 font-mono">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
