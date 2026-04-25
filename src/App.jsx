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


function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/up" element={<UpdatePassword/>} />

        <Route path="/donor-dashboard" element={<Ddashboard/>} />  
        <Route path="/donor-profile-create" element={<DCreateProfile />} />
        <Route path="/donor-profile" element={<DProfile />} />
        <Route path="/donor-edit" element={<DEditProfile />} />  

        <Route path="/needy-dashboard" element={<Ndashboard/>} />
        <Route path="/needy-profile-create" element={<NCreateProfile />} />
        <Route path="/needy-profile" element={<NProfile />} />
        <Route path="/needy-edit" element={<NEditProfile />} />    

        <Route path="/add-medicine" element={<CreateMedicine />} />
        <Route path="/my-medicines" element={<MyMedicines />} />
        <Route path="/search-medicines" element={<FilterMedicines />} /> 

        <Route path="/admin-dashboard" element={<AdminUsers />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;