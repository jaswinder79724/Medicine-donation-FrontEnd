import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, logout } from "../utils/auth";

const Navbar = () => {
  const [user, setUser] = useState(getUser());

  // 🔥 important: listen changes
  useEffect(() => {
    const checkUser = () => {
      setUser(getUser());
    };

    window.addEventListener("storage", checkUser);

    return () => {
      window.removeEventListener("storage", checkUser);
    };
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px", background: "#eee" }}>
      
      <h3>💊 MediCare</h3>

      {!user ? (
        <div>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Signup</Link>
        </div>
      ) : (
        <div>
          <span>
            {user.email} ({user.role})
          </span>

          {" | "}

          {user.role === "donor" && <Link to="/donor-dashboard">Dashboard</Link>}
          {user.role === "needy" && <Link to="/needy-dashboard">Dashboard</Link>}
          {user.role === "admin" && <Link to="/admin-dashboard">Admin</Link>}

          {" | "}

          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;