import React from "react";
import { Route, Routes } from "react-router-dom";
import Addproduct from "./AddProduct";
import DashBoard from "./DashBoard";
import NavBar from "./NavBar";
import Showorders from "./Showorders";
import Showproducts from "./ShowProducts";
import Sidebar from "./Sidebar";

function Adminindex() {
  return (
    <div>
      <main
        className="d-flex flex-nowrap"
        style={{ backgroundColor: "ButtonFace" }}
      >
        <div
          className="collapse show collapse-horizontal"
          id="navbarToggleExternalContent"
        >
          <Sidebar />
        </div>
        <div
          className="d-flex flex-wrap"
          style={{ height: "100%", width: "100%" }}
        >
          <NavBar />
          <Routes>
            <Route index element={<DashBoard />}></Route>
            <Route path="addproduct" element={<Addproduct />}></Route>
            <Route path="showproduct" element={<Showproducts />}></Route>
            <Route path="orders" element={<Showorders />}></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default Adminindex;
