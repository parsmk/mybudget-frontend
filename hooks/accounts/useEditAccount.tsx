import { Account } from "@/api/account";
import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditAccount = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: (data: Account) => {
      return apiClient.editAccount(data);
    },
    onSuccess: (data, variables, onMutateResults, context) => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      queryClient.invalidateQueries({ queryKey: ["accounts", data.id] });
    },
  });
};
