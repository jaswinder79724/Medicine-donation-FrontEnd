import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DEditProfile = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await API.get("/donor/get");
      setForm(res.data.data);
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await API.put("/donor/edit", form);

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Profile Updated");
      navigate("/donor-profile");

    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">

      <div className="w-full max-w-3xl bg-white border rounded-xl shadow-sm p-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Edit Profile
          </h2>
          <p className="text-sm text-gray-500">
            Update your personal and donation details
          </p>
        </div>

        {/* BASIC INFO */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input label="Gender" value={form.gender} onChange={(v) => setForm({ ...form, gender: v })} />
            <Input label="Mobile" value={form.mobile_no} onChange={(v) => setForm({ ...form, mobile_no: v })} />
            <Input label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
            <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />

          </div>
        </div>

        {/* ADDRESS */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase">
            Address
          </h3>

          <textarea
            value={form.full_address || ""}
            onChange={(e) =>
              setForm({ ...form, full_address: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter full address"
          />
        </div>

        {/* DONATION */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase">
            Donation Details
          </h3>

          <Input
            label="Donation Type"
            value={form.donationType}
            onChange={(v) => setForm({ ...form, donationType: v })}
          />

          <div className="mt-4">
            <label className="text-xs text-gray-500 mb-1 block">Note</label>
            <textarea
              value={form.note || ""}
              onChange={(e) =>
                setForm({ ...form, note: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Add note"
            />
          </div>
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3">

          <button
            onClick={() => navigate("/donor-profile")}
            className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </div>

    </div>
  );
};

/* Reusable Input */
const Input = ({ label, value, onChange }) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={`Enter ${label.toLowerCase()}`}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);

export default DEditProfile;