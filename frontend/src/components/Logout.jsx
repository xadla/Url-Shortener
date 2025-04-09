import React from 'react';
import Logout from '../auth/logout';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ( {classes} ) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Logout();
      // Optionally clear any local state or auth context
      navigate('/');
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
