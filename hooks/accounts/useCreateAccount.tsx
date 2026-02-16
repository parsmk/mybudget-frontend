import { CreateAccountRequest } from "@/api/account";
import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: (data: CreateAccountRequest) => {
      return apiClient.createAccount(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });
};
