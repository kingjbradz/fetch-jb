import { useQueryClient, useMutation } from "@tanstack/react-query";
import { login } from "../Api";

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) =>
      login(name, email),
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

export default useLogin;
