import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import DCreateProfile from "./pages/donor/DCreateProfile";
import DProfile from "./pages/donor/DProfile";
import DEditProfile from "./pages/donor/DEditProfile";

import NCreateProfile from "./pages/needy/NCreateProfile";
import NProfile from "./pages/needy/NProfile";
import NEditProfile from "./pages/needy/NEditProfile";

import CreateMedicine from "./pages/medicine/CreateMedicine";
import MyMedicines from "./pages/medicine/MyMedicines";
import FilterMedicines from "./pages/medicine/FilterMedicines";

import AdminUsers from "./pages/admin/AdminUsers";
import Ndashboard from "./pages/needy/Ndashboard";
import Ddashboard from "./pages/donor/Ddashboard";

import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./pages/Unauthorized";
import PublicRoute from "./components/PublicRoute";


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* PUBLIC */}
<Route
  path="/login"
  element={
    <PublicRoute>
      <Login />
    </PublicRoute>
  }
/>

<Route
  path="/signup"
  element={
    <PublicRoute>
      <Signup />
    </PublicRoute>
  }
/>        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />


        {/* DONOR */}
        <Route
          path="/donor-dashboard"
          element={
            <PrivateRoute role="donor">
              <Ddashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/donor-profile-create"
          element={
            <PrivateRoute role="donor">
              <DCreateProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/donor-profile"
          element={
            <PrivateRoute role="donor">
              <DProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/donor-edit"
          element={
            <PrivateRoute role="donor">
              <DEditProfile />
            </PrivateRoute>
          }
        />

        {/* NEEDY */}
        <Route
          path="/needy-dashboard"
          element={
            <PrivateRoute role="needy">
              <Ndashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/needy-profile-create"
          element={
            <PrivateRoute role="needy">
              <NCreateProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/needy-profile"
          element={
            <PrivateRoute role="needy">
              <NProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/needy-edit"
          element={
            <PrivateRoute role="needy">
              <NEditProfile />
            </PrivateRoute>
          }
        />

        {/* MEDICINE */}
        <Route
          path="/add-medicine"
          element={
            <PrivateRoute role="donor">
              <CreateMedicine />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-medicines"
          element={
            <PrivateRoute role="donor">
              <MyMedicines />
            </PrivateRoute>
          }
        />

        <Route
          path="/search-medicines"
          element={
            <PrivateRoute role="needy">
              <FilterMedicines />
            </PrivateRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoute role="admin">
              <AdminUsers />
            </PrivateRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;