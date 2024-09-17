import React from "react";
import "./Popular.css";
import Item from "../Item/Item";

const Popular = (props) => {
  return (
    <div className="popular">
      {/* Título da seção */}
      <h1>ROUPAS POPULARES</h1>
      <hr />

      {/* Container para a lista de itens populares */}
      <div className="popular-item">
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

export default Popular;
