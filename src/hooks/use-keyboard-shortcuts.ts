"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/ui-store";

export function useKeyboardShortcuts() {
  const toggleQuickCapture = useUIStore((s) => s.toggleQuickCapture);
  const quickCaptureOpen = useUIStore((s) => s.quickCaptureOpen);
  const setQuickCaptureOpen = useUIStore((s) => s.setQuickCaptureOpen);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Esc — close any modal
      if (e.key === "Escape") {
        if (quickCaptureOpen) {
          setQuickCaptureOpen(false);
        }
        return;
      }

      // Skip shortcuts when typing in inputs
      if (isInput) return;

      // C — Toggle Quick Capture
      if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        toggleQuickCapture();
        return;
      }

      // / — Focus search bar
      if (e.key === "/") {
        e.preventDefault();
        const searchInput = document.getElementById("global-search");
        if (searchInput) {
          searchInput.focus();
        }
        return;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleQuickCapture, quickCaptureOpen, setQuickCaptureOpen]);
}
