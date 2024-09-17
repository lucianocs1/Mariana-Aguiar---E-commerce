import React from "react";
import "./NovasColecoes.css";
import Item from "../Item/Item";

const NovasColecoes = (props) => {
  return (
    <div className="novas-colecoes">
      {/* Título da seção */}
      <h1>NOVAS COLEÇÕES</h1>
      <hr />

      {/* Container para a lista de itens */}
      <div className="colecoes">
        {/* Mapeia os itens da propriedade 'data' para renderizar o componente Item */}
        {props.data.map((item, index) => (
          <Item
            id={item.id}
            key={index}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default NovasColecoes;
