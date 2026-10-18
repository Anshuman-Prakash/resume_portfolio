import { Reveal, SectionHead } from "@/components/editorial";

const education = [
  {
    degree: "B.Tech in Electronics & Communication Engineering",
    institution: "Birla Institute of Technology",
    period: "2023 – 2027",
    grade: "CGPA: 8.03/10",
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

/** "CGPA: 8/10" → label "CGPA", figure "8/10"; percentages stay whole. */
const splitGrade = (grade: string) => {
  const [head, tail] = grade.split(": ");
  return tail ? { unit: head, figure: tail } : { unit: "Score", figure: head };
};

const EducationSection = () => {
  return (
    <section id="education" className="section">
      <div className="frame">
        <SectionHead index="06" kicker="Academic background" title={<><em>Education</em></>} aside="Transcript" />

        <div className="hidden lg:grid grid-12 label border-b border-foreground pb-3 text-muted-foreground">
          <span className="col-span-2">Period</span>
          <span className="col-span-5">Qualification</span>
          <span className="col-span-2">Result</span>
          <span className="col-span-3">Focus</span>
        </div>

        <ol className="border-t border-foreground lg:border-t-0">
          {education.map((edu, i) => {
            const { unit, figure } = splitGrade(edu.grade);
            return (
              <Reveal as="li" key={edu.degree} delay={i * 0.08} className="grid-12 gap-y-5 border-b border-border py-9 md:py-11">
                <p className="meta col-span-6 lg:col-span-2 lg:pt-2">{edu.period}</p>
                <div className="col-span-6 lg:hidden text-right">
                  <span className="display text-4xl leading-none">{figure}</span>
                  <span className="label ml-2 text-muted-foreground">{unit}</span>
                </div>
                <div className="col-span-12 lg:col-span-5">
                  <h3 className="display text-[clamp(1.9rem,3vw,2.75rem)] leading-[1.02] text-balance">{edu.degree}</h3>
                  <p className="label mt-3 text-muted-foreground">{edu.institution}</p>
                </div>
                <div className="hidden lg:block lg:col-span-2">
                  <p className="display text-[3.5rem] leading-[0.9]">{figure}</p>
                  <p className="label mt-2 text-muted-foreground">{unit}</p>
                </div>
                <ul className="col-span-12 lg:col-span-3 lg:pt-2 space-y-1.5">
                  {edu.highlights.map((h) => (
                    <li key={h} className="meta text-muted-foreground before:mr-2 before:text-accent before:content-['—']">
                      {h}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

export default EducationSection;
