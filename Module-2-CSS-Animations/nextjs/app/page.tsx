import ClipPathSlider from "@/components/clip-path-slider";
import TabsClipPath from "@/components/tab-toggle";
import TextReveal from "@/components/text-reveal";
import ModeToggle from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <div className="relative w-full flex flex-col gap-5 items-center justify-center min-h-[100dvh]">
      <TextReveal />
      <ModeToggle />
      <div className="relative ">
        <TabsClipPath />
      </div>
      <div className="bg-primary w-40 h-40 rounded-lg  circle"></div>
      <ClipPathSlider />
      <div className="w-full h-[30dvh] rounded-lg bg-primary image-reveal" />
    </div>
  );
}
