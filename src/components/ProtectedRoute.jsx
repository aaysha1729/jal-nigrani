import { Navigate } from 'react-router-dom';
import { useAuth, ROLE_ROUTES } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="w-10 h-10 border-3 border-border border-t-navy rounded-full spinner" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={ROLE_ROUTES[role] || '/login'} replace />;
  }

  return children;
};

export default ProtectedRoute;
