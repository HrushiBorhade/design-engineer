"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { motion } from "motion/react"

export default function ResizeContent() {
    const [showContent, setShowContent] = useState<boolean>(false)
    return (
        <div className='flex flex-col gap-4'>
            <Button className='w-fit' variant="outline" onClick={() => setShowContent(!showContent)}>Toggle</Button>
            <AnimateHeight>
                <div className='p-2 w-1/2 flex flex-col gap-2 border rounded-lg'>
                    <h1>Fake Family Drawer</h1>
                    <p>
                        This is a fake family drawer. Animating height is tricky, but
                        satisfying when it works.
                    </p>
                    {showContent ? (
                        <p>This extra content will change the height of the drawer.</p>
                    ) : null}
                </div>
            </AnimateHeight>
        </div>
    )
}

export const AnimateHeight = ({ children }: { children: React.ReactNode }) => {
    const [height, setHeight] = useState<number | "auto">("auto");
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const rect = entry.target.getBoundingClientRect();
                setHeight(rect.height);
            }
        });

        if (elementRef.current) {
            observer.observe(elementRef.current);
            // Set initial height
            setHeight(elementRef.current.getBoundingClientRect().height);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            initial={{ height }}
            animate={{ height }}
            exit={{ height }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
        >
            <div ref={elementRef}>
                {children}
            </div>
        </motion.div>
    );
}