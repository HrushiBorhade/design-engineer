"use client";

import * as React from "react";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const MODES = [
    {
      name: "dark",
      Icon: MoonStar,
    },
    {
      name: "system",
      Icon: Monitor,
    },
    {
      name: "light",
      Icon: Sun,
    },
  ];
  return (
    <Tabs value={theme} onValueChange={setTheme}>
      <TabsList>
        {MODES.map((mode, i) => (
          <TabsTrigger key={i} value={mode.name} className="p-2">
            <mode.Icon className="w-4 h-4" />
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
