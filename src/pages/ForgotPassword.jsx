import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await API.post("/Auth/forgot-password", { email });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Error sending email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h2>

        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your email to receive reset link
        </p>

        {/* Input */}
        <div className="mt-6">
          <label className="block text-sm text-gray-600 mb-1">
            Email Address
          </label>

          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
        >
          Send Reset Link
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Remember your password?{" "}
           <span className="text-green-500 cursor-pointer">
            <Link to="/login">Login</Link>
                  </span>
        </p>

        

      </div>
    </div>
  );
};

export default ForgotPassword;