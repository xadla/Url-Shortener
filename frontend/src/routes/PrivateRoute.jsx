import { Navigate, useLocation } from 'react-router-dom';

import useAuth from '../auth/AuthContext';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/login?backUrl=${encodeURIComponent(location.pathname)}`} replace />;
  }

  return children;
}

export default PrivateRoute;
