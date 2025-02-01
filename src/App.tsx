import {useState} from "react"
import ButtonAppBar from "./Components/AppBar"
import Router from "./Components/Router"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  return (
    <>
      <ButtonAppBar setIsLoggedIn={setIsLoggedIn}  />
      <Router isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </>
  )
}

export default App
