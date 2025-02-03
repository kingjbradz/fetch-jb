import Box from "@mui/material/Box";
import LoginComponent from "../Components/LoginComponent.tsx";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <LoginComponent />
    </Box>
  );
};

export default Login;
