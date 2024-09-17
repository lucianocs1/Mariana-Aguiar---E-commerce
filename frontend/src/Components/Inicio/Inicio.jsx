import React from "react";
import "./Inicio.css";
import ma_imagem from "../Assets/ma_imagem.png";
import ma_imagem1 from "../Assets/ma_imagem1.png";
import sol_imagem from "../Assets/sol.png";

const Inicio = () => {
  return (
    <div className="img-principal">
      <div className="img-principal-esquerda">
        <h2>VERÃO 2024!</h2>
        <div>
          <div className="img-principal-icone-sol">
            <p>novas</p>
            <img src={sol_imagem} alt="ícone de sol" />
          </div>
          <p>coleções</p>
          <p>de verão</p>
        </div>
        <div className="img-principal-botao-novidades">
          <a href="/roupas" className="img-principal-botao-link">
            <div>Veja</div>
          </a>
        </div>
      </div>
      <div className="img-principal-direita">
        <img src={ma_imagem} alt="imagem principal" />
      </div>
      <div className="img-principal-direita">
        <img src={ma_imagem1} alt="imagem principal" />
      </div>
    </div>
  );
};

export default Inicio;
