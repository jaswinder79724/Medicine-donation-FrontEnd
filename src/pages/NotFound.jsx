import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="text-center bg-white p-8 rounded-xl shadow-md">

        <h1 className="text-4xl font-bold text-red-500 mb-2">
          404
        </h1>

        <h2 className="text-xl font-semibold mb-2">
          Page Not Found
        </h2>

        <p className="text-gray-500 mb-4">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Go Home
        </Link>

      </div>

    </div>
  );
};

export default NotFound;