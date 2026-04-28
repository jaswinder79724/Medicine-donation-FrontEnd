import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Already logged in → redirect to dashboard
  if (token) {
    if (user?.role === "donor") return <Navigate to="/donor-dashboard" />;
    if (user?.role === "needy") return <Navigate to="/needy-dashboard" />;
    if (user?.role === "admin") return <Navigate to="/admin-dashboard" />;
  }

  // ❌ Not logged in → allow access
  return children;
};

export default PublicRoute;