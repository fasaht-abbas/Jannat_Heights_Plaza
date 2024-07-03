import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useAnimation } from "framer-motion";

interface revealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const SlideInFromRight: React.FC<revealProps> = ({
  children,
  className,
  delay,
  duration,
  ...rest
}) => {
  const revealRef = useRef(null);
  const animation = useAnimation();
  const isInView = useInView(revealRef, { once: true });
  useEffect(() => {
    if (isInView) {
      animation.start("reveal");
    }
  }, [isInView]);

  return (
    <div ref={revealRef} className={`relative ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 75 },
          reveal: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={animation}
        transition={{
          duration: duration ? duration : 0.5,
          delay: delay ? delay : 0.25,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SlideInFromRight;