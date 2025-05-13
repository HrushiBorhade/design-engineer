"use client";

import * as React from "react";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ThemeModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we have access to the theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const MODES = [
    {
      name: "dark",
      Icon: MoonStar,
    },
    // {
    //   name: "system",
    //   Icon: Monitor,
    // },
    {
      name: "light",
      Icon: Sun,
    },
  ];

  return (
    <Tabs value={theme} defaultValue="system" onValueChange={setTheme}>
      <TabsList className="border bg-background rounded-lg">
        {MODES.map((mode) => (
          <TabsTrigger key={mode.name} value={mode.name} className="rounded-md p-1">
            <mode.Icon className="h-1 w-1" />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
