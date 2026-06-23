"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type ActionState = {
  success: boolean;
  message: string;
  verificationRequired?: boolean;
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
};

export async function loginWithCredentials(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email");
  const password = formData.get("password");

  const validatedFields = loginSchema.safeParse({ email, password });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
    });

    if (error) {
      // Secure logging, return generic message to user
      console.error("[Login Auth Error]:", error.message);
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    return {
      success: true,
      message: "Successfully logged in.",
    };
  } catch (err) {
    console.error("[Login Server Exception]:", err);
    return {
      success: false,
      message: "An internal error occurred.",
    };
  }
}

export async function loginAsGuest(): Promise<ActionState> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      console.error("[Guest Sign-in Error]:", error.message);
      return {
        success: false,
        message: "Unable to start guest session.",
      };
    }

    return {
      success: true,
      message: "Guest session started successfully.",
    };
  } catch (err) {
    console.error("[Guest Sign-in Server Exception]:", err);
    return {
      success: false,
      message: "An internal error occurred.",
    };
  }
}

export async function signUpWithCredentials(
  prevState: ActionState | undefined,
  formData: FormData
): Promise<ActionState> {
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const validatedFields = signUpSchema.safeParse({ email, password, confirmPassword });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const supabase = await createClient();
    const headersList = await headers();
    const origin = headersList.get("origin") || "http://localhost:3000";

    const { error, data } = await supabase.auth.signUp({
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      options: {
        emailRedirectTo: `${origin}/api/auth/callback`,
      },
    });

    if (error) {
      console.error("[SignUp Auth Error]:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    if (data.session) {
      return {
        success: true,
        message: "Account created and logged in successfully.",
      };
    }

    return {
      success: true,
      verificationRequired: true,
      message: "Account created! Please check your email to verify your account.",
    };
  } catch (err) {
    console.error("[SignUp Server Exception]:", err);
    return {
      success: false,
      message: "An internal error occurred.",
    };
  }
}
