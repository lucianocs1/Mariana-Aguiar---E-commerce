import React, { useEffect, useState } from "react";
import Hero from "../Components/Inicio/Inicio";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Ofertas/Ofertas";
import NewCollections from "../Components/NovasColecoes/NovasColecoes";
import NewsLetter from "../Components/OfertasCadastro/OfertasCadastro";

const Shop = () => {
  // Estado para armazenar os produtos populares
  const [popular, setPopular] = useState([]);

  // Estado para armazenar as novas coleções
  const [newcollection, setNewCollection] = useState([]);

  // Função para buscar informações dos produtos populares e novas coleções
  const fetchInfo = () => {
    // Faz uma requisição para obter produtos populares
    fetch("http://localhost:4000/popularinwomen")
      .then((res) => res.json())
      .then((data) => setPopular(data)); // Atualiza o estado com os dados recebidos

    // Faz uma requisição para obter novas coleções
    fetch("http://localhost:4000/newcollections")
      .then((res) => res.json())
      .then((data) => setNewCollection(data)); // Atualiza o estado com os dados recebidos
  };

  // Efeito que busca as informações ao montar o componente
  useEffect(() => {
    fetchInfo();
  }, []); // O array vazio indica que o efeito será executado apenas uma vez, após a montagem do componente

  return (
    <div>
      {/* Componente de Hero (herói) - geralmente exibe um banner ou destaque */}
      <Hero />

      {/* Componente de Popular - exibe produtos populares */}
      <Popular data={popular} />

      {/* Componente de Offers - exibe ofertas ou promoções */}
      <Offers />

      {/* Componente de NewCollections - exibe novas coleções */}
      <NewCollections data={newcollection} />

      {/* Componente de NewsLetter - exibe um formulário para assinatura de newsletter */}
      <NewsLetter />
    </div>
  );
};

export default Shop;
