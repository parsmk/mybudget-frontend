"use client";

import React, { useState } from "react";
import { Button } from "../ui-kit/Button";
import { InputField } from "../ui-kit/InputField";

export const SignupForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const handleSubmit = (e: React.SubmitEvent) => {
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log(`Confirm Password: ${confirmPass}`);
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
