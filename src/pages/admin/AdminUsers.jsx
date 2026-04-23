import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/admin/users");

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      setUsers(res.data.data);

    } catch (err) {
      toast.error(err.response?.data?.message || "Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleBlock = async (id) => {
    try {
      const res = await API.put(`/admin/block/${id}`);

      if (!res.data.success) {
        return toast.error(res.data.message);
      }

      toast.success(res.data.message);
      fetchUsers();

    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="max-w-5xl mx-auto bg-white border rounded-xl shadow-sm p-6">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            All Users
          </h2>
          <p className="text-sm text-gray-500">
            Manage user access and status
          </p>
        </div>

        {/* Empty State */}
        {users.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            No users found
          </p>
        ) : (

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3">Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b hover:bg-gray-50">

                    <td className="py-3 text-gray-800">{u.email}</td>

                    <td className="capitalize text-gray-600">
                      {u.role}
                    </td>

                    <td>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          u.isBlocked
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {u.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    <td className="text-right">
                      <button
                        onClick={() => handleBlock(u._id)}
                        className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                          u.isBlocked
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-red-500 text-white hover:bg-red-600"
                        }`}
                      >
                        {u.isBlocked ? "Unblock" : "Block"}
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminUsers;