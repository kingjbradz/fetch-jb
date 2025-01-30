import { Routes, Route } from "react-router";
import Login from "./Pages/Login";

function App() {

  return (
    <Routes>
      <Route index element={<Login />} />
    </Routes>
  )
}

export default App
