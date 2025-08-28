import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../constants/apiUrl";

export async function getUser() {
  try {
    const res = await fetch(`${apiUrl}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const json = await res.json();

    return json;
  } catch (error) {
    return false;
  }
}

export function useGetUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => getUser(),
    staleTime: Infinity,
  });
}
