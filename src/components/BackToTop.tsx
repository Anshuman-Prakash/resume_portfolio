import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Arrow } from "@/components/editorial";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.3 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center bg-accent text-accent-foreground transition-transform hover:-translate-y-0.5 md:bottom-8 md:right-8"
        >
          <Arrow direction="up" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
