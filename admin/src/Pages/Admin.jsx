import React from "react";
import "./CSS/Admin.css";
import Sidebar from "../Components/Sidebar/Sidebar";
import AddProduct from "../Components/AddProduto/AddProduto";
import { Route, Routes } from "react-router-dom";
import ListProduct from "../Components/ListaProdutos/ListaProduto";
// import EditProduto from "../Components/EditProduto/EditProduto";

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/" element={""} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/listaprodutos" element={<ListProduct />} />
        {/* <Route path="/editproduto/:id" element={<EditProduto />} /> */}
      </Routes>
    </div>
  );
};

export default Admin;
