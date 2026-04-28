const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow text-center">
        
        <h2 className="text-xl font-bold text-red-500 mb-2">
          Access Denied 🚫
        </h2>

        <p className="text-gray-600">
          You are not allowed to view this page.
        </p>

      </div>

    </div>
  );
};

export default Unauthorized;