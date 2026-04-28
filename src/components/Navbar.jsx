import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, logout } from "../utils/auth";
import { toast } from "react-toastify";
import { Home, LogIn, UserPlus, LogOut, Menu, X, Pill } from "lucide-react";

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

  const handleDashboardClick = () => {
    if (!user?.isProfileComplete) {
      toast.error("Please complete your profile");

      if (user.role === "donor") return navigate("/donor-profile-create");
      if (user.role === "needy") return navigate("/needy-profile-create");
    }

    if (user.role === "donor") return navigate("/donor-dashboard");
    if (user.role === "needy") return navigate("/needy-dashboard");
    if (user.role === "admin") return navigate("/admin-dashboard");
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b shadow-sm sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
          <Pill size={22} />
          MediCare
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6">

          {!user ? (
            <>
              <Link className="flex items-center gap-1 hover:text-blue-500" to="/login">
                <LogIn size={18} /> Login
              </Link>

              <Link className="flex items-center gap-1 hover:text-blue-500" to="/signup">
                <UserPlus size={18} /> Signup
              </Link>
            </>
          ) : (
            <>
              {/* USER INFO */}
              <div className="text-sm text-gray-500">
                {user.email}
              </div>

              {/* DASHBOARD */}
              <button
                onClick={handleDashboardClick}
                className="flex items-center gap-1 hover:text-blue-600 font-medium"
              >
                <Home size={18} /> Dashboard
              </button>

              {/* DONOR LINKS
              {user.role === "donor" && user.isProfileComplete && (
                <>
                  <Link className="hover:text-blue-500" to="/add-medicine">
                    Add
                  </Link>
                  <Link className="hover:text-blue-500" to="/my-medicines">
                    My Medicines
                  </Link>
                </>
              )} */}

              {/* NEEDY */}
              {/* {user.role === "needy" && user.isProfileComplete && (
                <Link className="hover:text-blue-500" to="/search-medicines">
                  Search
                </Link>
              )} */}

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE ICON */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 animate-fadeIn">

          {!user ? (
            <>
              <Link onClick={() => setMenuOpen(false)} to="/login" className="flex items-center gap-2">
                <LogIn size={18} /> Login
              </Link>

              <Link onClick={() => setMenuOpen(false)} to="/signup" className="flex items-center gap-2">
                <UserPlus size={18} /> Signup
              </Link>
            </>
          ) : (
            <>
              <div className="text-sm text-gray-500">{user.email}</div>

              <button onClick={handleDashboardClick} className="flex items-center gap-2">
                <Home size={18} /> Dashboard
              </button>

              {user.role === "donor" && user.isProfileComplete && (
                <>
                  <Link onClick={() => setMenuOpen(false)} to="/add-medicine">
                    Add Medicine
                  </Link>
                  <Link onClick={() => setMenuOpen(false)} to="/my-medicines">
                    My Medicines
                  </Link>
                </>
              )}

              {user.role === "needy" && user.isProfileComplete && (
                <Link onClick={() => setMenuOpen(false)} to="/search-medicines">
                  Search Medicines
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-2 rounded-lg flex justify-center items-center gap-2"
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;