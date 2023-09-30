import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Appbar";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoutes Component={<Dashboard />} />}
        />
      </Routes>
    </>
  );
}

export default App;
