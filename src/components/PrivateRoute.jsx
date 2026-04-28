import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ❌ Role mismatch
  if (role && user?.role !== role) {
    toast.error("You are not authorized to access this page");
    return <Navigate to="/unauthorized" />;
  }

  // ✅ Allowed
  return children;
};

export default PrivateRoute;