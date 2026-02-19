"use client";

import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { LeftChevron } from "@/components/svgs/Chevrons";
import { Button } from "@/components/ui-kit/Button";
import { useState } from "react";

type Components = "btns" | "login" | "signup";

const HomePage = () => {
  const [visibleComp, setVisibleComp] = useState<Components>("btns");
  const visibleClasses = "transition-all duration-750 opacity-100 h-auto z-1";
  const invisibleClasses = "opacity-0 h-0 z-0 pointer-events-none";

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-10 items-center">
        <h1 className="text-5xl whitespace-pre-line sm:text-right">{`MyBudget\nApp`}</h1>
        <div>
          <div
            className={`flex flex-col gap-3 ${visibleComp === "btns" ? visibleClasses : invisibleClasses}`}
          >
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
          </div>
          <div
            className={`
              relative flex overflow-hidden bg-tertiary/35 rounded-lg
              ${visibleComp === "login" || visibleComp === "signup" ? `${visibleClasses} p-5 sm:w-100 sm:p-10` : invisibleClasses}`}
          >
            <LeftChevron
              className={`absolute top-4.5 left-2 sm:top-8.5 sm:left-7 size-10 dark:text-white transition hover:text-primary`}
              onClick={() => setVisibleComp("btns")}
            />
            {visibleComp === "login" ? (
              <LoginForm />
            ) : visibleComp === "signup" ? (
              <SignupForm />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
