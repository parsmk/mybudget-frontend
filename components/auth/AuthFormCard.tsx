import React from "react";

export const AuthFormCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-full w-full items-center gap-5">
      {children}
    </div>
  );
};
