import { Fragment } from "react";
import { Arrow, Reveal, SectionHead } from "@/components/editorial";
import { cn } from "@/lib/utils";

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  alias?: string;
};

const projects: Project[] = [
  {
    title: "NakedData",
    alias: "IntelliQuery",
    description: "Drop a dataset, ask a question, get the truth. Upload any CSV, Excel, or connect MongoDB and get grounded, citation-backed insights in plain English, powered by a local LangGraph + Ollama pipeline. No cloud keys. No lock-in.",
    tech: ["Python", "FastAPI", "React", "LangGraph", "Ollama", "MongoDB", "Pandas", "Tailwind CSS"],
    github: "https://github.com/Anshuman-Prakash/NakedData",
  },
  {
    title: "AI Campus Flow",
    description: "CampusFlow is an AI-powered Student Operating System designed to solve the problem of fragmented student information across multiple platforms.",
    tech: ["React", "TypeScript", "Gemini API", "Node.js", "MongoDB", "Express", "Razorpay", "JWT", "Tailwind CSS"],
    github: "https://github.com/Anshuman-Prakash/CampusFlow",
  },
  {
    title: "Ecomme",
    description: "Full-stack MERN e-commerce app with user auth, product management, cart, Razorpay payments, and admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Razorpay", "JWT", "Tailwind CSS"],
    github: "https://github.com/Anshuman-Prakash/Ecomme",
  },
  {
    title: "Baatein",
    description: "Socket.io powered real-time messaging application with group chats, notifications, and file sharing.",
    tech: ["React", "Socket.io", "Node.js", "MongoDB", "Express", "Tailwind CSS", "JWT", "Cloudinary"],
    github: "https://github.com/Anshuman-Prakash/chat-app",
  },
  {
    title: "LoveUrDays",
    description: "Online Hotel Booking System with real-time availability, secure payments, and user reviews.",
    tech: ["React", "JavaScript", "Express", "MySQL", "Razorpay", "JWT", "Tailwind CSS"],
    github: "https://github.com/Anshuman-Prakash/LoveurDays",
  },
  {
    title: "Coinify",
    description: "Online antique coin marketplace with user authentication, product listings, secure payments, and admin dashboard.",
    tech: ["React", "MongoDB", "Cloudinary", "JWT", "Tailwind CSS", "Node.js", "Express", "Razorpay"],
    github: "https://github.com/Anshuman-Prakash/Coinify",
  },
  {
    title: "Calender",
    description: "A modern, responsive Wall Calendar Web Application inspired by physical hanging calendars. It combines clean UI design, interactive date selection, and note-taking features to create a polished frontend experience.",
    tech: ["React", "Tailwind CSS", "Javascript"],
    github: "https://github.com/Anshuman-Prakash/calendar",
  },
  {
    title: "Iphone-web",
    description: "Iphone 14 Pro clone built with React, featuring responsive design, interactive UI, and smooth animations.",
    tech: ["React", "Tailwind CSS", "Razorpay", "Three.js", "Framer Motion", "Gsap"],
    github: "https://github.com/Anshuman-Prakash/iPhone-web",
  },
];

const TOTAL = String(projects.length).padStart(2, "0");
const num = (i: number) => String(i + 1).padStart(2, "0");
const repo = (url: string) => url.replace("https://github.com/", "");

const SourceLink = ({ href, className }: { href: string; className?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cn("group/src inline-flex items-center gap-2 text-[0.95rem] font-medium", className)}
  >
    <span className="u-link">View source on GitHub</span>
    <Arrow className="transition-transform duration-300 group-hover/src:-translate-y-0.5 group-hover/src:translate-x-0.5" />
  </a>
);

/** 01 — the lead project, set as an inverted full-width spread. */
const Spread = ({ p }: { p: Project }) => {
  const words = p.title.split(" ");
  const last = words.pop();
  return (
    <Reveal as="article" className="ink bg-background text-foreground">
      <div className="p-6 sm:p-10 lg:p-14">
        <div className="grid-12 label text-muted-foreground">
          <span className="col-span-6 md:col-span-2 text-accent">
            {num(0)} / {TOTAL}
          </span>
          <span className="col-span-6 md:col-span-4 text-right md:text-left">Featured</span>
          <span className="hidden md:block md:col-span-6 text-right normal-case tracking-normal meta">{repo(p.github)}</span>
        </div>

        <h3 className="display mt-10 md:mt-16 text-[clamp(3.5rem,11.5vw,11.5rem)] leading-[0.85]">
          {words.length > 0 && `${words.join(" ")} `}
          <em>{last}</em>
        </h3>
        {p.alias && <p className="label mt-5 text-muted-foreground">a.k.a. {p.alias}</p>}

        <div className="grid-12 mt-10 md:mt-16 gap-y-10 border-t border-border pt-8">
          <p className="col-span-12 lg:col-span-6 display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.12] tracking-[-0.01em] text-pretty">
            {p.description}
          </p>
          <div className="col-span-12 md:col-span-8 lg:col-span-5 lg:col-start-8">
            <p className="label mb-4 text-muted-foreground">Built with</p>
            <ol className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2">
              {p.tech.map((t, i) => (
                <li key={t} className="meta flex gap-3">
                  <span className="text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </li>
              ))}
            </ol>
            <SourceLink href={p.github} className="mt-10 text-accent" />
          </div>
        </div>
      </div>
    </Reveal>
  );
};

