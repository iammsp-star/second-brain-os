"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUIStore } from "@/store/ui-store";
import { Zap, Sparkles, Heart } from "lucide-react";

// Local SVG icons to avoid dependency version mismatches
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function AboutModal() {
  const open = useUIStore((s) => s.aboutOpen);
  const setOpen = useUIStore((s) => s.setAboutOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[440px] bg-[#16161F] border-white/10 p-0 gap-0 animate-scale-in overflow-hidden">
        {/* Decorative Top Banner */}
        <div className="h-2 bg-gradient-to-r from-primary via-red-500 to-rose-600" />
        
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="flex items-center gap-2 text-base font-semibold">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            About Second Brain OS
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 pt-2 space-y-5 text-center sm:text-left">
          {/* Logo & Title */}
          <div className="flex flex-col items-center gap-2 py-4 bg-white/[0.02] border border-white/[0.04] rounded-2xl relative overflow-hidden">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-primary/5 blur-xl -z-10 rounded-full" />
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 glow-red-sm">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold tracking-tight text-white">
                Second Brain OS
              </h3>
              <p className="text-[11px] font-mono text-muted-foreground tracking-widest uppercase">
                Version 0.1.0
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            A unified digital workspace designed to eliminate mental overwhelm by tracking habits, managing projects, saving notes, and monitoring lifestyle metrics.
          </p>

          {/* Tech Stack Tags */}
          <div className="flex flex-wrap justify-center gap-1.5 pt-1">
            <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-muted-foreground px-2 py-0.5 rounded-md">Next.js 16</span>
            <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-muted-foreground px-2 py-0.5 rounded-md">Tailwind v4</span>
            <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-muted-foreground px-2 py-0.5 rounded-md">TypeScript</span>
            <span className="text-[10px] font-mono bg-white/5 border border-white/10 text-muted-foreground px-2 py-0.5 rounded-md">Zustand</span>
          </div>

          <hr className="border-white/5" />

          {/* Creator & Links */}
          <div className="flex flex-col items-center justify-center gap-3 pt-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              Built with <Heart className="w-3.5 h-3.5 text-primary fill-primary animate-pulse" /> by <span className="font-semibold text-white">Manas Subhash</span>
            </div>
            
            <div className="flex items-center gap-3">
              {/* GitHub Link */}
              <a
                href="https://github.com/iammsp-star/second-brain-os"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-xs font-semibold text-white transition-all duration-300 group"
              >
                <GithubIcon className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                GitHub
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/in/manas-subhash"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077B5]/10 border border-[#0077B5]/20 hover:bg-[#0077B5]/20 hover:border-[#0077B5]/30 text-xs font-semibold text-[#0077B5] hover:text-[#0077B5]/90 transition-all duration-300 group"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0077B5]/80 group-hover:text-[#0077B5] transition-colors" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
