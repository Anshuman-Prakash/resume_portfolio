import { useEffect, useRef } from "react";

const W = 1000;
const H = 120;
const MID = H / 2;
const POINTS = 240;

/**
 * An oscilloscope trace across the hero. It lies almost flat until the
 * pointer moves over the hero, then rings around the pointer's x position.
 * Without a fine pointer it sweeps on its own; with reduced motion it is
 * drawn once and left still.
 */
const SignalTrace = ({ hostRef }: { hostRef: React.RefObject<HTMLElement> }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const svg = svgRef.current;
    const host = hostRef.current;
    if (!path || !svg || !host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let targetX = W * 0.68;
    let x = targetX;
    let targetAmp = 0;
    let amp = 0;
    let phase = 0;
    let raf = 0;
    let visible = true;
    let pointerInside = false;
    let last = performance.now();

    const draw = () => {
      let d = "";
      for (let i = 0; i <= POINTS; i++) {
        const px = (i / POINTS) * W;
        const dist = (px - x) / 90;
        const envelope = Math.exp(-dist * dist);
        const carrier = Math.sin(px * 0.11 - phase) + 0.35 * Math.sin(px * 0.031 + phase * 0.6);
        const idle = 1.6 * Math.sin(px * 0.02 + phase * 0.4);
        const y = MID - (amp * envelope * carrier + idle);
        d += `${i === 0 ? "M" : "L"}${px.toFixed(1)} ${y.toFixed(2)}`;
      }
      path.setAttribute("d", d);
    };

    if (reduced) {
      amp = 26;
      draw();
      return;
    }

    const tick = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000;
      last = now;
      if (!pointerInside) {
        // Self-sweep: a slow pass left to right when nobody is steering.
        targetX = W * (0.5 + 0.42 * Math.sin(now / 3200));
        targetAmp = finePointer ? 10 : 24;
      }
      x += (targetX - x) * Math.min(1, dt * 7);
      amp += (targetAmp - amp) * Math.min(1, dt * 4);
      phase += dt * 6.5;
      draw();
      if (visible) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      const r = svg.getBoundingClientRect();
      targetX = ((e.clientX - r.left) / r.width) * W;
      const vertical = Math.abs(e.clientY - (r.top + r.height / 2));
      // Stronger the closer the pointer is to the line itself.
      targetAmp = 14 + 34 * Math.max(0, 1 - vertical / 380);
      pointerInside = true;
    };
    const onLeave = () => {
      pointerInside = false;
    };

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(svg);

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [hostRef]);

  return (
    <div className="relative" aria-hidden="true">
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block h-20 w-full md:h-28">
        {/* Graticule: centre line and division ticks */}
        <line x1="0" x2={W} y1={MID} y2={MID} className="stroke-border" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="2 6" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={i}
            x1={(i * W) / 10}
            x2={(i * W) / 10}
            y1={MID - 6}
            y2={MID + 6}
            className="stroke-muted-foreground/50"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path
          ref={pathRef}
          d={`M0 ${MID}L${W} ${MID}`}
          fill="none"
          className="stroke-accent"
          strokeWidth="1.5"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
};

export default SignalTrace;
