import Button from '@mui/material/Button';
import { useLogout } from '../Helpers/Hooks';
import { useNavigate } from 'react-router';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { mutate: logoutUser, isPending, error } = useLogout();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutUser(null, {
      onSuccess: () => {
        // Redirect to login page
        navigate("/login");
      },
      onError: (err) => alert(err), // Handle error properly
    });
  };

  return (
    <Button color="inherit" onClick={handleLogout} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
