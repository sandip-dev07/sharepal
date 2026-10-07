"use client";
import { useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { topCategories } from "@/constants/data/categories";
import Link from "next/link";

export default function CategoryNav() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const active = rail?.querySelector<HTMLElement>("[aria-current]");
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (!cancelled && rail && active && window.matchMedia("(max-width: 639px)").matches) {
        rail.scrollLeft += active.getBoundingClientRect().left - rail.getBoundingClientRect().left;
      }
    });
    return () => { cancelled = true; };
  }, []);

  function scrollBy(dir: 1 | -1) {
    railRef.current?.scrollBy({ left: dir * 180, behavior: "smooth" });
  }

  return (
    <nav className="category-nav" aria-label="Rental categories">
      <button
        className="cat-arrow"
        aria-label="Scroll categories left"
        onClick={() => scrollBy(-1)}
      >
        <ChevronLeft size={18} />
      </button>
      <div className="category-tabs" ref={railRef}>
        {topCategories.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            aria-current={c.active ? "page" : undefined}
          >
            {c.label}
          </Link>
        ))}
      </div>
      <button
        className="cat-arrow"
        aria-label="Scroll categories right"
        onClick={() => scrollBy(1)}
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
