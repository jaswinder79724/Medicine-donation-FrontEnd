import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

const NProfile = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await API.get("/needy/get");
      console.log("DATA:", res.data.data); // ✅ debug
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
    <div className="min-h-screen bg-gray-100 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Needy Profile</h2>
          <Link
            to="/needy-edit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Edit
          </Link>
        </div>

        {/* PROFILE TOP */}
        <div className="flex items-center gap-6 mb-8">

          {/* PROFILE IMAGE */}
          <div>
            {data.image ? (
              <img
                src={data.image}
                className="w-28 h-28 rounded-full object-cover border"
              />
            ) : (
              <div className="w-28 h-28 bg-gray-200 rounded-full flex items-center justify-center">
                No Image
              </div>
            )}
          </div>

          {/* MAIN INFO */}
          <div>
            <h3 className="text-xl font-semibold">{data.name}</h3>
            <p className="text-gray-500">{data.disease}</p>
            <p className="text-sm text-gray-400">
              {data.city}, {data.state}
            </p>
          </div>

        </div>

        {/* 🔥 DISEASE PROOF FIXED */}
        <div className="mb-8">
          <h3 className="text-sm text-gray-500 mb-2">Disease Proof</h3>

          {data.diseaseProofImage ? (
            <img
              src={data.diseaseProofImage}
              alt="proof"
              className="w-40 h-40 object-cover border rounded-lg"
            />
          ) : (
            <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded">
              No Proof Uploaded
            </div>
          )}
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
        <Section title="Address">
          <Box value={data.full_address} />
        </Section>

        {/* MEDICAL */}
        <Section title="Medical Information">
          <Field label="Disease" value={data.disease} />
          <Field label="Medicine Needed" value={data.medicine} />
        </Section>

        {/* NOTE */}
        <Section title="Additional Note">
          <Box value={data.note} />
        </Section>

      </div>
    </div>
  );
};

/* COMPONENTS */

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-sm text-gray-500 mb-3 uppercase">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  </div>
);

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-400">{label}</p>
    <p className="text-gray-800 font-medium">{value || "—"}</p>
  </div>
);

const Box = ({ value }) => (
  <div className="bg-gray-50 border p-3 rounded col-span-2">
    {value || "—"}
  </div>
);

export default NProfile;