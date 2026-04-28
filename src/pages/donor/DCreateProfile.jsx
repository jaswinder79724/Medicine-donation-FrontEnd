import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const DCreateProfile = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    gender: "",
    mobile_no: "",
    state: "",
    city: "",
    full_address: "",
    donationType: "",
    note: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // add text fields
      for (let key in form) {
        formData.append(key, form[key]);
      }

      // add image
      if (image) {
        formData.append("image", image);
      }

      const res = await API.post("/donor/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Profile Created ✅");
      const user = JSON.parse(localStorage.getItem("user"));

localStorage.setItem(
  "user",
  JSON.stringify({
    ...user,
    isProfileComplete: true
  })
);

// 🔥 trigger navbar update
window.dispatchEvent(new Event("storage"));
      navigate("/donor-dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Donor Profile ❤️
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              value={form.name}
              placeholder="Name"
              className="p-3 border rounded-lg"
              onChange={handleChange}
              name="name"
            />

            <input
              value={form.gender}
              placeholder="Gender"
              className="p-3 border rounded-lg"
              onChange={handleChange}
              name="gender"
            />

            <input
              value={form.mobile_no}
              placeholder="Mobile"
              className="p-3 border rounded-lg"
              onChange={handleChange}
              name="mobile_no"
            />

            <input
              value={form.state}
              placeholder="State"
              className="p-3 border rounded-lg"
              onChange={handleChange}
              name="state"
            />

            <input
              value={form.city}
              placeholder="City"
              className="p-3 border rounded-lg"
              onChange={handleChange}
              name="city"
            />

            <input
              value={form.donationType}
              placeholder="Donation Type"
              className="p-3 border rounded-lg"
              onChange={handleChange}
              name="donationType"
            />

          </div>

          <textarea
            value={form.full_address}
            placeholder="Full Address"
            className="w-full p-3 border rounded-lg mt-4"
            onChange={handleChange}
            name="full_address"
          />

          <textarea
            value={form.note}
            placeholder="Note"
            className="w-full p-3 border rounded-lg mt-4"
            onChange={handleChange}
            name="note"
          />

          {/* ✅ IMAGE INPUT */}
          <div className="mt-4">
            <label className="text-sm text-gray-600">Upload Photo</label>
            <input
              type="file"
              className="w-full p-2 border rounded-lg"
              onChange={handleImageChange}
            />
          </div>

          {/* ✅ PREVIEW */}
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-24 h-24 mt-3 rounded-full object-cover"
            />
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Save Profile
          </button>

        </form>
      </div>
    </div>
  );
};

export default DCreateProfile;