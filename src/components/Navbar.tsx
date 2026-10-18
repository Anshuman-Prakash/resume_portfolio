import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { Arrow, EASE } from "@/components/editorial";
import { RESUME_URL, sections } from "@/data/profile";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n + 1).padStart(2, "0");

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section sits under the upper third of the viewport.
  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const onTop = () => window.scrollY < 200 && setActive("");
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
          scrolled || open ? "bg-background/90 backdrop-blur-sm border-b border-border" : "border-b border-transparent"
        )}
      >
        <div className="frame flex h-14 items-center justify-between gap-6">
          <a href="#" className="display text-[1.375rem] leading-none tracking-tight" onClick={() => setOpen(false)}>
            Anshuman Prakash<span className="text-accent">.</span>
          </a>

          <ul className="hidden xl:flex items-center gap-7">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "label group flex items-baseline gap-1.5 transition-colors",
                    active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                  aria-current={active === s.id ? "true" : undefined}
                >
                  <span className={cn("transition-colors", active === s.id ? "text-accent" : "text-muted-foreground/70")}>
                    {pad(i)}
                  </span>
                  <span className="u-link">{s.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5 md:gap-7">
            <ThemeToggle className="hidden sm:inline-flex" />
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="label hidden sm:inline-flex items-center gap-1.5 border border-foreground px-3 py-2 transition-colors hover:bg-foreground hover:text-background"
            >
              Resume <Arrow direction="down" />
            </a>
            <button
              className="label xl:hidden inline-flex items-center gap-2"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-index"
            >
              <span className="relative block h-2.5 w-5" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 right-0 h-px bg-foreground transition-transform duration-500",
                    open ? "top-1/2 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 right-0 h-px bg-foreground transition-transform duration-500",
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  )}
                />
              </span>
              {open ? "Close" : "Index"}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-index"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-background pt-14 xl:hidden"
          >
            <nav aria-label="Sections" className="frame flex-1 overflow-y-auto py-6">
              <ul>
                {sections.map((s, i) => (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.04, duration: 0.5, ease: EASE }}
                    className="border-b border-border"
                  >
                    <a
                      href={`#${s.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-3.5"
                    >
                      <span className="label w-6 text-accent">{pad(i)}</span>
                      <span className="display text-[2.6rem] sm:text-6xl leading-none">{s.label}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="frame flex items-center justify-between border-t border-foreground py-5">
              <ThemeToggle />
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="label inline-flex items-center gap-1.5 border border-foreground px-3 py-2"
              >
                Resume <Arrow direction="down" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
