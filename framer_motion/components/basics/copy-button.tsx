"use client"
import { Check, Copy } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { Button } from "../ui/button"
export default function CopyButton() {
    const [copied, setCopied] = useState<boolean>(false)
    const variants = {
        hidden: { opacity: 0, scale: 0.6 },
        visible: { opacity: 1, scale: 1 }
    }

    return (
        <Button className="w-fit p-1 px-2 cursor-pointer" variant="outline" aria-label="Copy code snippet" onClick={() => setCopied(true)}>
            <AnimatePresence mode="wait">
                {
                    copied ? (
                        <motion.span key="checkmark" variants={variants} initial="hidden" animate="visible" exit="hidden"><Check className="w-4 h-4 " /></motion.span>
                    ) : (<motion.span key="copy" variants={variants} initial="hidden" animate="visible" exit="hidden"><Copy className="w-4 h-4 " /></motion.span>
                    )
                }

            </AnimatePresence>
        </Button>
    )
}
