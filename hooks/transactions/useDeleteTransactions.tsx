import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTransactions = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: (ids: string[]) => {
      return apiClient.deleteTransactions(ids);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      const accountIds = new Set(data.map((t) => t.accountID));
      for (const id of accountIds) {
        queryClient.invalidateQueries({ queryKey: ["accounts", id] });
      }
    },
  });
};
