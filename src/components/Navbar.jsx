import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, logout } from "../utils/auth";
import { toast } from "react-toastify";

const Navbar = () => {
  const [user, setUser] = useState(getUser());
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => setUser(getUser());
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // ✅ DASHBOARD CLICK HANDLER
  const handleDashboardClick = () => {
    if (!user?.isProfileComplete) {
      toast.error("Please complete your profile");

      if (user.role === "donor") {
        return navigate("/donor-profile-create");
      }
      if (user.role === "needy") {
        return navigate("/needy-profile-create");
      }
    }

    // ✅ अगर profile complete है
    if (user.role === "donor") return navigate("/donor-dashboard");
    if (user.role === "needy") return navigate("/needy-dashboard");
    if (user.role === "admin") return navigate("/admin-dashboard");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">

      <div className="max-w-7xl mx-auto flex justify-between items-center">

        <h2 className="text-lg font-bold text-blue-600">
          💊 MediCare
        </h2>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <span className="text-sm text-gray-500">
                {user.email} ({user.role})
              </span>

              {/* 🔥 DASHBOARD BUTTON */}
              <button
                onClick={handleDashboardClick}
                className="hover:text-blue-500"
              >
                Dashboard
              </button>

              {/* EXTRA LINKS (only if profile complete) */}
              {user.role === "donor" && user.isProfileComplete && (
                <>
                  <Link to="/add-medicine">Add Medicine</Link>
                  <Link to="/my-medicines">My Medicines</Link>
                </>
              )}

              {user.role === "needy" && user.isProfileComplete && (
                <Link to="/search-medicines">Search</Link>
              )}

              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3">

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-500">
                {user.email} ({user.role})
              </p>

              <button onClick={handleDashboardClick}>
                Dashboard
              </button>

              {user.role === "donor" && user.isProfileComplete && (
                <>
                  <Link to="/add-medicine">Add Medicine</Link>
                  <Link to="/my-medicines">My Medicines</Link>
                </>
              )}

              {user.role === "needy" && user.isProfileComplete && (
                <Link to="/search-medicines">Search Medicines</Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;