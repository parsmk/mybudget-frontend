import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoginRequest } from "@/api/user";
import { useApiClient } from "../../providers/ApiClientProvider";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async (formData: LoginRequest) => {
      await apiClient.login({
        email: formData.email,
        password: formData.password,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};
