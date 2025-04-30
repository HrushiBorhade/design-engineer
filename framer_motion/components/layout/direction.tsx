"use client"
import { motion } from 'motion/react'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function ToggleDirection() {
    const [isVertical, setIsVertical] = useState<boolean>(false)
    const [activeElement, setActiveElement] = useState<string>("")

    const Elements = ["Item 1", "Item 2", "Item 3", "Item 4"
    ]
    return (
        <div className='flex relative flex-col items-center gap-3 w-full h-full flex-grow'>
            <Button variant="outline" className='w-fit' onClick={() => setIsVertical(!isVertical)}>Toggle</Button>
            <motion.div
                className='cursor-pointer flex gap-3 p-3 overflow-hidden'
                layout
                transition={{ duration: 0.5 }}
                style={
                    isVertical
                        ? { flexDirection: "column" }
                        : { flexDirection: "row" }
                }
            >
                {Elements.map((_element) => (
                    <motion.div
                        layout
                        className={cn(
                            "relative cursor-pointer px-2 py-1 text-sm outline-none transition-colors",
                            activeElement === _element ? "text-gray-800" : "text-gray-700",
                        )}
                        tabIndex={0}
                        key={_element}
                        onFocus={() => setActiveElement(_element)}
                        onMouseOver={() => setActiveElement(_element)}
                        onMouseLeave={() => setActiveElement(_element)}
                    >
                        {activeElement === _element ? (
                            <motion.div
                                layoutId="tab-indicator"
                                className="absolute inset-0 rounded-lg bg-black/5"
                            />
                        ) : null}
                        <span className="relative text-inherit">{_element}</span>
                    </motion.div>
                ))}


            </motion.div>
        </div>
    )
}
