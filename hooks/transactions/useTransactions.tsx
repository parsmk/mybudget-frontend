import { useQuery } from "@tanstack/react-query";
import { APIClient } from "../../api/api-client";

export const useTransactions = () => {
  const apiClient = new APIClient();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => apiClient.getTransactions(),
  });
};
