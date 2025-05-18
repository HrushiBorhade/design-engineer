"use client"
import type { Variants } from "motion/react";
import { motion } from "motion/react";

const wandVariants: Variants = {
    normal: {
        opacity: 1,
    },
    animate: {
        opacity: 1,
    },
};

const sparkleVariants1: Variants = {
    normal: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut",
        },
    },
    animate: (i: number) => ({
        opacity: [1, 0.5, 1],
        scale: [1, 1.05, 1],
        y: [0, -1, 0],
        transition: {
            duration: 1.2,
            delay: i * 0.1,
            ease: "easeInOut",
            repeat: Infinity,  // This makes the animation repeat infinitely
            repeatType: "loop" // This ensures it loops smoothly
        },
    }),
};

interface WandProps extends React.SVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    strokeWidth?: number;
    stroke?: string;
}

const AnimatedWand = ({
    width = 28,
    height = 28,
    strokeWidth = 2,
    stroke = "#ffffff",
    ...props
}: WandProps) => {

    return (
        <div
            style={{
                cursor: "pointer",
                userSelect: "none",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                {/* Main wand */}
                <motion.path
                    d="m3 21 9-9"
                    variants={wandVariants}
                    animate="animate"
                    initial="normal"
                />
                {/* Floating sparkles */}
                <motion.path
                    d="M15 4V2"
                    variants={sparkleVariants1}
                    animate="animate"
                    initial="normal"
                    custom={0}
                />
                <motion.path
                    d="M15 16v-2"
                    variants={sparkleVariants1}
                    animate="animate"
                    initial="normal"
                    custom={1}
                />
                <motion.path
                    d="M8 9h2"
                    variants={sparkleVariants1}
                    animate="animate"
                    initial="normal"
                    custom={2}
                />
                <motion.path
                    d="M20 9h2"
                    variants={sparkleVariants1}
                    animate="animate"
                    initial="normal"
                    custom={3}
                />
                <motion.path
                    d="M17.8 11.8 19 13"
                    variants={sparkleVariants1}
                    animate="animate"
                    initial="normal"
                    custom={4}
                />
                <motion.path
                    d="M15 9h.01"
                    variants={sparkleVariants1}
                    animate="animate"
                    initial="normal"
                    custom={5}
                />
                <motion.path
                    d="M17.8 6.2 19 5"
                    variants={sparkleVariants1}
                    animate="animate"
                    initial="normal"
                    custom={6}
                />
                <motion.path
                    d="M12.2 6.2 11 5"
                    variants={sparkleVariants1}
                    animate="animate"
                    initial="normal"
                    custom={7}
                />
            </svg>
        </div>
    );
};


const sparkleVariants: Variants = {
    normal: {
        opacity: 1,
    },
    animate: (i: number) => ({
        opacity: [1, 0.3, 1],
        transition: {
            duration: 0.8,
            repeat: Infinity,
            repeatDelay: 0.2,
            delay: i * 0.1,
            ease: "easeInOut",
        },
    }),
};

interface WandSparklesProps extends React.SVGAttributes<SVGSVGElement> {
    width?: number;
    height?: number;
    strokeWidth?: number;
    stroke?: string;
}

const WandSparkles = ({
    width = 28,
    height = 28,
    strokeWidth = 2,
    stroke = "#ffffff",
    ...props
}: WandSparklesProps) => {


    return (
        <div
            style={{
                cursor: "pointer",
                userSelect: "none",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...props}
            >
                <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72" />
                <motion.path
                    d="m14 7 3 3"
                    variants={sparkleVariants}
                    animate="animate"
                    custom={0}
                />
                <motion.path
                    d="M5 6v4"
                    variants={sparkleVariants}
                    animate="animate"
                    custom={1}
                />
                <motion.path
                    d="M19 14v4"
                    variants={sparkleVariants}
                    animate="animate"
                    custom={2}
                />
                <motion.path
                    d="M10 2v2"
                    variants={sparkleVariants}
                    animate="animate"
                    custom={3}
                />
                <motion.path
                    d="M7 8H3"
                    variants={sparkleVariants}
                    animate="animate"
                    custom={4}
                />
                <motion.path
                    d="M21 16h-4"
                    variants={sparkleVariants}
                    animate="animate"
                    custom={5}
                />
                <motion.path
                    d="M11 3H9"
                    variants={sparkleVariants}
                    animate="animate"
                    custom={6}
                />
            </svg>
        </div>
    );
};


export { AnimatedWand, WandSparkles };
