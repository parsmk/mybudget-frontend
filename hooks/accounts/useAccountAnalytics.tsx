import { useApiClient } from "@/providers/ApiClientProvider";
import { useQuery } from "@tanstack/react-query";

export const useAccountAnalytics = (
  id: string,
  filters?: { from?: Date; to?: Date },
) => {
  const apiClient = useApiClient();

  const from = filters?.from
    ? filters.from.toISOString().slice(0, 10)
    : undefined;
  const to = filters?.to ? filters.to.toISOString().slice(0, 10) : undefined;
  return useQuery({
    queryFn: () => {
      return apiClient.getAccountAnalytics(id, { from, to });
    },
    queryKey: ["accounts", id, "analytics"],
  });
};
