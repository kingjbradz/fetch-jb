import LoginComponent from "../Components/LoginComponent.tsx";

const Login = ({ setIsLoggedIn }: { setIsLoggedIn: (state: boolean) => void }) => {
  return (
    <LoginComponent setIsLoggedIn={setIsLoggedIn} />
  )
}

export default Login