import React, { useContext } from "react"; // Importa React e o hook useContext para acessar o contexto
import "./ItensCarrinho.css"; // Importa o arquivo de estilos CSS específico para o componente
import cross_icon from "../Assets/cart_cross_icon.png"; // Importa o ícone de remoção do carrinho
import { ShopContext } from "../../Context/ShopContext"; // Importa o contexto da loja
import { backend_url, moeda } from "../../App"; // Importa a URL do backend e a moeda para formatação

const CarrinhoItems = () => {
  // Desestrutura as funções e dados do contexto ShopContext
  const {
    products,
    carrinhoItems,
    removeCarrinho,
    updateCarrinhoItemQt,
    getTotalCarrinho,
  } = useContext(ShopContext);

  // Função para confirmar e remover um item do carrinho
  const handleRemoveClick = (id) => {
    const confirmRemove = window.confirm(
      "Você tem certeza que deseja remover este item do carrinho?"
    );
    if (confirmRemove) {
      removeCarrinho(id); // Chama a função de remoção do contexto
    }
  };

  // Função para aumentar a quantidade de um item no carrinho
  const handleIncreaseQuantity = (id) => {
    updateCarrinhoItemQt(id, carrinhoItems[id] + 1); // Atualiza a quantidade no contexto
  };

  // Função para diminuir a quantidade de um item no carrinho
  const handleDecreaseQuantity = (id) => {
    if (carrinhoItems[id] > 1) {
      updateCarrinhoItemQt(id, carrinhoItems[id] - 1); // Atualiza a quantidade no contexto se for maior que 1
    }
  };

  return (
    <div className="itens-carrinho">
      {/* Container principal para o carrinho de compras */}
      <div className="itens-carrinho-format-principal">
        {/* Cabeçalhos da tabela */}
        <p>Produto</p>
        <p>Nome</p>
        <p>Preço</p>
        <p>Quantidade</p>
        <p>Total</p>
        <p>Remover</p>
      </div>
      <hr />
      {products.map((e) => {
        if (carrinhoItems[e.id] > 0) {
          // Verifica se o item está no carrinho
          return (
            <div key={e.id}>
              <div className="itens-carrinho-format-principal itens-carrinho-format">
                {/* Linha do item do carrinho */}
                <img
                  className="itens-carrinho-produto-icon"
                  src={backend_url + e.image}
                  alt={`Imagem do produto ${e.name}`}
                />
                {/* Imagem do produto */}
                <p className="itens-carrinho-produto-titulo">{e.name}</p>
                {/* Nome do produto */}
                <p>
                  {moeda}
                  {e.new_price}
                </p>
                {/* Preço do produto */}
                <div className="itens-carrinho-quantidade-controles">
                  {/* Controles de quantidade */}
                  <button onClick={() => handleDecreaseQuantity(e.id)}>
                    -
                  </button>
                  {/* Botão para diminuir a quantidade */}
                  <span> {carrinhoItems[e.id]} </span> {/* Quantidade atual */}
                  <button onClick={() => handleIncreaseQuantity(e.id)}>
                    +
                  </button>
                  {/* Botão para aumentar a quantidade */}
                </div>
                <p>
                  {moeda}
                  {e.new_price * carrinhoItems[e.id]}
                </p>
                {/* Total por item */}
                <img
                  onClick={() => handleRemoveClick(e.id)}
                  className="itens-carrinho-remover-icon"
                  src={cross_icon}
                  alt="Remover item"
                />
                {/* Ícone para remover o item do carrinho */}
              </div>
              <hr />
            </div>
          );
        }
        return null; // Retorna null se o item não estiver no carrinho
      })}

      <div className="itens-carrinho-baixo">
        {/* Seção para o total do carrinho */}
        <div className="itens-carrinho-total">
          <h1>Total do Carrinho</h1>
          <div>
            <div className="itens-carrinho-total-item">
              {/* Item subtotal */}
              <p>Subtotal</p>
              <p>
                {moeda}
                {getTotalCarrinho()}
              </p>
            </div>
            <hr />
            <div className="itens-carrinho-total-item">
              {/* Item taxa de envio */}
              <p>Taxa de Envio</p>
              <p>Grátis</p>
            </div>
            <hr />
            <div className="itens-carrinho-total-item">
              {/* Item total */}
              <h3>Total</h3>
              <h3>
                {moeda}
                {getTotalCarrinho()}
              </h3>
            </div>
          </div>
          <button>COMPRAR</button>
          {/* Botão para finalizar a compra */}
        </div>
      </div>
    </div>
  );
};

export default CarrinhoItems; // Exporta o componente para ser usado em outras partes da aplicação
