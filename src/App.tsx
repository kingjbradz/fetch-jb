import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useLogout } from "./Helpers/Hooks";
import ButtonAppBar from "./Components/AppBar";
import Router from "./Components/Router";

function App() {
  const queryClient = useQueryClient();
  const logoutMutation = useLogout(); 

  // ✅ Get auth state from React Query
  const { data: isAuthenticated } = useQuery({
    queryKey: ["auth"],
    initialData: false,
  });

  useEffect(() => {
    const authData = localStorage.getItem("auth");
    if (authData) {
      const { isAuthenticated, name, email, loginTimestamp } = JSON.parse(authData);
      const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
      const currentTime = new Date().getTime();

      if (currentTime - loginTimestamp > oneHour) {
        console.log("Session expired, logging out.");
        logoutMutation.mutate();
      } else {
        console.log("Restoring session:", { isAuthenticated, name, email });

        queryClient.setQueryData(["auth"], isAuthenticated);
        queryClient.setQueryData(["user"], { name, email });

        setTimeout(() => {
          logoutMutation.mutate();
        }, oneHour - (currentTime - loginTimestamp));
      }
    }
  }, [queryClient, logoutMutation]);

  return (
    <>
      <ButtonAppBar />
      <Router isLoggedIn={isAuthenticated} />
    </>
  );
}

export default App;
