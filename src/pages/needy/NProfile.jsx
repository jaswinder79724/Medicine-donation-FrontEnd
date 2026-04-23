import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

const NProfile = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await API.get("/needy/get");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">

      <div className="w-full max-w-3xl bg-white border rounded-xl shadow-sm p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            My Profile
          </h2>

          <Link
            to="/needy-edit"
            className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit
          </Link>
        </div>

        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Field label="Name" value={data.name} />
          <Field label="Gender" value={data.gender} />
          <Field label="Mobile" value={data.mobile_no} />
          <Field label="State" value={data.state} />
          <Field label="City" value={data.city} />
        </Section>

        {/* ADDRESS */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase">
            Address
          </h3>

          <div className="bg-gray-50 border rounded-lg p-4 text-gray-800">
            {data.full_address || "—"}
          </div>
        </div>

        {/* MEDICAL INFO */}
        <Section title="Medical Information">
          <Field label="Disease" value={data.disease} />
          <Field label="Medicine Needed" value={data.medicine} />
        </Section>

        {/* NOTE */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase">
            Note
          </h3>

          <div className="bg-gray-50 border rounded-lg p-4 text-gray-800">
            {data.note || "—"}
          </div>
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

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-gray-800">{value || "—"}</p>
  </div>
);

export default NProfile;