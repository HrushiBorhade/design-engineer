"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { Ring } from "./ring";
import { Timer } from "./timer";

enum VIEWS {
  RING = "ring",
  IDLE = "idle",
  TIMER = "timer"
}

enum VARIANTS {
  IDLE = "idle",
  RING_IDLE = "ring-idle",
  TIMER_RING = "timer-ring",
  RING_TIMER = "ring-timer",
  TIMER_IDLE = "timer-idle",
  IDLE_TIMER = "idle-timer",
  IDLE_RING = "idle-ring",
}

type AnimationVariant = {
  scale?: number;
  scaleX?: number;
  y?: number;
  bounce?: number;
};

type AnimationVariants = {
  [K in Extract<VARIANTS, 'RING_IDLE' | 'TIMER_RING' | 'RING_TIMER' | 'TIMER_IDLE'>]: AnimationVariant;
};

type TransitionProps = {
  opacity?: number[];
  filter?: string;
  [key: string]: any;
};

const variants: Variants = {
  exit: (custom: TransitionProps) => ({
    ...custom,
    opacity: [1, 0],
    filter: "blur(5px)",
  }),
};

const ANIMATION_VARIANTS: AnimationVariants = {
  [VARIANTS.RING_IDLE]: {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },
  [VARIANTS.TIMER_RING]: {
    scale: 0.7,
    y: -7.5,
    bounce: 0.35,
  },
  [VARIANTS.RING_TIMER]: {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
  [VARIANTS.TIMER_IDLE]: {
    scale: 0.7,
    y: -7.5,
    bounce: 0.3,
  },
};

const BOUNCE_VARIANTS: Record<VARIANTS, number> = {
  [VARIANTS.IDLE]: 0.5,
  [VARIANTS.RING_IDLE]: 0.5,
  [VARIANTS.TIMER_RING]: 0.35,
  [VARIANTS.RING_TIMER]: 0.35,
  [VARIANTS.TIMER_IDLE]: 0.3,
  [VARIANTS.IDLE_TIMER]: 0.3,
  [VARIANTS.IDLE_RING]: 0.5,
};

export default function DynamicIsland() {
  const [view, setView] = useState<VIEWS>(VIEWS.IDLE);
  const [variantKey, setVariantKey] = useState<VARIANTS>(VARIANTS.IDLE);

  const content = useMemo(() => {
    switch (view) {
      case VIEWS.RING:
        return <Ring />;
      case VIEWS.TIMER:
        return <Timer />;
      case VIEWS.IDLE:
        return <div className="h-7" />;
    }
  }, [view]);

  const handleViewChange = (newView: VIEWS) => {
    setView(newView);
    const variantKey = `${view}-${newView}` as VARIANTS;
    setVariantKey(variantKey);
  };

  return (
    <div className="h-[200px]">
      <div className="relative flex h-full w-full flex-col justify-between">
        <motion.div
          layout
          transition={{
            type: "spring",
            bounce: BOUNCE_VARIANTS[variantKey],
          }}
          style={{ borderRadius: 32 }}
          className="mx-auto w-fit min-w-[100px] overflow-hidden rounded-full bg-black"
        >
          <motion.div
            transition={{
              type: "spring",
              bounce: BOUNCE_VARIANTS[variantKey],
            }}
            initial={{
              scale: 0.9,
              opacity: 0,
              filter: "blur(5px)",
              originX: 0.5,
              originY: 0.5,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              originX: 0.5,
              originY: 0.5,
              transition: {
                delay: 0.05,
              },
            }}
            key={view}
          >
            {content}
          </motion.div>
        </motion.div>

        <div className="pointer-events-none absolute left-1/2 top-0 flex h-[200px] w-[300px] -translate-x-1/2 items-start justify-center">
          <AnimatePresence
            mode="popLayout"
            custom={ANIMATION_VARIANTS[variantKey as keyof typeof ANIMATION_VARIANTS]}
          >
            <motion.div
              initial={{ opacity: 0 }}
              exit="exit"
              variants={variants}
              key={view}
            >
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex w-full justify-center gap-4">
          {Object.values(VIEWS).map((v) => (
            <button
              type="button"
              className="rounded-full capitalize w-32 h-10 bg-white px-2.5 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300/50 hover:bg-gray-50"
              onClick={() => handleViewChange(v)}
              key={v}
            >
              {v.toLowerCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}



