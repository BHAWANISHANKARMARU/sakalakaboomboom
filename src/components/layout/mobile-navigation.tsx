"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigationItems } from "@/content/navigation";
export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return (
    <div className="md:hidden">
      <button
        ref={button}
        className="button secondary"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-line absolute inset-x-0 top-full z-20 border-b bg-white p-4 shadow-sm"
        >
          <div className="mx-auto grid max-w-6xl gap-1">
            {navigationItems.map((item) => (
              <Link
                className="hover:bg-paper min-h-11 rounded px-3 py-2 font-semibold"
                href={item.href}
                key={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              className="hover:bg-paper min-h-11 rounded px-3 py-2 font-semibold"
              href="/search"
            >
              Search
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
}
