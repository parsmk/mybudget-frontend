import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "../../providers/ApiClientProvider";
import { CreateTransactionRequest } from "@/api/account";

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async (data: CreateTransactionRequest[]) => {
      await apiClient.createTransactions(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
};
