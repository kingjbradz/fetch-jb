import { Card, TextField, Button } from "@mui/material";

const LoginForm = ({ state, handleSubmit, handleChange, isPending, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1rem",
          width: "300px",
        }}
      > 
        <TextField
          id="name"
          value={state.name}
          onChange={handleChange}
          label="Name"
          disabled={isPending}
        />
        <TextField
          id="email"
          value={state.email}
          onChange={handleChange}
          label="Email"
          disabled={isPending}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Submit"}
        </Button>
        {error && <p style={{ color: "red" }}>Login failed</p>}
      </Card>
    </form>
  );
};

export default LoginForm;
