import Button from '@mui/material/Button';
import { useLogout } from '../Helpers/Hooks';
import { useNavigate } from 'react-router';

const LogoutButton = () => {
  const navigate = useNavigate()
  const { mutate: logoutUser, isPending, error } = useLogout();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    logoutUser(null, {
      onSuccess: () => {
        // setIsLoggedIn(false);
        navigate("/login");
      },
      onError: (err) => alert(err), // Handle error properly
    });
  };
  return (
    <Button color="inherit">Logout</Button>
  )
}

export default LogoutButton