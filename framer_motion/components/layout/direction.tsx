"use client"
import { motion } from 'motion/react'
import React, { useState } from 'react'
import { Button } from '../ui/button'

export default function ToggleDirection() {
    const [isVertical, setIsVertical] = useState<boolean>(false)
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
                <motion.p key="item-1" layout>Item 1</motion.p>
                <motion.p key="item-2" layout >Item 2</motion.p>
                <motion.p key="item-3" layout>Item 3</motion.p>
                <motion.p key="item-4" layout>Item 4</motion.p>

            </motion.div>
        </div>
    )
}
