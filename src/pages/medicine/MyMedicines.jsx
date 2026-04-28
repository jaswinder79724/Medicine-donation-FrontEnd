import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const MyMedicines = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await API.get("/medicine/my");
      setData(res.data.data);
    } catch (err) {
      toast.error("Failed to load medicines");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await API.delete(`/medicine/delete/${id}`);

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success("Deleted");
      fetchData();

    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
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
            My Medicines
          </h2>
          <p className="text-sm text-gray-500">
            Manage your donated medicines
          </p>
        </div>

        {/* Empty */}
        {data.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No medicines added yet
          </p>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.map((m) => {
              const isExpired =
                m.expiryDate && new Date(m.expiryDate) < new Date();

              return (
                <div
                  key={m._id}
                  className="bg-white border rounded-xl shadow-sm overflow-hidden flex flex-col justify-between"
                >

                  {/* ✅ IMAGE */}
                  {m.image ? (
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-40 object-cover"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="p-4 flex flex-col flex-grow">

                    <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                      {m.name}
                    </h3>

                    <div className="space-y-2 text-sm flex-grow">

                      <p className="text-gray-600">
                        📦 <span className="text-gray-400">Quantity:</span>{" "}
                        {m.quantity || "—"}
                      </p>

                      <p
                        className={`${
                          isExpired ? "text-red-500" : "text-gray-600"
                        }`}
                      >
                        📅 <span className="text-gray-400">Expiry:</span>{" "}
                        {m.expiryDate
                          ? new Date(m.expiryDate).toLocaleDateString()
                          : "—"}
                      </p>

                      <p className="text-gray-600">
                        📍 <span className="text-gray-400">Location:</span>{" "}
                        {m.location?.city || "—"},{" "}
                        {m.location?.state || "—"}
                      </p>

                      <p className="text-gray-600">
                        📝 <span className="text-gray-400">Description:</span>{" "}
                        {m.description || "—"}
                      </p>

                    </div>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg text-sm hover:bg-red-600 transition"
                    >
                      Delete
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
};

export default MyMedicines;