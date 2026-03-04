import { EditTransactionRequest } from "@/api/transaction";
import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditAccountTransactions = () => {
  const apiClient = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      accountID,
      data,
    }: {
      accountID: string;
      data: EditTransactionRequest[];
    }) => {
      return apiClient.editAccountTransactions(accountID, data);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
