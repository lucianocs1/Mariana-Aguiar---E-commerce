import React from "react";
import "./Ofertas.css";
import foto_ma from "../Assets/bolsasoff.png";

const Offers = () => {
  return (
    <div className="ofertas">
      <div className="ofertas-esquerda">
        <h1>Ofertas de Bolsas</h1>
        <h1>Exclusivas Para Você!</h1>
        <p>CORRA E GARANTA JÁ A SUA!!!</p>
        <a href="/bolsas" className="ofertas-link">
          <button>Veja agora</button>
        </a>
      </div>
      <div className="ofertas-direita">
        <img src={foto_ma} alt="" />
      </div>
    </div>
  );
};

export default Offers;
