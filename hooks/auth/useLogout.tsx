import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../providers/ApiClientProvider";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async () => {
      await apiClient.logout();
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
