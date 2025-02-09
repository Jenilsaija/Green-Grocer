import { React, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./Cart";
import Login from "./Login";
import NavBar from "./NavBar";
import Product from "./Product";
import Register from "./Register";
import { Homecontext } from "./contexts/Homecontext";
import Checkout from "./Checkout";
import Orders from "./Orders";
import Home from "./Home";
import Nopage from "./Nopage";

function Homeindex() {
  const [cartitem, setCartitem] = useState([]);
  const [price, setPrice] = useState(0);
  return (
    <div>
      <Homecontext.Provider
        value={{
          cartitem,
          setCartitem,
          price,
          setPrice,
        }}
      >
        <NavBar />
        <Routes>
          <Route index key={1} element={<Home />}></Route>
          <Route path="/products" key={2} element={<Product />}></Route>
          <Route path="/login" key={3} element={<Login />}></Route>
          <Route path="/register" key={4} element={<Register />}></Route>
          <Route path="/checkout" key={5} element={<Checkout />}></Route>
          <Route path="/cart" key={5} element={<Cart/>}></Route>
          <Route path="/orders" key={6} element={<Orders/>}></Route>
          <Route path="/404" key={6} element={<Nopage/>}></Route>
          <Route path="*" key={6} element={<Nopage/>}></Route>
        </Routes>
      </Homecontext.Provider>
    </div>
  );
}

export default Homeindex;
