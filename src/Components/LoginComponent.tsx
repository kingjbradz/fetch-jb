import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button, Card, TextField } from "@mui/material";

interface LoginState{
  name: string;
  email: string;
}

const LoginComponent = ({ setIsLoggedIn }: { setIsLoggedIn: (state: boolean) => void }) => {
  const url = "https://frontend-take-home-service.fetch.com/auth/login"
  const navigate = useNavigate()

  const [state, setState] = useState<LoginState>({
    name: "",
    email: ""
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(state),
      credentials: "include"
    })

    if (response.ok) {
      setIsLoggedIn(true)
      navigate("/dashboard")
    } else {
      alert("boo boo")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <TextField id="name" value={state.name} onChange={handleChange} label="Name"></TextField>
        <TextField id="email" value={state.email} onChange={handleChange} label="Email"></TextField>
        <Button type="submit">Submit</Button>
      </Card>
    </form>
  )
};

export default LoginComponent