"use client";

import { useActionState, useState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import { loginWithCredentials, loginAsGuest } from "./actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    loginWithCredentials,
    undefined
  );
  
  const [guestPending, setGuestPending] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.refresh();
      router.push("/");
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  const handleGuestLogin = async () => {
    setGuestPending(true);
    try {
      const res = await loginAsGuest();
      if (res.success) {
        toast.success(res.message);
        router.refresh();
        router.push("/");
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setGuestPending(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0B0B0F] px-4 overflow-hidden select-none">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-[128px] -z-10 animate-pulse-glow" />

      <div className="w-full max-w-[420px] z-10 space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-2 animate-slide-up">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 glow-red-sm mb-2 border border-primary/20">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Second Brain OS
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your command center
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-[#16161F] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-6 animate-scale-in relative overflow-hidden">
          {/* Subtle card top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Form */}
          <form action={formAction} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="bg-white/5 border-white/10 h-11 text-sm focus:border-primary/40 focus:ring-primary/20 placeholder:text-muted-foreground/40"
              />
              {state?.errors?.email && (
                <p className="text-xs text-red-500 mt-1">
                  {state.errors.email[0]}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  Password
                </label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="bg-white/5 border-white/10 h-11 text-sm focus:border-primary/40 focus:ring-primary/20 placeholder:text-muted-foreground/40"
              />
              {state?.errors?.password && (
                <p className="text-xs text-red-500 mt-1">
                  {state.errors.password[0]}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={pending || guestPending}
              className="w-full bg-primary hover:bg-primary/95 text-white h-11 transition-all duration-300 glow-red-sm hover:glow-red"
            >
              {pending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign in with Credentials"
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <span className="relative bg-[#16161F] px-3 text-xs text-muted-foreground uppercase tracking-widest font-mono">
              or
            </span>
          </div>

          {/* Guest Button */}
          <Button
            type="button"
            onClick={handleGuestLogin}
            disabled={pending || guestPending}
            variant="outline"
            className="w-full border-white/10 bg-white/5 hover:bg-white/10 text-white h-11 transition-all duration-300 gap-2 hover:border-white/20"
          >
            {guestPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Preparing guest session...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-primary" />
                Continue as Guest
              </>
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground/60 font-mono">
          Second Brain OS © 2026
        </div>
      </div>
    </div>
  );
}
