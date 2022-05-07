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
import Unauthorized from "./pages/Unauthorized";

function App() {
  return (
    <div>
      {/* <div className="container"> */}
      {/* <Register/> */}
      {/* <Login/> */}
      {/* </div> */}
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Products />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/packs" element={<Packs />}></Route>
          <Route path="/addPack" element={<AddPack />}></Route>
          <Route path="/addProduct" element={<AddProduct />}></Route>
          <Route path="/*" element={<Error />}></Route>
          <Route path="/unauthorized" element={<Unauthorized />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
