//Ofertas exclusivas
import React from "react";
import "./OfertasCadastro.css";

const OfertasCadastro = () => {
  return (
    <div className="ofertas-cadastro">
      <h1>Receba ofertas exclusivas em seu e-mail!</h1>
      <p>Cadastre-se e fique por dentro de tudo!</p>
      <div>
        <a href="/login" className="ofertas-cadastro-signup-link">
          <button>Cadastre-se</button>
        </a>
      </div>
    </div>
  );
};

export default OfertasCadastro;
