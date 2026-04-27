import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NEditProfile = () => {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  // images
  const [image, setImage] = useState(null);
  const [proofImage, setProofImage] = useState(null);

  // preview
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await API.get("/needy/get");
      const data = res.data.data;

      setForm(data);
      setPreview1(data.image);
      setPreview2(data.diseaseProofImage);

    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // image handlers
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview1(URL.createObjectURL(file));
  };

  const handleProof = (e) => {
    const file = e.target.files[0];
    setProofImage(file);
    if (file) setPreview2(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      if (!form.name || !form.mobile_no || !form.disease) {
        return toast.error("Please fill required fields");
      }

      setLoading(true);

      const formData = new FormData();

      // text fields
      for (let key in form) {
        formData.append(key, form[key]);
      }

      // images
      if (image) formData.append("image", image);
      if (proofImage) formData.append("diseaseProofImage", proofImage);

      const res = await API.put("/needy/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Profile Updated ✅");
      navigate("/needy-profile");

    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold mb-6">Edit Needy Profile</h2>

        {/* 🔥 IMAGE SECTION */}
        <div className="flex gap-8 mb-8">

          {/* profile */}
          <div>
            <p className="text-sm mb-2">Profile Image</p>
            {preview1 && (
              <img src={preview1} className="w-24 h-24 rounded-full mb-2 object-cover" />
            )}
            <input type="file" onChange={handleImage} />
          </div>

          {/* proof */}
          <div>
            <p className="text-sm mb-2">Disease Proof</p>
            {preview2 && (
              <img src={preview2} className="w-24 h-24 rounded mb-2 object-cover" />
            )}
            <input type="file" onChange={handleProof} />
          </div>

        </div>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input label="Name" value={form.name} onChange={(v)=>setForm({...form,name:v})} />
          <Input label="Gender" value={form.gender} onChange={(v)=>setForm({...form,gender:v})} />
          <Input label="Mobile" value={form.mobile_no} onChange={(v)=>setForm({...form,mobile_no:v})} />
          <Input label="State" value={form.state} onChange={(v)=>setForm({...form,state:v})} />
          <Input label="City" value={form.city} onChange={(v)=>setForm({...form,city:v})} />
        </Section>

        {/* ADDRESS */}
        <Section title="Address">
          <textarea
            value={form.full_address || ""}
            onChange={(e)=>setForm({...form,full_address:e.target.value})}
            className="w-full border p-3 rounded"
          />
        </Section>

        {/* MEDICAL */}
        <Section title="Medical Information">
          <Input label="Disease" value={form.disease} onChange={(v)=>setForm({...form,disease:v})} />
          <Input label="Medicine" value={form.medicine} onChange={(v)=>setForm({...form,medicine:v})} />

          <textarea
            value={form.note || ""}
            onChange={(e)=>setForm({...form,note:e.target.value})}
            className="w-full border p-3 rounded mt-2"
            placeholder="Additional note"
          />
        </Section>

        {/* BUTTON */}
        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={() => navigate("/needy-profile")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-blue-500 text-white rounded"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

      </div>
    </div>
  );
};

/* reusable */

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
    <div className="grid gap-4">{children}</div>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <input
    value={value || ""}
    onChange={(e)=>onChange(e.target.value)}
    placeholder={label}
    className="border p-3 rounded"
  />
);

export default NEditProfile;