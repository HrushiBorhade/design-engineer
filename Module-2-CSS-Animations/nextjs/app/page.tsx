import TextReveal from "@/components/text-reveal";
import ModeToggle from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <div className="relative w-full flex items-center justify-center h-screen">
        <TextReveal />
      <div className="absolute bottom-2 right-2">
        <ModeToggle />
      </div>
    </div>
  );
}
