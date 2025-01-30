import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Button, Card, FormControl, TextField } from "@mui/material";

interface LoginState{
  name: string;
  email: string;
}

const LoginComponent = () => {
  const url = "https://frontend-take-home-service.fetch.com/auth/login"

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
      body: JSON.stringify(state)
    })

    if (response.ok) {
      alert("Successful yyeeee")
    } else {
      alert("boo boo")
    }
  }

  return (
    <Card>
      <FormControl onSubmit={handleSubmit}>
        <TextField id="name" value={state.name} onChange={handleChange} label="Name"></TextField>
        <TextField id="email" value={state.email} onChange={handleChange} label="Email"></TextField>
        <Button onClick={handleSubmit}>Submit</Button>
      </FormControl>
    </Card>
  )
};

export default LoginComponent