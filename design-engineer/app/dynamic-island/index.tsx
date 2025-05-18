"use client"
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Ring } from "./ring";
import { motion } from "motion/react"
import { Timer } from "./timer";

enum views_enum {
  IDLE = "idle",
  RING = "ring",
  TIMER = "timer"
}
export default function DynamicIsland() {
  const [view, setView] = useState(views_enum.IDLE)
  const content = useMemo(() => {
    switch (view) {
      case views_enum.IDLE:
        return <Idle />
      case views_enum.RING:
        return <Ring />
      case views_enum.TIMER:
        return <Timer />
    }
  }, [view])

  return (
    <div className="flex flex-col items-center gap-12 w-full border border-dashed rounded-lg p-4">
      <h1 className="text-3xl font-semibold font-mono">Dynamic Island</h1>
      <motion.div layout className="h-fit min-w-[100px] overflow-hidden rounded-full bg-black" style={{ borderRadius: 9999 }}>
        {content}
      </motion.div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="rounded-full px-4 py-1" onClick={() => setView(views_enum.IDLE)}><p className="text-xs font-mono">Idle</p></Button>
        <Button variant="outline" size="sm" className="rounded-full px-4 py-1" onClick={() => setView(views_enum.RING)}><p className="text-xs font-mono">Ring</p></Button>
        <Button variant="outline" size="sm" className="rounded-full px-4 py-1" onClick={() => setView(views_enum.TIMER)}><p className="text-xs font-mono">Timer</p></Button>
      </div>
    </div>
  )
}
const Idle = () => { return <div className="h-7" /> }
