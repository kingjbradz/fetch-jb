import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useQuery } from '@tanstack/react-query';
import PetsIcon from '@mui/icons-material/Pets';
import LogoutButton from './LogoutButton';

export default function ButtonAppBar({ setIsLoggedIn }) {
  const { data: auth } = useQuery({
    queryKey: ["auth"],
    initialData: false, // Assuming 'auth' is a boolean indicating login state
  });
  const { data: user } = useQuery({
    queryKey: ["user"],
    initialData: { name: "", email: "" },
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <PetsIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textTransform: "capitalize" }}>
            {user.name.length > 0 ?  `Hi, ${user?.name}!` : "Welcome! Please log in."}
          </Typography>
          {auth && (
            <LogoutButton setIsLoggedIn={setIsLoggedIn} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}