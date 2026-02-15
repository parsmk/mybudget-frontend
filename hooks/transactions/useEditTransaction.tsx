import { EditTransactionRequest } from "@/api/transaction";
import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditTransaction = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: (data: EditTransactionRequest) => {
      return apiClient.editTransaction(data);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transactions", data.id] });
    },
  });
};
