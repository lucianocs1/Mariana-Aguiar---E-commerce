import React, { useContext, useRef, useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../Assets/logoma.jpg";
import cart_icon from "../Assets/carrinho_imagem.png";
import { ShopContext } from "../../Context/ShopContext";
import nav_dropdown from "../Assets/nav_dropdown.png";

const Navbar = () => {
  // Estado para controlar o menu ativo
  const [menu, setMenu] = useState("shop");

  // Contexto para obter a quantidade total de itens no carrinho
  const { getTotalCarrinhoItems } = useContext(ShopContext);

  // Estado para armazenar o nome do usuário
  const [userName, setUserName] = useState("");

  // Referência para o menu dropdown
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  // Recupera o nome do usuário do localStorage quando o componente é montado
  useEffect(() => {
    const storedUserName = localStorage.getItem("user-name");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  return (
    <div className="nav">
      {/* Logo e link para a página inicial */}
      <Link
        to="/"
        onClick={() => setMenu("shop")}
        style={{ textDecoration: "none" }}
        className="nav-logo"
      >
        <img src={logo} alt="logo" />
        <p>MARIANA AGUIAR</p>
      </Link>

      {/* Ícone do dropdown para abrir/fechar o menu */}
      <img
        onClick={dropdown_toggle}
        className="nav-dropdown"
        src={nav_dropdown}
        alt="Menu"
      />

      {/* Menu de navegação */}
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/" style={{ textDecoration: "none" }}>
            Novidades
          </Link>
          {menu === "shop" && <hr />}
        </li>
        <li onClick={() => setMenu("roupas")}>
          <Link to="/roupas" style={{ textDecoration: "none" }}>
            Roupas
          </Link>
          {menu === "roupas" && <hr />}
        </li>
        <li onClick={() => setMenu("calcados")}>
          <Link to="/calcados" style={{ textDecoration: "none" }}>
            Calçados
          </Link>
          {menu === "calcados" && <hr />}
        </li>
        <li onClick={() => setMenu("bolsas")}>
          <Link to="/bolsas" style={{ textDecoration: "none" }}>
            Bolsas
          </Link>
          {menu === "bolsas" && <hr />}
        </li>
      </ul>

      {/* Seção de login e carrinho */}
      <div className="nav-login-carrinho">
        {/* Exibe "Olá, [nome do usuário]" se o usuário estiver logado */}
        {userName && <span>Olá, {userName}!</span>}
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              localStorage.removeItem("user-name");
              window.location.replace("/");
            }}
          >
            Sair
          </button>
        ) : (
          <Link to="/login" style={{ textDecoration: "none" }}>
            <button>Entrar</button>
          </Link>
        )}
        <Link to="/carrinho">
          <img src={cart_icon} alt="Cart" />
        </Link>
        <div className="nav-carrinho-count">{getTotalCarrinhoItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
