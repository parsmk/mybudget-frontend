import { useMutation } from "@tanstack/react-query";
import { SignupRequest } from "@/api/user";
import { useApiClient } from "../../providers/ApiClientProvider";

export const useSignup = () => {
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: async (formData: SignupRequest) => {
      await apiClient.signup({
        email: formData.email,
        password: formData.password,
      });
    },
  });
};
