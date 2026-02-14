"use client";

import React, { useState } from "react";
import { Button } from "../ui-kit/Button";
import { InputField } from "../ui-kit/InputField";
import { useSignup } from "@/hooks/auth/useSignup";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/_route-map";
import { AuthFormCard } from "./AuthFormCard";

export const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const { mutateAsync: signup } = useSignup();
  const [errs, setErrs] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrs([]);
    try {
      if (password !== confirmPass) {
        setErrs((prev) => [...prev, "Passwords don't match!"]);
        return;
      }

      await signup({
        email: email,
        password: password,
      });

      router.push(ROUTES.PORTAL.DASHBOARD);
    } catch (errs) {
      setErrs((prev) => [...prev, errs as string]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full w-full">
      <AuthFormCard>
        <h2 className="text-2xl text-center">Sign Up</h2>
        <InputField
          type="text"
          name="email"
          label="Email"
          placeholder="example@gmail.com..."
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <InputField
          type="password"
          name="password"
          label="Password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <InputField
          type="password"
          name="confirmPass"
          label="Confirm Password"
          onChange={(e) => setConfirmPass(e.currentTarget.value)}
        />
        <Button type="submit" size="md" variant="primary">
          Sign Up
        </Button>
      </AuthFormCard>
    </form>
  );
};
