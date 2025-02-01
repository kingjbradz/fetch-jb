import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout } from "./Api"; // Import existing login function

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) => {
      queryClient.setQueryData(["user"], { name, email });
      login(name, email)
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth"], true); // Save login state
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
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], { name: "", email: "" });
      queryClient.setQueryData(["auth"], false);
      queryClient.invalidateQueries({queryKey: ["auth"]}); // Clear cache
    },
  });
};