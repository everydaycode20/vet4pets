import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiUrl } from "../constants/apiUrl";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return fetch(`${apiUrl}logout`, {
        method: "POST",
      });
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], false);
    },
  });
}
