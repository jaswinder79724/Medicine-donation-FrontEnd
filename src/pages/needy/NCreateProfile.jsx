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

  // ✅ image states
  const [image, setImage] = useState(null);
  const [proofImage, setProofImage] = useState(null);

  // ✅ preview
  const [preview1, setPreview1] = useState(null);
  const [preview2, setPreview2] = useState(null);

  // ✅ submit
  const handleSubmit = async () => {
    try {
      if (!form.name || !form.mobile_no || !form.disease) {
        return toast.error("Please fill required fields");
      }

      setLoading(true);

      const formData = new FormData();

      // add fields
      for (let key in form) {
        formData.append(key, form[key]);
      }

      // add images
      if (image) formData.append("image", image);
      if (proofImage) formData.append("diseaseProofImage", proofImage);

      const res = await API.post("/needy/save", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Profile Created ✅");
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

        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Create Needy Profile
        </h2>

        {/* BASIC */}
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
            value={form.full_address}
            onChange={(e)=>setForm({...form,full_address:e.target.value})}
            className="w-full border p-2 rounded"
          />
        </Section>

        {/* MEDICAL */}
        <Section title="Medical Information">
          <Input label="Disease" value={form.disease} onChange={(v)=>setForm({...form,disease:v})} />
          <Input label="Medicine" value={form.medicine} onChange={(v)=>setForm({...form,medicine:v})} />

          <textarea
            value={form.note}
            onChange={(e)=>setForm({...form,note:e.target.value})}
            className="w-full border p-2 rounded mt-2"
            placeholder="Note"
          />
        </Section>

        {/* ✅ IMAGE UPLOAD */}
        <div className="mt-4">
          <label className="text-sm">Profile Image</label>
          <input
            type="file"
            onChange={(e)=>{
              const file=e.target.files[0];
              setImage(file);
              if(file) setPreview1(URL.createObjectURL(file));
            }}
          />
          {preview1 && <img src={preview1} className="w-20 mt-2 rounded-full" />}
        </div>

        <div className="mt-4">
          <label className="text-sm">Disease Proof</label>
          <input
            type="file"
            onChange={(e)=>{
              const file=e.target.files[0];
              setProofImage(file);
              if(file) setPreview2(URL.createObjectURL(file));
            }}
          />
          {preview2 && <img src={preview2} className="w-20 mt-2 rounded" />}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-green-500 text-white p-3 rounded"
        >
          {loading ? "Saving..." : "Save"}
        </button>

      </div>
    </div>
  );
};

/* components */

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm text-gray-500 mb-2">{title}</h3>
    <div className="grid gap-3">{children}</div>
  </div>
);

const Input = ({ label, value, onChange }) => (
  <input
    value={value || ""}
    onChange={(e)=>onChange(e.target.value)}
    placeholder={label}
    className="border p-2 rounded"
  />
);

export default NCreateProfile;