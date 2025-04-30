"use client"
import { motion } from 'motion/react'
import React, { useState } from 'react'

export default function FillLayout() {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <div className='flex relative items-center justify-center w-full h-full flex-grow'>
            <motion.div
                className='bg-accent cursor-pointer'
                onClick={() => setOpen(!open)}
                layout
                style={
                    open
                        ? { position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: "4px" }
                        : { height: 48, width: 48, borderRadius: "4px" }
                }
            >
            </motion.div>
        </div>
    )
}
