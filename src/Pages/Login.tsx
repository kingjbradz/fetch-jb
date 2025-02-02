import { Box } from "@mui/material";
import LoginComponent from "../Components/LoginComponent.tsx";

const Login = () => {
  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
    }}>
      <LoginComponent />
    </Box>
  )
}

export default Login