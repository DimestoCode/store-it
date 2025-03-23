"use client";

import { z } from "zod";
import { createAccount, signInUser } from "@/lib/actions/user.actions";

export type FormType = "sign-up" | "sign-in";

// Pattern: Strategy
export const signInStrategy = {
  getSchema() {
    return z.object({
      email: z.string().email(),
      fullName: z.string().optional(),
    });
  },

  async submit(values: z.infer<ReturnType<typeof this.getSchema>>) {
    return await signInUser({ email: values.email });
  },
  buttonLabel: "Sign In",
  caption: "Don't have an account?",
  captionLink: "/sign-up",
  captionLinkText: "Sign Up",
};

export const signUpStrategy = {
  getSchema() {
    return z.object({
      email: z.string().email(),
      fullName: z.string().min(2).max(50),
    });
  },
  async submit(values: z.infer<ReturnType<typeof this.getSchema>>) {
    return await createAccount({
      fullName: values.fullName || "",
      email: values.email,
    });
  },

  buttonLabel: "Sign Up",
  caption: "Already have an account?",
  captionLink: "/sign-in",
  captionLinkText: "Sign In",
};

export const getAuthStrategy = (type: FormType) => {
  return type === "sign-up" ? signUpStrategy : signInStrategy;
};
