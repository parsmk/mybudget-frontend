"use client";

import { createContext, useContext, useState } from "react";

import { APIClient } from "@/api/api-client";

const APIClientContext = createContext<APIClient | null>(null);

const ApiClientProvider = ({ children }: { children: React.ReactNode }) => {
  const [client] = useState(() => new APIClient());

  return (
    <APIClientContext.Provider value={client}>
      {children}
    </APIClientContext.Provider>
  );
};

export const useApiClient = (): APIClient => {
  const context = useContext(APIClientContext);

  if (!context) {
    throw new Error("useApiClient must be used within an ApiClientProvider");
  }

  return context;
};

export default ApiClientProvider;
