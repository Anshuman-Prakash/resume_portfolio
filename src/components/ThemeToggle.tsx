import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

/** Paper / Carbon switch: a half-filled disc that turns over. */
const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={cn("label group inline-flex items-center gap-2 text-foreground", className)}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <span
        aria-hidden="true"
        className="relative h-3.5 w-3.5 overflow-hidden rounded-full border border-foreground transition-transform duration-700 ease-expo"
        style={{ transform: isDark ? "rotate(180deg)" : undefined }}
      >
        <span className="absolute inset-y-0 left-0 w-1/2 bg-foreground" />
      </span>
      <span className="w-[3.25rem] text-left">{isDark ? "Carbon" : "Paper"}</span>
    </button>
  );
};

export default ThemeToggle;
