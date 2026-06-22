"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
  password: z.string().min(1, "Password is required"),
});

export type ActionState = {
  success: boolean;
  message: string;
  errors?: {
    email?: string[];
    password?: string[];
  };
};

export async function loginWithCredentials(
  prevState: any,
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
