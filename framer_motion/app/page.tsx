import CopyButton from "@/components/basics/copy-button";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full min-h-[100dvh]">
      <div className="container mx-auto flex flex-col gap-4 p-6">
        <h1 className="text-6xl font-bold tracking-tight">Framer Motion</h1>
        <div className="flex flex-col gap-3 ml-3">

          <div className="flex flex-col gap-2">
            {/* the basics */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <ChevronRight className="w-6 h-6 font-bold" />
                <h3 className="text-3xl font-medium tracking-tight">The Basics</h3>
              </div>
              <div className="flex flex-col gap-2 ml-3">
                <div className="flex flex-col gap-2 w-full rounded-lg border border-dashed p-4">
                    <p className="text-xl font-medium tracking-tight">Copy Button :</p>
                  <CopyButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
