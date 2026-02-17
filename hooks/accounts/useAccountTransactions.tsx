import { useApiClient } from "@/providers/ApiClientProvider";
import { useQuery } from "@tanstack/react-query";

export const useAccountTransactions = (id: string) => {
  const apiClient = useApiClient();

  return useQuery({
    queryFn: () => {
      return apiClient.getAccountTransactions(id);
    },
    queryKey: ["accountTransactions", id],
  });
};
