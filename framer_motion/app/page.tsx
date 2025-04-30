import CopyButton from "@/components/basics/copy-button";
import ResizeContent, { AnimateHeight } from "@/components/basics/resize-content";
import SmoothButton from "@/components/basics/smooth-button";
import ToggleDirection from "@/components/layout/direction";
import ToggleElement from "@/components/layout/element";
import FillLayout from "@/components/layout/fill";
import { ChevronRight } from "lucide-react";

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
                <h3 className="text-3xl font-medium tracking-tight">Basics</h3>
              </div>
              <div className="flex flex-col gap-2 ml-3">
                <div className="flex flex-col gap-2 w-full rounded-lg border border-dashed p-4">
                  <p className="text-xl font-medium tracking-tight">Copy Button :</p>
                  <CopyButton />
                </div>
                <div className="flex flex-col gap-2 w-full rounded-lg border border-dashed p-4">
                  <p className="text-xl font-medium tracking-tight">Smooth Button :</p>
                  <SmoothButton />
                </div>
                <AnimateHeight>
                  <div className="flex border border-dashed flex-col gap-2 w-full rounded-lg p-4">
                    <p className="text-xl font-medium tracking-tight">Resize Content :</p>
                    <ResizeContent />
                  </div>
                </AnimateHeight>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <ChevronRight className="w-6 h-6 font-bold" />
                <h3 className="text-3xl font-medium tracking-tight">Layout</h3>
              </div>
              <div className="flex flex-col gap-2 ml-3">
                <div className="flex border border-dashed flex-col gap-2 w-full rounded-lg p-4 h-[30vh]">
                  <p className="text-xl font-medium tracking-tight">Fill Content:</p>
                  <FillLayout />
                </div>
                <div className="flex border border-dashed flex-col gap-2 w-full rounded-lg p-4 h-[40vh]">
                  <p className="text-xl font-medium tracking-tight">Toggle Direction:</p>
                  <ToggleDirection />
                </div>
                <div className="flex border border-dashed flex-col gap-2 w-full rounded-lg p-4 h-[30vh]">
                  <p className="text-xl font-medium tracking-tight">Toggle Element:</p>
                  <ToggleElement />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
