"use client";

import React, { useState } from "react";
import { Button } from "../ui-kit/Button";
import { InputField } from "../ui-kit/InputField";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/_route-map";
import { AuthFormCard } from "./AuthFormCard";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { mutateAsync: login } = useLogin();
  const [errs, setErrs] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      await login({
        email,
        password,
      });

      router.push(ROUTES.DASHBOARD);
    } catch (errs) {
      setErrs((prev) => [...prev, errs as string]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full w-full">
      <AuthFormCard>
        <h2 className="text-2xl text-center">Login</h2>
        <InputField
          type="text"
          name="email"
          label="Email"
          placeholder="example@gmail.com..."
          onChange={setEmail}
        />
        <InputField
          type="password"
          name="password"
          label="Password"
          onChange={setPassword}
        />
        <Button type="submit" size="md" variant="primary">
          Login
        </Button>
      </AuthFormCard>
    </form>
  );
};
