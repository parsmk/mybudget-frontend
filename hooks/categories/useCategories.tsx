import { useApiClient } from "@/providers/ApiClientProvider";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const apiClient = useApiClient();

  return useQuery({
    queryFn: () => {
      return apiClient.getCategories();
    },
    queryKey: ["categories"],
  });
};
