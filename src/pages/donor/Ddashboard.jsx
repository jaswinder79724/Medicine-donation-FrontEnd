import { useNavigate } from "react-router-dom";

function Ddashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Donor Dashboard
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your donations and profile
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          

          {/* My Profile */}
          <Card
            title="My Profile"
            desc="View your donor details"
            onClick={() => navigate("/donor-profile")}
          />

         

          {/* Add Medicine */}
          <Card
            title="Add Medicine"
            desc="Donate new medicines"
            onClick={() => navigate("/add-medicine")}
          />

          {/* My Medicines */}
          <Card
            title="My Medicines"
            desc="Manage your posted medicines"
            onClick={() => navigate("/my-medicines")}
          />

          {/* change password */}
          <Card
            title="Settings"
            desc="change youre password"
            onClick={() => navigate("/update-password")}
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

export default Ddashboard;