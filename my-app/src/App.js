import "./App.css";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Packs from "./pages/Packs";
import AddPack from "./pages/AddPack";
import AddProduct from "./pages/AddProduct";
import Error from "./pages/Error";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./pages/Unauthorized";
import AddUser from "./pages/AddUser";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route element={<RequireAuth allowedRoles={["admin", "user", "agent"]} />}>
          <Route path="/" element={<Products />}></Route>
          <Route path="/packs" element={<Packs />}></Route>
          <Route path="/*" element={<Error />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
        </Route>
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="/addProduct" element={<AddProduct />}></Route>
          <Route path="/addPack" element={<AddPack />}></Route>
          <Route path="/addUser" element={<AddUser />}></Route>
          <Route path="/Users" element={<Users />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
