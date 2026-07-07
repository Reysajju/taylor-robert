"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offset = 28;

const buildVariants = (direction: Direction): Variants => {
  const hidden: Record<string, number | string> = {
    opacity: 0,
    filter: "blur(6px)",
  };
  switch (direction) {
    case "up":
      hidden.y = offset;
      break;
    case "down":
      hidden.y = -offset;
      break;
    case "left":
      hidden.x = offset;
      break;
    case "right":
      hidden.x = -offset;
      break;
    case "none":
    default:
      break;
  }
  return {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "blockquote";
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration,
  once = true,
  className,
  as = "div",
}: RevealProps) {
  const variants = buildVariants(direction);
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -80px 0px" }}
      transition={
        delay || duration
          ? {
              duration: duration ?? 0.7,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
          : undefined
      }
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger container — children should be <StaggerItem> elements.
 */
interface StaggerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "div" | "ul" | "section";
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.14,
  once = true,
  as = "div",
}: StaggerProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "0px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Child element for use inside <Stagger> */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  as?: "div" | "li" | "span" | "blockquote";
}

export function StaggerItem({
  children,
  className,
  direction = "up",
  as = "div",
}: StaggerItemProps) {
  const variants = buildVariants(direction);
  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
