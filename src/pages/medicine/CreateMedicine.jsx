import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const CreateMedicine = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
    description: "",
    state: "",
    city: "",
  });

  const [image, setImage] = useState(null); // ✅ new state

  const handleSubmit = async () => {
    try {
      if (!form.name || !form.quantity || !form.expiryDate) {
        return toast.error("Please fill required fields");
      }

      setLoading(true);

      // ✅ FormData create
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("quantity", form.quantity);
      formData.append("expiryDate", form.expiryDate);
      formData.append("description", form.description);
      formData.append("state", form.state);
      formData.append("city", form.city);

      // ✅ image append
      if (image) {
        formData.append("image", image);
      }

      const res = await API.post("/medicine/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Medicine Added");

      // reset
      setForm({
        name: "",
        quantity: "",
        expiryDate: "",
        description: "",
        state: "",
        city: "",
      });

      setImage(null);

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">

      <div className="w-full max-w-2xl bg-white border rounded-xl shadow-sm p-8">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Add Medicine
          </h2>
          <p className="text-sm text-gray-500">
            Enter medicine details for donation
          </p>
        </div>

        {/* FORM */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <Input label="Medicine Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />

          <Input label="Quantity" value={form.quantity} onChange={(v) => setForm({ ...form, quantity: v })} />

          <div>
            <label className="text-xs text-gray-500 mb-1 block">Expiry Date</label>
            <input
              type="date"
              value={form.expiryDate}
              onChange={(e) =>
                setForm({ ...form, expiryDate: e.target.value })
              }
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <Input label="State" value={form.state} onChange={(v) => setForm({ ...form, state: v })} />
          <Input label="City" value={form.city} onChange={(v) => setForm({ ...form, city: v })} />

        </div>

        {/* ✅ IMAGE UPLOAD */}
        <div className="mt-6">
          <label className="text-xs text-gray-500 mb-1 block">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="text-xs text-gray-500 mb-1 block">
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            placeholder="Additional details"
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
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

export default CreateMedicine;