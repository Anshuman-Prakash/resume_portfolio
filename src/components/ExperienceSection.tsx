import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Software Quality Assurance Intern",
    company: "Adscart Technologies Pvt. Ltd.",
    period: "March 2026 – Present",
    points: [
      "Designed and implemented RESTful APIs to support application features and backend communication.",
      "Developed and optimized database schemas for efficient data storage and retrieval.",
      "Built AI-driven automated test suites using Testim to improve test coverage and reduce manual effort",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Civic Voice",
    period: "Oct 2025 – Dec 2025",
    points: [
      "Designed and implemented a microservices architecture for an e-commerce platform",
      "Integrated third-party payment gateways and real-time notification systems",
      "Collaborated with a team of 5 using Agile methodologies and Git workflow",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary mb-2 tracking-widest uppercase">My journey</p>
          <h2 className="text-3xl md:text-5xl font-bold">Experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-16"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                  <Briefcase size={10} className="text-primary" />
                </div>

                <div className="glass-hover rounded-xl p-5">
                  <span className="font-mono text-xs text-primary">{exp.period}</span>
                  <h3 className="text-lg font-bold mt-1 text-foreground">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.points.map((point, j) => (
                      <li key={j} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1 shrink-0">▸</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
