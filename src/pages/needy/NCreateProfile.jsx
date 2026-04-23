import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NCreateProfile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    gender: "",
    mobile_no: "",
    state: "",
    city: "",
    full_address: "",
    disease: "",
    medicine: "",
    note: "",
  });

  const handleSubmit = async () => {
    try {
      // Basic validation
      if (!form.name || !form.mobile_no || !form.disease) {
        return toast.error("Please fill required fields");
      }

      setLoading(true);

      const res = await API.post("/needy/save", form);

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Profile Created");
      navigate("/needy-dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
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
            Create Needy Profile
          </h2>
          <p className="text-sm text-gray-500">
            Provide details to request medical help
          </p>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          
          <Select
            label="Gender"
            value={form.gender}
            onChange={(v) => setForm({ ...form, gender: v })}
            options={["Male", "Female", "Other"]}
          />

          <Input label="Mobile" value={form.mobile_no} onChange={(v) => setForm({ ...form, mobile_no: v })} />
          <Input label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
          <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <textarea
            value={form.full_address}
            onChange={(e) =>
              setForm({ ...form, full_address: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter full address"
          />
        </Section>

        {/* MEDICAL INFO */}
        <Section title="Medical Information">
          <Input label="Disease" value={form.disease} onChange={(v) => setForm({ ...form, disease: v })} />
          <Input label="Medicine Needed" value={form.medicine} onChange={(v) => setForm({ ...form, medicine: v })} />

          <div className="col-span-2">
            <label className="text-xs text-gray-500 mb-1 block">Note</label>
            <textarea
              value={form.note}
              onChange={(e) =>
                setForm({ ...form, note: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Additional details"
            />
          </div>
        </Section>

        {/* ACTION */}
        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() => navigate("/needy-dashboard")}
            className="px-5 py-2 border rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
};

/* Reusable Components */

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase">
      {title}
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  </div>
);

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

const Select = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
    >
      <option value="">Select {label}</option>
      {options.map((opt, i) => (
        <option key={i} value={opt.toLowerCase()}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default NCreateProfile;