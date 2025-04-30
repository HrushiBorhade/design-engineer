"use client"

import { Loader } from "lucide-react";
import { useState } from "react"
import { Button } from "../ui/button";
import { AnimatePresence, motion } from "motion/react";


enum ButtonState {
    IDLE = "idle",
    LOADING = "loading",
    SUCCESS = "success"
}

const ButtonCopy: Record<ButtonState, React.JSX.Element | string> = {
    [ButtonState.IDLE]: "Join Waitlist",
    [ButtonState.LOADING]: <Loader className="animate-spin w-4 h-4" />,
    [ButtonState.SUCCESS]: "Joined Waitlist 🎉"
}
export default function SmoothButton() {
    const [buttonState, setButtonState] = useState<ButtonState>(ButtonState.IDLE);
    const variants = {
        initial: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -25 },
    };

    return (
        <Button variant="outline" className="w-36 overflow-hidden disabled:opacity-100 cursor-pointer" disabled={buttonState !== ButtonState.IDLE}
            onClick={() => {
                setButtonState(ButtonState.LOADING)
                setTimeout(() => {
                    setButtonState(ButtonState.SUCCESS);
                }, 1750);

                setTimeout(() => {
                    setButtonState(ButtonState.IDLE);
                }, 3500);

            }}
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                    key={buttonState}
                    className="overflow-hidden"
                    initial="initial"
                    animate="visible"
                    exit="exit"
                    variants={variants}
                    transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                >
                    {ButtonCopy[buttonState]}
                </motion.div>
            </AnimatePresence>
        </Button>
    )
}
