import React from "react";
import "./DescricaoProd.css";

const DescricaoBox = () => {
  return (
    <div className="caixa-descricao">
      {/* Navegação entre seções, apenas a descrição técnica está visível */}
      <div className="caixa-descricao-navegador">
        <div className="caixa-descricao-navegacao">Descrição Técnica</div>
        {/* <div className="caixa-descricao-navegacao fade">Avaliações (32)</div> */}
      </div>

      {/* Seção de descrição do produto */}
      <div className="caixa-descricao-detalhes">
        {/* Título do produto */}
        <h1 className="titulo-produto">Vestido Midi Floral Boho</h1>

        {/* Descrição do produto */}
        <p>
          Este vestido midi exala charme e delicadeza com seu padrão floral
          boho, perfeito para ocasiões casuais e semi-formais. O tecido leve e
          fluido proporciona conforto e um caimento gracioso, ideal para dias
          mais quentes.
        </p>

        {/* Lista de detalhes do produto */}
        <ul>
          <li>
            <strong>Comprimento:</strong> Midi, terminando logo abaixo dos
            joelhos.
          </li>
          <li>
            <strong>Estampa:</strong> Floral em tons pastel, com detalhes de
            folhas e flores pequenas em verde e rosa.
          </li>
          <li>
            <strong>Decote:</strong> V profundo, valorizando o colo.
          </li>
          <li>
            <strong>Mangas:</strong> Manga 3/4 bufante com punhos elásticos,
            adicionando um toque romântico.
          </li>
          <li>
            <strong>Cintura:</strong> Ajustável com uma faixa do mesmo tecido,
            destacando a silhueta.
          </li>
          <li>
            <strong>Saia:</strong> Levemente evasê, permitindo movimento e um ar
            feminino.
          </li>
          <li>
            <strong>Fechamento:</strong> Zíper invisível na lateral para um
            ajuste perfeito.
          </li>
        </ul>

        {/* Material do produto */}
        <div>
          <p>
            <strong>Material:</strong>
          </p>
          <ul>
            <li>
              <strong>Tecido:</strong> Viscose 100%, garantindo leveza e
              respirabilidade.
            </li>
            <li>
              <strong>Forro:</strong> Poliéster, apenas na região do busto e
              saia, proporcionando conforto e opacidade.
            </li>
          </ul>
        </div>

        {/* Cores e tamanhos disponíveis */}
        <div>
          <p>
            <strong>Cores Disponíveis:</strong>
          </p>
          <ul>
            <li>
              <span></span>Rosa claro com estampas verdes e brancas.
            </li>
            <li>
              <span></span>Azul celeste com estampas lilases e verdes.
            </li>
          </ul>
          <p>
            <strong>Tamanhos Disponíveis:</strong> P, M, G, e GG.
          </p>
        </div>

        {/* Sugestão de uso */}
        <p>
          Este vestido midi floral boho é perfeito para um almoço com amigos, um
          passeio ao ar livre, ou até mesmo um evento social mais descontraído.
          Combine-o com sandálias rasteiras para um look casual ou com saltos
          baixos e acessórios delicados para uma ocasião mais especial.
        </p>
      </div>
    </div>
  );
};

export default DescricaoBox;
