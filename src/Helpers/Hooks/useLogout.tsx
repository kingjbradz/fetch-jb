import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../Api";

const useLogout = () => {
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

export default useLogout;
