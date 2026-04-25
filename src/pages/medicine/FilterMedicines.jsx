import { useState, useEffect } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const FilterMedicines = () => {
  const [search, setSearch] = useState({ name: "", city: "" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [searched, setSearched] = useState(false);

  // ✅ PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ FETCH ALL
  const fetchAllMedicines = async () => {
    try {
      setLoading(true);
      const res = await API.get("/medicine/all");
      setData(res.data.data);
      setCurrentPage(1); // reset page
    } catch (err) {
      toast.error("Failed to load medicines");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMedicines();
  }, []);

  // ✅ SEARCH
  const handleSearch = async () => {
    try {
      setLoading(true);
      setSearched(true);

      const res = await API.get(
        `/medicine/filter?name=${search.name}&city=${search.city}`
      );

      setData(res.data.data);
      setCurrentPage(1); // reset page

    } catch (err) {
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ RESET
  const handleReset = () => {
    setSearch({ name: "", city: "" });
    setSearched(false);
    fetchAllMedicines();
  };

  // ✅ PAGINATION LOGIC
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentData = data.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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

        {/* Search */}
        <div className="bg-white border rounded-xl p-5 shadow-sm mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">

          <input
            placeholder="Medicine name..."
            value={search.name}
            className="border rounded-lg px-3 py-2"
            onChange={(e) =>
              setSearch({ ...search, name: e.target.value })
            }
          />

          <input
            placeholder="City..."
            value={search.city}
            className="border rounded-lg px-3 py-2"
            onChange={(e) =>
              setSearch({ ...search, city: e.target.value })
            }
          />

          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            {loading ? "Searching..." : "Search"}
          </button>

          <button
            onClick={handleReset}
            className="bg-gray-200 rounded-lg px-4 py-2"
          >
            Reset
          </button>

        </div>

        {/* Results */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : data.length === 0 ? (
          searched ? (
            <p className="text-center">No results found</p>
          ) : (
            <p className="text-center">No medicines available</p>
          )
        ) : (
          <>
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {currentData.map((m) => {
                const isExpired =
                  m.expiryDate && new Date(m.expiryDate) < new Date();

                return (
                  <div key={m._id} className="bg-white border rounded-xl p-5 shadow-sm">

                    <h3 className="font-semibold mb-2">{m.name}</h3>

                    <p>Qty: {m.quantity || "—"}</p>

                    <p className={isExpired ? "text-red-500" : ""}>
                      Exp: {m.expiryDate || "—"}
                    </p>

                    <p>City: {m.location?.city || "—"}</p>

                    <button
                      onClick={() => {
                        if (!m.donor) {
                          toast.error("Donor info not available");
                          return;
                        }

                        setSelectedDonor({
                          ...m.donor,
                          email: m.userId?.email
                        });
                      }}
                      className="mt-3 w-full bg-green-500 text-white py-2 rounded"
                    >
                      Contact Donor
                    </button>

                  </div>
                );
              })}
            </div>

            {/* 🔥 PAGINATION UI */}
            <div className="flex justify-center mt-8 gap-2 flex-wrap">

              <button
                onClick={() => setCurrentPage((p) => p - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500 text-white"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => p + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded"
              >
                Next
              </button>

            </div>
          </>
        )}

      </div>

      {/* Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl">

            <h3>Donor Details</h3>
            <p>Email: {selectedDonor.email}</p>
            <p>Name: {selectedDonor.name}</p>
            <p>Phone: {selectedDonor.mobile_no}</p>

            <button onClick={() => setSelectedDonor(null)}>
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMedicines;