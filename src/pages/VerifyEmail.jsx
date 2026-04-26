import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await API.get(`/Auth/verify/${token}`);

        if (res.data.success) {
          setStatus("success");
          setMessage(res.data.message);

          // 🔥 auto redirect
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          setStatus("error");
          setMessage(res.data.message);
        }

      } catch (err) {
        setStatus("error");
        setMessage(err.response?.data?.message || "Something went wrong");
      }
    };

    if (token) verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-2xl shadow-lg text-center w-[350px]">

        {/* 🔄 LOADING */}
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h2 className="text-lg font-semibold text-gray-700">
              Verifying your email...
            </h2>
          </>
        )}

        {/* ✅ SUCCESS */}
        {status === "success" && (
          <>
            <h2 className="text-xl font-bold text-green-600 mb-2">
              Email Verified ✅
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {message || "Redirecting to login..."}
            </p>

            <button
              onClick={() => navigate("/login")}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Go to Login
            </button>
          </>
        )}

        {/* ❌ ERROR */}
        {status === "error" && (
          <>
            <h2 className="text-xl font-bold text-red-500 mb-2">
              Verification Failed ❌
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              {message}
            </p>

            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Back to Signup
            </button>
          </>
        )}

      </div>

    </div>
  );
};

export default VerifyEmail;