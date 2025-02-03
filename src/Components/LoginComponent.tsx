import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import useLogin from "../Helpers/Hooks/useLogin.tsx";
import LoginForm from "./LoginForm.tsx";
import { LoginState } from "../Helpers/Interfaces.tsx";

const LoginComponent = () => {
  const navigate = useNavigate();
  const { mutate: loginUser, isPending, error } = useLogin();

  const [state, setState] = useState<LoginState>({
    name: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    loginUser(state, {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (err) => alert(err),
    });
  };

  return (
    <LoginForm
      state={state}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      isPending={isPending}
      error={error}
    />
  );
};

export default LoginComponent;
