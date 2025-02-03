import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useQuery } from "@tanstack/react-query";
import PetsIcon from "@mui/icons-material/Pets";
import LogoutButton from "./LogoutButton";
import { useNavigate } from "react-router";

const TopBar = () => {
  const navigate = useNavigate();
  const { data: auth } = useQuery({
    queryKey: ["auth"],
    initialData: false, // Assuming 'auth' is a boolean indicating login state
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      const savedUser = localStorage.getItem("auth");
      return savedUser ? JSON.parse(savedUser) : { name: "", email: "" };
    },
    initialData: { name: "", email: "" },
  });
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <PetsIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textTransform: "capitalize" }}
          >
            {user?.name.length > 0 ? `Hi, ${user?.name}!` : "Puppy Match!"}
          </Typography>
          {auth && <LogoutButton />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;