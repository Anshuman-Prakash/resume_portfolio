import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="relative w-16 h-8 rounded-full p-1 transition-colors duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      style={{
        background: isDark
          ? "linear-gradient(135deg, hsl(230 25% 15%), hsl(240 20% 25%))"
          : "linear-gradient(135deg, hsl(200 80% 70%), hsl(40 90% 65%))",
      }}
      aria-label="Toggle theme"
    >
      {/* Stars (dark mode) */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-full"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {[
          { top: "20%", left: "55%", size: 2 },
          { top: "45%", left: "65%", size: 1.5 },
          { top: "30%", left: "75%", size: 1 },
          { top: "60%", left: "58%", size: 1.5 },
          { top: "15%", left: "70%", size: 1 },
        ].map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>

      {/* Clouds (light mode) */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-full"
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {[
          { top: "55%", right: "12%", w: 14, h: 6 },
          { top: "35%", right: "22%", w: 10, h: 4 },
        ].map((cloud, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              top: cloud.top,
              right: cloud.right,
              width: cloud.w,
              height: cloud.h,
              background: "rgba(255,255,255,0.7)",
            }}
            animate={{ x: [0, 3, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity }}
          />
        ))}
      </motion.div>

      {/* Sun/Moon orb */}
      <motion.div
        className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center"
        layout
        animate={{
          x: isDark ? 0 : 32,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          background: isDark
            ? "linear-gradient(135deg, hsl(45 10% 85%), hsl(45 10% 95%))"
            : "linear-gradient(135deg, hsl(40 100% 60%), hsl(35 100% 55%))",
          boxShadow: isDark
            ? "inset -3px -1px 0px 0px hsl(230 15% 60%), 0 0 8px hsl(45 10% 85% / 0.3)"
            : "0 0 12px hsl(40 100% 60% / 0.6), 0 0 24px hsl(40 100% 60% / 0.3)",
        }}
      >
        {/* Moon craters */}
        <motion.div
          animate={{ opacity: isDark ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <div className="absolute w-1.5 h-1.5 rounded-full top-1.5 left-1" style={{ background: "hsl(230 15% 70%)" }} />
          <div className="absolute w-1 h-1 rounded-full top-3 left-3" style={{ background: "hsl(230 15% 70%)" }} />
        </motion.div>

        {/* Sun rays */}
        <motion.div
          animate={{ opacity: isDark ? 0 : 1, rotate: isDark ? 0 : 360 }}
          transition={{ opacity: { duration: 0.3 }, rotate: { duration: 20, repeat: Infinity, ease: "linear" } }}
          className="absolute inset-[-4px]"
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 w-[2px] h-[5px] rounded-full"
              style={{
                background: "hsl(40 100% 60%)",
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-14px)`,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
