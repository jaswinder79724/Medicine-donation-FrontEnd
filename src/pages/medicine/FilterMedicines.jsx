import { useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const FilterMedicines = () => {
  const [search, setSearch] = useState({ name: "", city: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
const [selectedDonor, setSelectedDonor] = useState(null);

  const handleSearch = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/medicine/filter?name=${search.name}&city=${search.city}`
      );

      setData(res.data.data);

    } catch (err) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Search Medicines
          </h2>
          <p className="text-sm text-gray-500">
            Find medicines by name or location
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white border rounded-xl p-5 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            placeholder="Medicine name..."
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) =>
              setSearch({ ...search, name: e.target.value })
            }
          />

          <input
            placeholder="City..."
            className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={(e) =>
              setSearch({ ...search, city: e.target.value })
            }
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Searching..." : "Search"}
          </button>

        </div>

        {/* Results */}
        {data.length === 0 ? (
          <p className="text-center text-gray-500">
            No results found
          </p>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.map((m) => {
              const isExpired =
                m.expiryDate && new Date(m.expiryDate) < new Date();

              return (
                <div
                  key={m._id}
                  className="bg-white border rounded-xl p-5 shadow-sm hover:shadow transition"
                >

                  <h3 className="font-semibold text-gray-800 mb-2">
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

                  <p className="text-sm text-gray-600 mb-2">
                    📍 {m.city || m.location?.city || "—"}
                  </p>

                 <button
  onClick={() =>
    setSelectedDonor({
      ...m.donor,
      email: m.userId?.email
    })
  }
  className="w-full mt-2 bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition"
>
  Contact Donor
</button>

                </div>
              );
            })}

          </div>
        )}

      </div>
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

export default FilterMedicines;