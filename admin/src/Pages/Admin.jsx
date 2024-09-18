import React from "react";
import "./CSS/Admin.css"; // Importa o arquivo de estilo para a página Admin
import Sidebar from "../Components/Sidebar/Sidebar"; // Importa o componente Sidebar
import AddProduct from "../Components/AddProduto/AddProduto"; // Importa o componente para adicionar produtos
import { Route, Routes } from "react-router-dom"; // Importa os componentes de roteamento do React Router
import ListProduct from "../Components/ListaProdutos/ListaProduto"; // Importa o componente para listar produtos
// import EditProduto from "../Components/EditProduto/EditProduto"; // Importado, mas não está em uso

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar /> {/* Renderiza o componente Sidebar */}
      <Routes>
        {/* Define as rotas para os componentes */}
        <Route path="/" element={""} /> {/* Rota padrão, atualmente sem conteúdo */}
        <Route path="/addproduct" element={<AddProduct />} /> {/* Rota para adicionar um produto */}
        <Route path="/listaprodutos" element={<ListProduct />} /> {/* Rota para listar produtos */}
        {/* <Route path="/editproduto/:id" element={<EditProduto />} /> */} {/* Rota para editar um produto, atualmente comentada */}
      </Routes>
    </div>
  );
};

export default Admin; // Exporta o componente Admin para ser usado em outras partes do aplicativo
