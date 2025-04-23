"use client";

import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

export default function TabsClipPath() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState(theme ? theme : "system");
  const containerRef = useRef(null);
  const activeTabElementRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    setTheme(activeTab);
    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;

      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;

        const clipLeft = offsetLeft;
        const clipRight = offsetLeft + offsetWidth;
        container.style.clipPath = `inset(0 ${Number(
          100 - (clipRight / container.offsetWidth) * 100
        ).toFixed()}% 0 ${Number(
          (clipLeft / container.offsetWidth) * 100
        ).toFixed()}% round 10px)`;
      }
    }
  }, [activeTab, activeTabElementRef, containerRef]);

  return (
    <div className="flex items-center justify-center rounded-[12px] p-1 bg-muted">
      <ul className="flex justify-center gap-2">
        {TABS.map((tab) => (
          <li key={tab.name}>
            <div
              ref={activeTab === tab.name ? activeTabElementRef : null}
              data-tab={tab.name}
              onClick={() => {
                setActiveTab(tab.name);
              }}
              className="p-2 text-muted-foreground  flex items-center justify-center"
            >
              <tab.Icon className="w-4 h-4"/>
            </div>
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="absolute w-full overflow-hidden clip-path-container"
        ref={containerRef}
      >
        <ul className="flex justify-center gap-2  bg-background text-primary">
          {TABS.map((tab) => (
            <li key={tab.name}>
              <div
                data-tab={tab.name}
                onClick={() => {
                  setActiveTab(tab.name);
                }}
                className="p-2  flex items-center justify-center"
                tabIndex={-1}
              >
               <tab.Icon className="w-4 h-4"/>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const TABS = [
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
