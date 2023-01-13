import { AnimatePresence, motion } from "framer-motion";
import * as React from "react";

const variants = {
  enter: (direction: number) => {
    return {
      y: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      y: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

export const VerticalAnimation = ({
  children,
  activeIndex,
  direction,
}: {
  children: React.ReactNode;
  /**When the active index changes, the animation will play */
  activeIndex: number;
  /**The direction of the animation. 1 is down, -1 is up */
  direction: number;
}) => {
  return (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={activeIndex}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
