"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { BackIcon } from "@/components/svgs/BackIcon";
import { Button } from "@/components/ui-kit/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Components = "btns" | "login" | "signup";

const HomePage = () => {
  const router = useRouter();
  const [visibleComp, setVisibleComp] = useState<Components>("btns");

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="grid grid-cols-[auto_1fr] gap-10 items-center">
        <h1 className="text-5xl whitespace-pre-line text-right">{`MyBudget\nApp`}</h1>
        <div>
          {visibleComp === "btns" && (
            <>
              <Button
                type="button"
                variant="primary"
                size="lg"
                onClick={() => setVisibleComp("login")}
              >
                Login
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setVisibleComp("signup")}
              >
                Signup
              </Button>
            </>
          )}
          {visibleComp === "login" && (
            <div>
              <BackIcon
                className="size-10 dark:fill-white cursor-pointer"
                onClick={() => setVisibleComp("btns")}
              />
              <LoginForm />
            </div>
          )}
          {visibleComp === "signup" && (
            <div>
              <BackIcon
                className="size-10 dark:fill-white cursor-pointer"
                onClick={() => setVisibleComp("btns")}
              />
              <SignupForm />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
