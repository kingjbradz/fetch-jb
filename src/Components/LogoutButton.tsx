import Button from '@mui/material/Button';
import useLogout from '../Helpers/Hooks/useLogout';
import { useNavigate } from 'react-router';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending } = useLogout();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser(); // No arguments passed
    navigate("/login"); // Redirect after logout
  };

  return (
    <Button color="inherit" onClick={handleLogout} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
