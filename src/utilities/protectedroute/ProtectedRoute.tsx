// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../custom hooks/Hooks";
import LoadingBox from "../message loading/LoadingBox";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const { state, isAuthenticated, isAdmin } = useAppContext();
  const location = useLocation();

  // Show loading while checking authentication
  if (state.loading) {
    return <LoadingBox />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Redirect to unauthorized if admin access required but user is not admin
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
