import { EditTransactionRequest } from "@/api/transaction";
import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditTransaction = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: ({
      patch,
      oldAccountID,
    }: {
      patch: EditTransactionRequest;
      oldAccountID: string;
    }) => {
      return apiClient.editTransaction(patch);
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      const oldAccountID = variables.oldAccountID;
      const newAccountID = data.account_id;

      queryClient.invalidateQueries({
        queryKey: ["accounts", oldAccountID],
      });

      if (newAccountID && oldAccountID !== newAccountID) {
        queryClient.invalidateQueries({
          queryKey: ["accounts", newAccountID],
        });
      }
    },
  });
};
