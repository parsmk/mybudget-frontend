"use client";

import React, { useMemo, useState } from "react";
import { Button } from "../ui-kit/Button";
import { InputField } from "../ui-kit/InputField";
import { useSignup } from "@/hooks/auth/useSignup";
import { AuthFormCard } from "./AuthFormCard";
import { useErrorHandler } from "@/hooks/useErrorState";
import {
  isValidEmail as isValidEmail,
  validatePassword,
} from "@/utils/authValidation";

export const SignupForm = ({ onDone }: { onDone: () => void }) => {
  const { mutateAsync: signup, isPending } = useSignup();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");

  const [submitted, setSubmitted] = useState<boolean>(false);
  const { formErrors, fieldErrors, handler } = useErrorHandler();

  const valid = useMemo(() => {
    if (!isValidEmail(email)) return false;
    if (password.trim().length < 6 || confirmPass.length < 6) return false;
    else return true;
  }, [email, password, confirmPass]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    handler.clear();
    try {
      const passErrs = validatePassword(password);
      if (passErrs.length > 0) {
        return handler.addFieldErrors("password", passErrs);
      } else if (password !== confirmPass) {
        return handler.addFieldError(
          "confirmPass",
          "Confirm password does not match password!",
        );
      }

      await signup({
        email: email,
        password: password,
      });

      setSubmitted(true);
    } catch (errs) {
      handler.handle(errs);
    }
  };

  return (
    <>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="h-full w-full">
          <AuthFormCard>
            <h2 className="text-2xl text-center">Sign Up</h2>
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
              placeholder="example@gmail.com..."
              required
              errors={fieldErrors["email"]}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <InputField
              type="password"
              name="password"
              label="Password"
              required
              errors={fieldErrors["password"]}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <InputField
              type="password"
              name="confirmPass"
              label="Confirm Password"
              required
              errors={fieldErrors["confirmPass"]}
              onChange={(e) => setConfirmPass(e.currentTarget.value)}
            />
            <Button
              type="submit"
              size="md"
              variant="primary"
              disabled={!valid}
              loading={isPending}
            >
              Sign Up
            </Button>
          </AuthFormCard>
        </form>
      ) : (
        <AuthFormCard>
          <p>Signed up successfully!</p>
          <p>Hit the link in your email to proceed to your Budget!</p>
          <Button onClick={onDone}>Back to login</Button>
        </AuthFormCard>
      )}
    </>
  );
};
