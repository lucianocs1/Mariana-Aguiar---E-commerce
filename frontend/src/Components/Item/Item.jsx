import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { backend_url, moeda } from "../../App";

const Item = (props) => {
  return (
    <div className="item-produto">
      {/* Link para a página do produto */}
      <Link to={`/product/${props.id}`}>
        {/* Imagem do produto com rolagem para o topo ao ser clicada */}
        <img
          onClick={() => window.scrollTo(0, 0)}
          src={`${backend_url}${props.image}`}
          alt={`Imagem do produto ${props.name}`}
        />
      </Link>

      {/* Nome do produto */}
      <p>{props.name}</p>

      {/* Seção de preços */}
      <div className="item-produto-precos">
        {/* Preço atual do produto */}
        <div className="item-produto-preco-novo">
          {moeda}
          {props.new_price}
        </div>

        {/* Preço antigo do produto */}
        <div className="item-produto-preco-antigo">
          {moeda}
          {props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;