/** 02, 03 — paired plates with a spec column and an oversized initial. */
const Plate = ({ p, i, tall }: { p: Project; i: number; tall?: boolean }) => (
  <Reveal as="article" delay={tall ? 0.12 : 0} className="group">
    <a
      href={p.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${p.title} — view source on GitHub`}
      className={cn(
        "relative block overflow-hidden bg-card transition-colors duration-700",
        tall ? "aspect-square md:aspect-[4/5]" : "aspect-[5/4] md:aspect-[16/11]"
      )}
    >
      <div className="absolute inset-x-5 top-5 flex justify-between label text-muted-foreground">
        <span>{repo(p.github)}</span>
        <span className="text-accent">{num(i)}</span>
      </div>
      <ul className="absolute bottom-5 left-5 space-y-0.5">
        {p.tech.map((t) => (
          <li key={t} className="meta text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
            {t}
          </li>
        ))}
      </ul>
      <span
        aria-hidden="true"
        className="display absolute -bottom-[0.2em] right-[-0.04em] select-none text-[clamp(14rem,30vw,26rem)] leading-none text-foreground transition-[transform,color] duration-1000 ease-expo group-hover:-translate-y-[0.06em] group-hover:text-accent"
      >
        <span className="inline-block transition-transform duration-1000 ease-expo group-hover:skew-x-[-10deg]">
          {p.title.charAt(0)}
        </span>
      </span>
    </a>
    <div className="mt-5 flex items-baseline justify-between gap-4">
      <h3 className="display text-[clamp(2.5rem,4.5vw,4rem)] leading-none">{p.title}</h3>
      <span className="label text-muted-foreground">{p.tech.length} tools</span>
    </div>
    <p className="mt-4 max-w-[30rem] text-[1rem] leading-relaxed text-muted-foreground">{p.description}</p>
    <SourceLink href={p.github} className="mt-5" />
  </Reveal>
);

/** 04 – 07 — a typeset index; the whole row is the link. */
const IndexRow = ({ p, i }: { p: Project; i: number }) => (
  <Reveal as="li" delay={(i % 4) * 0.05} className="group relative border-b border-border">
    <div className="grid-12 gap-y-3 py-7 md:py-9 transition-colors duration-500">
      <span className="label col-span-2 md:col-span-1 pt-2 text-accent">{num(i)}</span>
      <h3 className="col-span-10 md:col-span-11 lg:col-span-4 display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.95]">
        <a
          href={p.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block transition-transform duration-500 ease-expo group-hover:translate-x-2 group-hover:italic after:absolute after:inset-0 after:content-['']"
        >
          {p.title}
        </a>
      </h3>
      <p className="col-span-12 md:col-start-2 md:col-span-7 lg:col-start-6 lg:col-span-4 text-[0.975rem] leading-relaxed text-muted-foreground lg:pt-2">
        {p.description}
      </p>
      <p className="meta col-span-10 md:col-span-3 lg:col-span-2 text-muted-foreground lg:pt-2">
        {p.tech.map((t, k) => (
          <Fragment key={t}>
            <span className="whitespace-nowrap">
              {t}
              {k < p.tech.length - 1 && <span className="pl-1.5 text-foreground/30">/</span>}
            </span>{" "}
          </Fragment>
        ))}
      </p>
      <span className="col-span-2 md:col-span-1 flex justify-end lg:pt-2">
        <span className="flex h-10 w-10 items-center justify-center border border-foreground transition-colors duration-300 group-hover:bg-foreground group-hover:text-background">
          <Arrow className="transition-transform duration-500 group-hover:rotate-45" />
        </span>
      </span>
    </div>
  </Reveal>
);

const ProjectsSection = () => {
  const [lead, second, third, ...rest] = projects;
  return (
    <section id="projects" className="section">
      <div className="frame">
        <SectionHead
          index="03"
          kicker="My work"
          title={<>Featured <em>Projects</em></>}
          aside={`${TOTAL} entries — source on GitHub`}
        />

        <Spread p={lead} />

        <div className="grid-12 gap-y-20 mt-20 md:mt-28">
          <div className="col-span-12 md:col-span-7">
            <Plate p={second} i={1} />
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 md:mt-40">
            <Plate p={third} i={2} tall />
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <div className="grid-12 label border-b border-foreground pb-3 text-muted-foreground">
            <span className="col-span-6 md:col-span-5">More work</span>
            <span className="hidden lg:block lg:col-start-6 lg:col-span-4">Description</span>
            <span className="hidden md:block md:col-start-9 lg:col-start-10 md:col-span-3 lg:col-span-2">Stack</span>
            <span className="col-span-6 md:col-span-1 text-right">{num(3)}—{TOTAL}</span>
          </div>
          <ul>
            {rest.map((p, k) => (
              <IndexRow key={p.title} p={p} i={k + 3} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
