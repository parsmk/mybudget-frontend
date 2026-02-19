import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTransactions = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: (id: string[]) => {
      return apiClient.deleteTransactions(id);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({
        queryKey: ["accountTransactions", data[0].accountID],
      });
      queryClient.invalidateQueries({
        queryKey: ["accountAnalytics", data[0].accountID],
      });
    },
  });
};
