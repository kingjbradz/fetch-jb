import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "./Api"; // Import existing login function

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) => login(name, email),
    onSuccess: (_, { name, email }) => {
      const loginTimestamp = new Date().getTime();
      const authData = { isAuthenticated: true, name, email, loginTimestamp };

      // Set auth data in localStorage
      localStorage.setItem("auth", JSON.stringify(authData));

      // Update React Query cache with login state
      queryClient.setQueryData(["auth"], true);
      queryClient.setQueryData(["user"], { name, email });
    },
  });
};
export const useAuth = () => { 
  const queryClient = useQueryClient();
  return queryClient.getQueryData<boolean>(["auth"]) || false;
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.removeItem("auth");
      queryClient.setQueryData(["auth"], false);
      queryClient.setQueryData(["user"], null);
    },
  });
};