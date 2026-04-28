import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // ❌ Role mismatch
  if (role && user?.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  // ❌ Profile not complete → force redirect
  if (!user?.isProfileComplete) {
    return <ProfileGuard user={user} />;
  }

  return children;
};

// 🔥 Separate component (for toast safe)
const ProfileGuard = ({ user }) => {

  useEffect(() => {
    toast.error("Please complete your profile first");
  }, []);

  if (user?.role === "donor") {
    return <Navigate to="/donor-profile-create" />;
  }

  if (user?.role === "needy") {
    return <Navigate to="/needy-profile-create" />;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;