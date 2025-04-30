"use client"
import { motion } from 'motion/react'
import React, { useState } from 'react'
import { Button } from '../ui/button'

export default function ToggleElement() {
    const [toggle, setToggle] = useState<boolean>(false)
    return (
        <div className='flex relative flex-col items-center justify-between gap-3 w-full h-full flex-grow'>
            <motion.div layout>
                <Button variant="outline" className='w-fit' onClick={() => setToggle(!toggle)}>Toggle</Button>
            </motion.div>
            {
                toggle ? (
                    <motion.div
                        className='bg-accent'
                        layoutId="rectangle"
                        style={{
                            width: "80px", height: "80px", borderRadius: "4px"
                        }}
                    >
                    </motion.div>
                ) : (
                    <motion.div
                        className='bg-accent'
                        layoutId="rectangle"
                        style={{
                            width: "40px", height: "40px", borderRadius: "4px"
                        }}
                    >
                    </motion.div>
                )
            }
        </div>
    )
}
