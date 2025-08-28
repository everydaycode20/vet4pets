import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiUrl } from "../constants/apiUrl";

export function useLogin() {
  const queryClient = useQueryClient();

  const url = apiUrl.replace("/api", "");

  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return await fetch(
        `${url}/login?useCookies=true&useSessionCookies=true`,
        {
          body: JSON.stringify(data),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
    },
    onSuccess: (user) => {
      console.log(user);

      queryClient.setQueryData(["user"], user);
    },
  });
}
