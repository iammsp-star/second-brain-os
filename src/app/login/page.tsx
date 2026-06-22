"use client";

import { useActionState, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginWithCredentials, loginAsGuest } from "./actions";
import { createClient as createBrowserClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Zap, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";

// Custom Google SVG brand icon
function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    loginWithCredentials,
    undefined
  );
  
  const [guestPending, setGuestPending] = useState(false);
  const [googlePending, setGooglePending] = useState(false);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      router.refresh();
      router.push("/");
    } else if (state?.message) {
      toast.error(state.message);
    }
  }, [state, router]);

  const handleGoogleLogin = async () => {
    setGooglePending(true);
    try {
      const supabase = createBrowserClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        setGooglePending(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
      setGooglePending(false);
    }
  };

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
        <div className="bg-[#16161F] border border-white/10 rounded-2xl p-8 shadow-2xl space-y-5 animate-scale-in relative overflow-hidden">
          {/* Subtle card top glow line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Google Sign-in Button */}
          <Button
            type="button"
            onClick={handleGoogleLogin}
            disabled={pending || guestPending || googlePending}
            className="w-full bg-white text-black hover:bg-white/90 h-11 transition-all duration-300 font-semibold flex items-center justify-center gap-2 rounded-xl border border-white"
          >
            {googlePending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <GoogleIcon className="w-4 h-4" />
            )}
            Sign in with Google
          </Button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <span className="relative bg-[#16161F] px-3 text-xs text-muted-foreground uppercase tracking-widest font-mono">
              or credentials
            </span>
          </div>

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
              disabled={pending || guestPending || googlePending}
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
              or explore
            </span>
          </div>

          {/* Guest Button */}
          <Button
            type="button"
            onClick={handleGuestLogin}
            disabled={pending || guestPending || googlePending}
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
