import { useState } from "react";
import { Navigate, Routes, Route } from "react-router";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/dashboard" element={<Dashboard setIsLoggedIn={setIsLoggedIn} />} />
    </Routes>
  )
}

export default App
