import { useApiClient } from "@/providers/ApiClientProvider";
import { useQuery } from "@tanstack/react-query";

export const useAccounts = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryFn: () => {
      return apiClient.getAccounts();
    },
    queryKey: ["accounts"],
  });
};
