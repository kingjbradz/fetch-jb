import { useState } from "react";
import { Navigate, Routes, Route } from "react-router";
import { useAuth } from "../Helpers/Hooks.tsx";
import Login from "../Pages/Login.tsx";
import Dashboard from "../Pages/Dashboard.tsx";

function Router({ isLoggedIn, setIsLoggedIn }) {
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
  };

  return (
    
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard setIsLoggedIn={setIsLoggedIn} />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default Router
