"use client";

import React, { useMemo, useState } from "react";
import { Button } from "../ui-kit/Button";
import { InputField } from "../ui-kit/InputField";
import { useLogin } from "@/hooks/auth/useLogin";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/app/_route-map";
import { AuthFormCard } from "./AuthFormCard";
import { useErrorHandler } from "@/hooks/useErrorState";
import { testEmailString } from "@/utils/emailReg";

export const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { formErrors, fieldErrors, handler } = useErrorHandler();

  const { mutateAsync: login, isPending } = useLogin();
  const router = useRouter();

  const valid = useMemo(() => {
    if (email.trim().length > 1 && !testEmailString(email)) return false;
    if (password.trim().length < 6) return false;

    return true;
  }, [email, password]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    handler.clear();
    try {
      await login({
        email,
        password,
      });

      router.push(ROUTES.PORTAL.DASHBOARD);
    } catch (errs) {
      handler.handle(errs);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-full w-full">
      <AuthFormCard>
        <h2 className="text-2xl text-center">Login</h2>
        {formErrors.length > 0 &&
          formErrors.map((err, i) => (
            <p key={i} className="text-danger">
              {err}
            </p>
          ))}
        <InputField
          type="text"
          name="email"
          label="Email"
          errors={fieldErrors["email"]}
          required
          placeholder="example@gmail.com..."
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <InputField
          type="password"
          name="password"
          label="Password"
          errors={fieldErrors["password"]}
          required
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Button
          type="submit"
          size="md"
          variant="primary"
          loading={isPending}
          disabled={!valid}
        >
          Login
        </Button>
      </AuthFormCard>
    </form>
  );
};
