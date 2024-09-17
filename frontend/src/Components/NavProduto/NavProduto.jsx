import React from "react"; // Importa o módulo React para criar componentes
import { Link } from "react-router-dom"; // Importa o componente Link para navegação
import "./NavProduto.css"; // Importa o arquivo de estilos CSS específico para o componente
import arrow_icon from "../Assets/breadcrum_arrow.png"; // Importa o ícone da seta para navegação

const Breadcrums = (props) => {
  const { product } = props; // Desestrutura o objeto product das propriedades

  return (
    <div className="breadcrums">
      {" "}
      {/* Container para o caminho de navegação */}
      <Link to="/">Início</Link> {/* Link para a página inicial */}
      <img src={arrow_icon} alt="seta de navegação" /> {/* Ícone de seta */}
      <Link to={`/${product.category}`}>{product.category}</Link>{" "}
      {/* Link para a categoria do produto */}
      <img src={arrow_icon} alt="seta de navegação" /> {/* Ícone de seta */}
      {product.name} {/* Nome do produto exibido diretamente */}
    </div>
  );
};

export default Breadcrums; // Exporta o componente para ser usado em outras partes da aplicação
