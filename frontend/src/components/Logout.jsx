import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import useAuth from '../auth/AuthContext';

const LogoutButton = ({ classes }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.data.message === "Success") {
        toast.success("You are Logged out now");
        navigate('/');
      } else if (result.data.message === "Failed") {
        toast.warning("You are not Login yet!");
      } else {
        toast.error("There is something wrong please try again!");
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout} className={classes}>
      Logout
    </button>
  );
};

export default LogoutButton;
