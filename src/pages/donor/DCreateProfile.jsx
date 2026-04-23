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

  const handleChange=(e)=>{
    const{name,value}=e.target
    setForm({...form,[name]:value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const formData = new FormData();

      // for (let key in form) {
      //   formData.append(key, form[key]);
      // }

 
      const res = await API.post("/donor/save", form);

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Profile Created");
      navigate("/donor-dashboard");

    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
     <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">

        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Create Donor Profile ❤️
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              value={form.name}
              placeholder="Enter name"
              className="  w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={handleChange}
              name="name"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Gender</label>
            <input
              value={form.gender}
              placeholder="Enter gender"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
               onChange={handleChange}
               name="gender"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Mobile</label>
            <input
              value={form.mobile_no}
              placeholder="Enter mobile number"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
               onChange={handleChange}
               name="mobile_no"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">State</label>
            <input
              value={form.state}
              placeholder="Enter state"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
               onChange={handleChange}
               name="state"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">City</label>
            <input
              value={form.city}
              placeholder="Enter city"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
               onChange={handleChange}
               name="city"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Donation Type</label>
            <input
              value={form.donationType}
              placeholder="Medicine / Money / Other"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
               onChange={handleChange}
               name="donationType"
            />
          </div>

        </div>

        <div className="mt-4">
          <label className="text-sm text-gray-600">Full Address</label>
          <textarea
            value={form.full_address}
            placeholder="Enter full address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
             onChange={handleChange}
             name="full_address"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm text-gray-600">Note</label>
          <textarea
            value={form.note}
            placeholder="Any additional note"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
             onChange={handleChange}
             name="note"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition font-semibold"
          
        >

          Save Profile
        </button>

      </div>

    </div>
  );
};

export default DCreateProfile;