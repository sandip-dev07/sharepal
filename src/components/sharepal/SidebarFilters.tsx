"use client";

import Image from "next/image";
import { MonitorPlay } from "lucide-react";
import { cn } from "@/lib/utils";

const thumbs: Record<string, string> = {
  All: "/figma/imgAllProducts.png",
  "GTA VI": "/figma/imgGtaVi.png",
  "PS5 Console": "/figma/imgPs5Console.png",
  "Xbox Console": "/figma/imgXboxConsole.png",
  VR: "/figma/imgVr.png",
  "Racing Wheel": "/figma/imgGamingControllers.png",
  "Big Screen Gaming": "/figma/mobile-big-screen.png",
};

function TwoLineLabel({ label }: { label: string }) {
  const words = label.split(" ");
  if (words.length < 2 || label === "GTA VI") return <>{label}</>;
  const last = words.pop();
  return (
    <>
      {words.join(" ")}
      <br />
      {last}
    </>
  );
}

export default function SidebarFilters({
  filters,
  active,
  onChange,
}: {
  filters: string[];
  active: string;
  onChange: (v: string) => void;
}) {
  return (
    <aside className="category-sidebar" aria-label="Gaming categories">
      <div className="sidebar-rail no-scrollbar">
        {filters.map((f) => {
          const isActive = f === active;
          const thumb = thumbs[f];
          return (
            <button
              key={f}
              aria-label={f}
              onClick={() => onChange(f)}
              aria-pressed={isActive}
              className="flex w-24 flex-col items-center"
            >
              <span
                className={cn(
                  "flex size-16 items-center justify-center overflow-hidden rounded-xl border",
                  isActive
                    ? "border-sp-blue bg-white"
                    : "border-sp-fog bg-sp-panel",
                )}
              >
                {thumb ? (
                  <Image
                    src={thumb}
                    alt=""
                    width={64}
                    height={64}
                    className="size-[50.4px] object-contain"
                  />
                ) : (
                  <MonitorPlay className="size-6 text-neutral-700" />
                )}
              </span>
              <span
                className={cn(
                  "mt-1 text-center text-sm font-semibold leading-4",
                  isActive ? "text-sp-blue" : "text-sp-nearblack",
                )}
              >
                <TwoLineLabel label={f} />
              </span>
              {isActive && (
                <span className="mt-1 h-0.5 w-8 rounded-full bg-sp-blue" />
              )}
            </button>
          );
        })}
      </div>
    </aside>
  );
}
