"use client";

import React, { useState } from "react";
import { Button } from "../ui-kit/Button";
import { InputField } from "../ui-kit/InputField";
import { useSignup } from "@/hooks/auth/useSignup";

export const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const { mutateAsync: signup } = useSignup();
  const [errs, setErrs] = useState<string[]>([]);

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
    } catch (errs) {
      setErrs((prev) => [...prev, errs as string]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <InputField
        type="password"
        name="confirmPass"
        label="Confirm Password"
        onChange={setConfirmPass}
      />
      <Button type="submit" size="md" variant="primary" />
    </form>
  );
};
