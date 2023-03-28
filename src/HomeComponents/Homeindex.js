import { React, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Login from "./Login";
import NavBar from "./NavBar";
import Product from "./Product";
import Register from "./Register";
import { Homecontext } from "./contexts/Homecontext";

function Homeindex() {
  const [userid, setUserid] = useState("");
  const [cartitem, setCartitem] = useState([]);
  const [price,setPrice]=useState(0);
  const [username, setUsername] = useState("");
  return (
    <div>
      <Homecontext.Provider
        value={{
          cartitem,
          username,
          setCartitem,
          setUsername,
          userid,
          setUserid,
          price,
          setPrice,
        }}
      >
        <NavBar />
        <Routes>
          <Route index element={<Cart />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Homecontext.Provider>
    </div>
  );
}

export default Homeindex;
