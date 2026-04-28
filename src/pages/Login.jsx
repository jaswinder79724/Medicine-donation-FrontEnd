import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!form.email || !form.password) {
        return toast.error("Please fill all fields");
      }

      setLoading(true);

      const res = await API.post("/Auth/login", form);

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      // ✅ SAVE TOKEN + USER
      localStorage.setItem("token", res.data.Token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: res.data.email,
          role: res.data.role,
          isProfileComplete: res.data.isProfileComplete
        })
      );

      // ✅ trigger navbar update
      window.dispatchEvent(new Event("storage"));

      toast.success("Login Success");

      const role = res.data.role;
      const isComplete = res.data.isProfileComplete;

      // ✅ PROFILE CHECK
      if (!isComplete) {
        if (role === "donor") return navigate("/donor-profile-create");
        if (role === "needy") return navigate("/needy-profile-create");
      }

      // ✅ DASHBOARD
      if (role === "donor") return navigate("/donor-dashboard");
      if (role === "needy") return navigate("/needy-dashboard");
      if (role === "admin") return navigate("/admin-dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome Back 👋
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300 font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <span className="text-blue-500 cursor-pointer">
            <Link to="/signup">Sign up</Link>
          </span>
        </p>

        <p className="text-sm text-blue-500 text-center mt-2">
          <Link to="/forgot-password">Forgot password</Link>
        </p>

      </div>
    </div>
  );
};

export default Login;