import { useApiClient } from "@/providers/ApiClientProvider";
import { useQuery } from "@tanstack/react-query";

export const useAccountAnalytics = (id: string) => {
  const apiClient = useApiClient();

  return useQuery({
    queryFn: () => {
      return apiClient.getAccountAnalytics(id);
    },
    queryKey: ["accounts", id, "analytics"],
  });
};
