import { Reveal, SectionHead } from "@/components/editorial";

const experiences = [
  {
    role: "Software Quality Assurance Intern",
    company: "Adscart Technologies Pvt. Ltd.",
    period: "March 2026 – Present",
    current: true,
    points: [
      "Designed and implemented RESTful APIs to support application features and backend communication.",
      "Developed and optimized database schemas for efficient data storage and retrieval.",
      "Built AI-driven automated test suites using Testim to improve test coverage and reduce manual effort",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Mojingo",
    period: "Oct 2025 – Dec 2025",
    current: false,
    points: [
      "Designed and implemented a microservices architecture for an e-commerce platform",
      "Integrated third-party payment gateways and real-time notification systems",
      "Collaborated with a team of 5 using Agile methodologies and Git workflow",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="section">
      <div className="frame">
        <SectionHead index="04" kicker="My journey" title={<><em>Experience</em></>} aside="Most recent first" />

        <ol className="border-t border-foreground">
          {experiences.map((exp, i) => (
            <Reveal as="li" key={exp.role} delay={i * 0.08} className="grid-12 gap-y-6 border-b border-border py-10 md:py-14">
              <div className="col-span-12 md:col-span-3 lg:col-span-2">
                <p className="meta flex items-center gap-2">
                  {exp.current && <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  {exp.period}
                </p>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-5">
                <h3 className="display text-[clamp(2rem,3.6vw,3.25rem)] leading-[1] text-balance">{exp.role}</h3>
                <p className="label mt-4 text-muted-foreground">{exp.company}</p>
              </div>
              <ul className="col-span-12 md:col-start-4 md:col-span-9 lg:col-start-8 lg:col-span-5 space-y-3 lg:pt-2">
                {exp.points.map((point, j) => (
                  <li key={j} className="flex gap-4 text-[0.975rem] leading-relaxed text-muted-foreground">
                    <span className="meta pt-[0.2em] text-foreground/60 tabular-nums">{String.fromCharCode(97 + j)}.</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default ExperienceSection;
