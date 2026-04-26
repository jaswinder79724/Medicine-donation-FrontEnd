import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      const res = await API.post(`/Auth/reset-password/${token}`, {
        newPassword: password
      });

      if (res.data.success) {
        toast.success("Password updated");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Reset failed");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="New password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default ResetPassword;