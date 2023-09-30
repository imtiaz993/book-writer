import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Appbar";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AllBooks from "./pages/Dashboard/AllBooks";
import UpdateBook from "./pages/Dashboard/UpdateBook";
import PreviewBook from "./pages/Dashboard/PreviewBook";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/allbooks"
          element={<ProtectedRoutes Component={<AllBooks />} />}
        />
        <Route
          path="/updatebook"
          element={<ProtectedRoutes Component={<UpdateBook />} />}
        />
        <Route
          path="/previewbook"
          element={<ProtectedRoutes Component={<PreviewBook />} />}
        />
      </Routes>
    </>
  );
}

export default App;
