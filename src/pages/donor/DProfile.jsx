import { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

const DProfile = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const res = await API.get("/donor/get");
    setData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
         <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">

      <div className="w-full max-w-3xl bg-white rounded-xl shadow-sm border p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            My Profile
          </h2>

          <Link
            to="/donor-edit"
            className="text-sm bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit
          </Link>
        </div>

        {/* Section: Basic Info */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
            Basic Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">

            <div>
              <p className="text-xs text-gray-400">Name</p>
              <p className="text-gray-800">{data.name}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Gender</p>
              <p className="text-gray-800">{data.gender}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Mobile</p>
              <p className="text-gray-800">{data.mobile_no}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">State</p>
              <p className="text-gray-800">{data.state}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">City</p>
              <p className="text-gray-800">{data.city}</p>
            </div>

          </div>
        </div>

        {/* Section: Address */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
            Address
          </h3>

          <div className="bg-gray-50 border rounded-lg p-4 text-gray-800">
            {data.full_address}
          </div>
        </div>

        {/* Section: Donation */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-4 uppercase tracking-wide">
            Donation Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-4">

            <div>
              <p className="text-xs text-gray-400">Donation Type</p>
              <p className="text-gray-800">{data.donationType}</p>
            </div>

          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Note</p>
            <div className="bg-gray-50 border rounded-lg p-4 text-gray-800">
              {data.note || "—"}
            </div>
          </div>
        </div>

      </div>

    </div>    
  );
};

export default DProfile;