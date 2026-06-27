"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
  distance?: number;
}

export default function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.8,
  className = "",
  distance = 40
}: ScrollRevealProps) {
  
  const getInitialValues = () => {
    switch (direction) {
      case 'up': return { y: distance, opacity: 0 };
      case 'down': return { y: -distance, opacity: 0 };
      case 'left': return { x: distance, opacity: 0 };
      case 'right': return { x: -distance, opacity: 0 };
      default: return { y: distance, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialValues()}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // custom premium ease curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
