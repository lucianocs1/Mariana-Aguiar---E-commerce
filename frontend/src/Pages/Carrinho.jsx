import React from "react"; // Importa o React para criar o componente
import CarrinhoItems from "../Components/ItensCarrinho/ItensCarrinho"; // Importa o componente CarrinhoItems

// Componente Carrinho que exibe os itens do carrinho
const Carrinho = () => {
  return (
    <div>
      {/* Renderiza o componente CarrinhoItems */}
      <CarrinhoItems />
    </div>
  );
};

export default Carrinho; // Exporta o componente Carrinho para uso em outras partes da aplicação
