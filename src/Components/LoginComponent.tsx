import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button, Card, TextField } from "@mui/material";
import { useLogin } from "../Helpers/Hooks.tsx";

interface LoginState {
  name: string;
  email: string;
}

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
    <form onSubmit={handleSubmit}>
      <Card>
        <TextField id="name" value={state.name} onChange={handleChange} label="Name" disabled={isPending} />
        <TextField id="email" value={state.email} onChange={handleChange} label="Email" disabled={isPending} />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Submit"}
        </Button>
        {error && <p style={{ color: "red" }}>Login failed</p>}
      </Card>
    </form>
  );
};

export default LoginComponent;
