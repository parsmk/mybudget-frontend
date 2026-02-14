import { Category } from "@/api/category";
import { useApiClient } from "@/providers/ApiClientProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditCategory = () => {
  const queryClient = useQueryClient();
  const apiClient = useApiClient();

  return useMutation({
    mutationFn: (data: Category) => {
      return apiClient.editCategory(data);
    },
    onSuccess: (data, variables, onMutateResults, context) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories", data.id] });
    },
  });
};
