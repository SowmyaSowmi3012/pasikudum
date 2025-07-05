import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth();

  if (loading) return null;               // or a spinner component

  if (!user)       return <Navigate to="/" />;
  if (!isAdmin)    return <Navigate to="/" />;     // not admin

  return children;                       // authorized
};

export default AdminRoute;
