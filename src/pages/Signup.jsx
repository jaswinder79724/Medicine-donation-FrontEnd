import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { useNavigate ,Link} from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "donor",
  });

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await API.post("/Auth/singup", form);

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Signup Success");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="bg-white p-8 rounded-2xl shadow-lg ">
        
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Account 🚀
        </h2>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="donor">Donor</option>
            <option value="needy">Needy</option>
          </select>

          <button
            onClick={handleSignup}
            className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition duration-300 font-semibold"
          >
            Signup
          </button>

        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <span className="text-green-500 cursor-pointer"> <Link to="/login">Login</Link></span>
        </p>

      </div>

    </div>

  );
};

export default Signup;