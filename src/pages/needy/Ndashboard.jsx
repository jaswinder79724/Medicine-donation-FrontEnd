import { useNavigate } from "react-router-dom";

function Ndashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Needy Dashboard
          </h2>
          <p className="text-gray-500 text-sm">
            Find medicines and manage your profile
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Profile */}
          <Card
            title="My Profile"
            desc="View and manage your profile"
            onClick={() => navigate("/needy-profile")}
          />

          
          {/* Search Medicines */}
          <Card
            title="Search Medicines"
            desc="Find medicines by name or city"
            onClick={() => navigate("/search-medicines")}
          />

        

        </div>

      </div>
    </div>
  );
}

/* Reusable Card */
const Card = ({ title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white border rounded-xl p-5 shadow-sm hover:shadow cursor-pointer transition"
  >
    <h3 className="text-lg font-semibold text-gray-800 mb-2">
      {title}
    </h3>
    <p className="text-sm text-gray-500">
      {desc}
    </p>
  </div>
);

export default Ndashboard;