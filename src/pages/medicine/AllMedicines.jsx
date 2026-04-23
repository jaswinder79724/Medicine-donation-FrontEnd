import { useEffect, useState } from "react";
import API from "../../services/api";

const AllMedicines = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDonor, setSelectedDonor] = useState(null); // modal state
  console.log(selectedDonor)

  const fetchData = async () => {
    try {
      const res = await API.get("/medicine/all");
      setData(res.data.data);
    
      
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading medicines...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Available Medicines
          </h2>
          <p className="text-sm text-gray-500">
            Browse medicines shared by donors
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {data.map((m) => {
            const isExpired =
              m.expiryDate && new Date(m.expiryDate) < new Date();

            return (
              <div
                key={m._id}
                className="bg-white border rounded-xl p-5 shadow-sm hover:shadow transition flex flex-col justify-between"
              >

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg">
                    {m.name}
                  </h3>

                  <p className="text-sm text-gray-600 mb-1">
                    📦 Qty: {m.quantity || "—"}
                  </p>

                  <p
                    className={`text-sm mb-1 ${
                      isExpired ? "text-red-500" : "text-gray-600"
                    }`}
                  >
                    📅 Exp:{" "}
                    {m.expiryDate
                      ? new Date(m.expiryDate).toLocaleDateString()
                      : "—"}
                  </p>

                  <p className="text-sm text-gray-600 mb-1">
                    📍 {m.city || m.location?.city || "—"}, {m.state || ""}
                  </p>

                  <p className="text-sm text-gray-500 mb-2">
                    {m.description || "No description"}
                  </p>

                  <p className="text-xs text-gray-400">
                    Donor: {m.userId?.email || "—"}
                  </p>
                </div>

                {/* Contact Button */}
                <button
                 onClick={() => setSelectedDonor({...m.donor, email: m.userId?.email })}
                  className="mt-4 bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition"
                >
                  Contact Donor
                </button>

              </div>
            );
          })}

        </div>
      </div>

      {/* 🔥 Modal */}
{selectedDonor && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

      <h3 className="text-lg font-semibold mb-4">
        Donor Details
      </h3>

         <p>Email: {selectedDonor?.email || "—"}</p>
         <p>Name: {selectedDonor?.name || "—"}</p>
         <p>Phone: {selectedDonor?.mobile_no || "—"}</p>
      <button
        onClick={() => setSelectedDonor(null)}
        className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
      >
        Close
      </button>

    </div>
  </div>
)}
    </div>
  );
};

export default AllMedicines;