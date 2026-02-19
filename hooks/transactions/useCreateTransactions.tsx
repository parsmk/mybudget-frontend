import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../providers/ApiClientProvider";
import { CreateTransactionRequest } from "@/api/transaction";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async ({
      data,
      accountID,
    }: {
      data: CreateTransactionRequest[];
      accountID: string;
    }) => {
      return await apiClient.createTransactions(data);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({
        queryKey: ["accounts", variables.accountID],
      });
    },
  });
};
