import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DEditProfile = () => {
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await API.get("/donor/get");
      setForm(res.data.data);
      setPreview(res.data.data.image); // existing image
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      // add fields
      for (let key in form) {
        formData.append(key, form[key]);
      }

      // add image if new selected
      if (image) {
        formData.append("image", image);
      }

      const res = await API.put("/donor/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Profile Updated ✅");
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

        {/* ✅ IMAGE */}
        <div className="flex items-center gap-4 mb-8">
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-20 h-20 rounded-full object-cover border"
            />
          )}

          <input type="file" onChange={handleImageChange} />
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
            className="w-full border rounded-lg px-3 py-2"
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

          <textarea
            value={form.note || ""}
            onChange={(e) =>
              setForm({ ...form, note: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2 mt-4"
            placeholder="Note"
          />
        </div>

        {/* ACTION */}
        <div className="flex justify-end gap-3">

          <button
            onClick={() => navigate("/donor-profile")}
            className="px-5 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="px-5 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update"}
          </button>

        </div>

      </div>

    </div>
  );
};

/* Input */
const Input = ({ label, value, onChange }) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    <input
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-lg px-3 py-2"
    />
  </div>
);

export default DEditProfile;