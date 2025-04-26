"use client";

import { useState, useEffect, useRef } from "react";
import { useMotionValue, useTransform, animate } from "framer-motion";

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
}

export default function AnimatedCounter({ from, to, duration = 2, delay = 0 }: CounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(from);
  const countRef = useRef(from);

  useEffect(() => {
    const animation = animate(count, to, { duration, delay });
    
    const unsubscribe = rounded.onChange((latest) => {
      countRef.current = latest;
      setDisplayValue(latest);
    });
    
    return () => {
      unsubscribe();
      animation.stop();
    };
  }, [count, rounded, to, duration, delay]);

  return <span>{displayValue}</span>;
}