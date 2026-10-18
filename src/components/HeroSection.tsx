import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SignalTrace from "@/components/SignalTrace";
import { Arrow, EASE } from "@/components/editorial";
import { RESUME_URL, socials } from "@/data/profile";
import { cn } from "@/lib/utils";

const roles = ["MERN Stack Developer", "Problem Solver", "ECE Engineer", "Full Stack Builder"];

/** One line of the name, rising out of its own baseline mask. */
const MaskLine = ({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) => (
  <span className={cn("block overflow-hidden pb-[0.06em] -mb-[0.06em]", className)}>
    <motion.span
      className="block"
      initial={{ y: "105%" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1.05, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const HeroSection = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => setCurrentRole((r) => (r + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-14"
    >
      <div className="frame flex flex-1 flex-col">
        {/* Masthead row */}
        <motion.div {...fade(0.1)} className="grid-12 border-b border-border py-3 mt-4 md:mt-6">
          <p className="label col-span-12 sm:col-span-6 md:col-span-5">
            <span className="text-accent">(Portfolio)</span>&ensp;Welcome to my portfolio
          </p>
          <p className="label hidden lg:block lg:col-span-4 text-muted-foreground">
            B.Tech ECE — Birla Institute of Technology
          </p>
          <p className="label hidden sm:block sm:col-span-6 lg:col-span-3 text-right text-muted-foreground">
            Vol. {new Date().getFullYear()}
          </p>
        </motion.div>

        {/* Name + roles */}
        <div className="grid-12 flex-1 content-center gap-y-8 py-10 md:py-8">
          <div className="relative col-span-12">
            <h1 className="display text-[clamp(5.25rem,23vw,17.5rem)] lg:text-[clamp(5.25rem,19.5vw,17.5rem)] leading-[0.84]">
              <span className="sr-only">Hi, I'm Anshuman Prakash</span>
              <span aria-hidden="true" className="block">
                <MaskLine delay={0.15}>Anshuman</MaskLine>
                <MaskLine delay={0.27} className="italic pl-[0.35em] md:pl-[0.6em] lg:pl-0 lg:text-right pr-[0.04em]">
                  Prakash<span className="text-accent not-italic">.</span>
                </MaskLine>
              </span>
            </h1>

            {/* Role index sits in the open space right of the first name,
                sized in the name's em so it tracks the first line's baseline */}
            <motion.ul
              {...fade(0.75)}
              aria-label="Roles"
              className="absolute right-0 top-0 hidden lg:flex h-[0.84em] flex-col justify-end gap-1.5 pb-[0.1em] text-[clamp(5.25rem,19.5vw,17.5rem)]"
            >
                {roles.map((role, i) => (
                  <li
                    key={role}
                    className={cn(
                      "meta flex items-center gap-3 tracking-normal transition-colors duration-500",
                      i === currentRole ? "text-foreground" : "text-muted-foreground/60"
                    )}
                  >
                    <span
                      className={cn(
                        "h-px bg-accent transition-all duration-700 ease-expo",
                        i === currentRole ? "w-8" : "w-0"
                      )}
                    />
                    {role}
                  </li>
                ))}
            </motion.ul>
          </div>

          {/* Mobile / tablet role ticker */}
          <motion.p {...fade(0.6)} className="meta col-span-12 lg:hidden flex items-center gap-3" aria-live="polite">
            <span className="h-px w-8 bg-accent" />
            <motion.span
              key={currentRole}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {roles[currentRole]}
            </motion.span>
          </motion.p>

          <motion.p
            {...fade(0.55)}
            className="col-span-12 sm:col-span-9 md:col-span-7 text-[1.0625rem] md:text-lg leading-relaxed text-muted-foreground text-pretty lg:hidden"
          >
            Building scalable web applications with the MERN stack. Passionate about clean code, problem solving,
            and bridging the gap between hardware and software.
          </motion.p>
        </div>

        {/* Signal line */}
        <motion.div
          initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
          animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
          className="relative"
        >
          <div className="label absolute left-0 -top-1 flex gap-4 text-muted-foreground">
            <span className="text-accent">CH1</span>
            <span className="hidden sm:inline">Hardware</span>
          </div>
          <div className="label absolute right-0 -top-1 text-muted-foreground hidden sm:block">Software</div>
          <SignalTrace hostRef={heroRef} />
        </motion.div>

        {/* Footer row: intro, actions, profiles */}
        <motion.div {...fade(0.8)} className="grid-12 gap-y-8 border-t border-foreground pt-5 pb-8 md:pb-10">
          <p className="hidden lg:block lg:col-span-4 text-[1.0625rem] leading-relaxed text-muted-foreground text-pretty">
            Building scalable web applications with the MERN stack. Passionate about clean code, problem solving,
            and bridging the gap between hardware and software.
          </p>

          <ul className="col-span-12 md:col-span-7 lg:col-span-5 lg:col-start-5 flex flex-col sm:flex-row sm:flex-wrap gap-x-8 gap-y-0 sm:gap-y-3">
            {[
              { label: "View Projects", href: "#projects", dir: "down" as const, primary: true },
              { label: "Contact Me", href: "#contact", dir: "ne" as const },
              { label: "Download Resume", href: RESUME_URL, dir: "down" as const, external: true },
            ].map((a) => (
              <li key={a.label} className="border-b border-border sm:border-0">
                <a
                  href={a.href}
                  {...(a.external ? { target: "_blank", rel: "noopener noreferrer", download: true } : {})}
                  className={cn(
                    "group flex items-center justify-between gap-2 py-3 sm:py-0 text-[0.95rem] font-medium",
                    a.primary && "text-accent"
                  )}
                >
                  <span className="u-link">{a.label}</span>
                  <Arrow direction={a.dir} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>

          <ul className="col-span-12 md:col-span-5 lg:col-span-3 flex md:justify-end gap-6">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="label u-link text-muted-foreground hover:text-foreground">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
