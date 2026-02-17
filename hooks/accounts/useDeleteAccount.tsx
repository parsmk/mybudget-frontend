import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: (id: string) => {
      return apiClient.deleteAccount(id);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accounts", data.id] });
    },
  });
};
