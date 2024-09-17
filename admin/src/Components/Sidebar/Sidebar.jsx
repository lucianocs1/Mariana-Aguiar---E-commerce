import React, { useState } from "react";
import "./Sidebar.css";
import produtos_imagem from "../Assets/produtos_imagem.png";
import lista_produtos_imagem from "../Assets/lista_produto_imagem.png";
import docs_imagem from "../Assets/docs_imagem.jpg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="sidebar">
      <Link to="/addproduct" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={produtos_imagem} alt="Adicionar Produto" />
          <p>Adicionar Produto</p>
        </div>
      </Link>
      <Link to="/listaprodutos" style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={lista_produtos_imagem} alt="Lista de Produtos" />
          <p>Lista de Produtos</p>
        </div>
      </Link>
      <div className="sidebar-item" onClick={toggleDropdown}>
        <img
          src={docs_imagem}
          alt="Documentação"
          style={{ cursor: "pointer" }}
        />
        <p>Documentação</p>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <Link
              to="http://localhost:8080/docs"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <p>Swagger</p>
            </Link>
            <Link
              to="https://www.figma.com/design/FRn8moWDlxZudgFG0HnAWv/Projeto-Mariana-Aguiar?m=auto&t=NhTUVQDFfVtDcDe4-6"
              target="_blank"
              style={{ textDecoration: "none" }}
            >
              <p>Figma</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
