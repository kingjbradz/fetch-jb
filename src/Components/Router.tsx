import { Navigate, Routes, Route } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Login from "../Pages/Login.tsx";
import Dashboard from "../Pages/Dashboard.tsx";
import App404 from "../Pages/App404.tsx";

function Router() {
  // Get authentication state from React Query
  const { data: isLoggedIn, isLoading } = useQuery({
    queryKey: ["auth"],
    initialData: false, // Assume logged out by default
  });

  // Prevent routing decisions while authentication state is still loading
  if (isLoading) return null; // or a loading spinner component

  return (
    <Routes>
      {/* Root route should redirect based on authentication state */}
      <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />

      {/* Login should not be accessible when logged in */}
      {!isLoggedIn ? (
        <Route path="/login" element={<Login />} />
      ) : (
        <Route path="/login" element={<Navigate to="/dashboard" replace />} />
      )}

      {/* Dashboard should be protected */}
      {isLoggedIn ? (
        <Route path="/dashboard" element={<Dashboard />} />
      ) : (
        <Route path="/dashboard" element={<Navigate to="/login" replace />} />
      )}
      <Route path="*" element={<App404 />} />
    </Routes>
  );
}

export default Router;
