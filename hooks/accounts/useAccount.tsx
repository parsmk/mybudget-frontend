import { useApiClient } from "@/providers/ApiClientProvider";
import { useQuery } from "@tanstack/react-query";

export const useAccount = (id: string) => {
  const apiClient = useApiClient();

  return useQuery({
    queryFn: () => {
      return apiClient.getAccount(id);
    },
    queryKey: ["account", id],
  });
};
