import { useQuery } from "@tanstack/react-query";
import { useApiClient } from "@/providers/ApiClientProvider";

export const useTransactions = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryKey: ["transactions"],
    queryFn: () => apiClient.getTransactions(),
  });
};
