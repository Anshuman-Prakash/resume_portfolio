import { motion } from "framer-motion";
import { EASE, Reveal, SectionHead } from "@/components/editorial";
import profileImg from "@/assets/portrait-1200.jpg";

const facts = [
  { label: "ECE Graduate", value: "B.Tech" },
  { label: "DSA Problems", value: "500+" },
  { label: "Projects Built", value: "15+" },
  { label: "Years Coding", value: "3+" },
];

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="frame">
        <SectionHead index="01" kicker="Get to know me" title={<>About <em>Me</em></>} aside="Hardware → Software" />

        <div className="grid-12 gap-y-14">
          {/* Portrait plate */}
          {/* The in-view trigger lives on the unclipped figure: a fully clipped
              element never registers as intersecting. */}
          <motion.figure
            initial="hidden"
            whileInView="shown"
            viewport={{ once: true, margin: "-80px" }}
            className="col-span-12 sm:col-span-8 md:col-span-5 lg:col-span-4 lg:col-start-1"
          >
            <motion.div
              variants={{ hidden: { clipPath: "inset(100% 0% 0% 0%)" }, shown: { clipPath: "inset(0% 0% 0% 0%)" } }}
              transition={{ duration: 1.3, ease: EASE }}
              className="group relative aspect-[4/5] overflow-hidden bg-card"
            >
              <motion.img
                src={profileImg}
                alt="Portrait of Anshuman Prakash"
                loading="lazy"
                decoding="async"
                variants={{ hidden: { scale: 1.15 }, shown: { scale: 1 } }}
                transition={{ duration: 1.6, ease: EASE }}
                className="h-full w-full object-cover object-[50%_30%] grayscale contrast-[1.08] transition-[filter] duration-700 group-hover:grayscale-0"
              />
            </motion.div>
            <figcaption className="label mt-3 flex justify-between text-muted-foreground">
              <span>Fig. 01 — Anshuman Prakash</span>
              <span>ECE / B.Tech</span>
            </figcaption>
          </motion.figure>

          {/* Text */}
          <div className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-7 lg:col-start-6 flex flex-col justify-between gap-14">
            <div>
              <Reveal>
                <p className="display text-[clamp(1.85rem,3.4vw,3.15rem)] leading-[1.06] tracking-[-0.015em] text-balance">
                  I'm a passionate MERN Stack Developer with a background in{" "}
                  <em className="text-accent">Electronics and Communication Engineering.</em> My journey from
                  hardware to software has given me a unique perspective on building efficient, scalable
                  applications.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-[34rem] text-[1.0625rem] leading-relaxed text-muted-foreground md:ml-[16.66%]">
                  I love solving complex problems, contributing to open-source, and constantly pushing myself
                  through competitive programming on LeetCode. When I'm not coding, I'm exploring new
                  technologies and design patterns to level up my engineering craft.
                </p>
              </Reveal>
            </div>

            <dl className="grid grid-cols-2 lg:grid-cols-4 border-t border-foreground">
              {facts.map((fact, i) => (
                <Reveal
                  key={fact.label}
                  delay={0.05 * i}
                  className="flex flex-col-reverse gap-2 border-b border-border py-5 pr-4 even:border-l even:pl-4 lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:pl-4"
                >
                  <dt className="label text-muted-foreground">{fact.label}</dt>
                  <dd className="display text-[clamp(2.5rem,4.2vw,3.75rem)]">{fact.value}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
