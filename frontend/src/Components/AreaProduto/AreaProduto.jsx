import React, { useState, useContext } from "react";
import "./AreaProduto.css";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, moeda } from "../../App";

const ProdutoDisplay = ({ product }) => {
  // Contexto para gerenciar o carrinho
  const { addCarrinho } = useContext(ShopContext);
  
  // Estados para armazenar as seleções do usuário
  const [selectedSize, setSelectedSize] = useState(null); // Tamanho selecionado
  const [selectedColor, setSelectedColor] = useState(null); // Cor selecionada
  const [sizeError, setSizeError] = useState(false); // Erro de tamanho
  const [colorError, setColorError] = useState(false); // Erro de cor

  // Função para lidar com a seleção de tamanho
  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSizeError(false); // Remove o erro se um tamanho é selecionado
  };

  // Função para lidar com a seleção de cor
  const handleColorClick = (color) => {
    setSelectedColor(color);
    setColorError(false); // Remove o erro se uma cor é selecionada
  };

  // Função para obter as opções de tamanho com base na categoria do produto
  const getSizeOptions = () => {
    if (product.category.includes("calcados")) {
      return ["36", "37", "38", "39", "40"]; // Tamanhos para calçados
    } else if (product.category.includes("roupas")) {
      return ["P", "M", "G", "GG", "XG"]; // Tamanhos para roupas
    } else {
      return [];
    }
  };

  // Função para obter as opções de cor com base na categoria do produto
  const getColorOptions = () => {
    if (product.category.includes("bolsas")) {
      return ["Preto", "Marrom", "Bege", "Vermelho"]; // Cores para bolsas
    } else {
      return [];
    }
  };

  // Função para adicionar o produto ao carrinho
  const handleAddCarrinho = () => {
    // Verifica se o tamanho e a cor foram selecionados, se necessário
    if (
      product.category.includes("calcados") ||
      product.category.includes("roupas")
    ) {
      if (!selectedSize) {
        setSizeError(true); // Exibe erro se tamanho não selecionado
        return;
      }
    }

    if (product.category.includes("bolsas") && !selectedColor) {
      setColorError(true); // Exibe erro se cor não selecionada
      return;
    }

    addCarrinho(product.id); // Adiciona o produto ao carrinho
  };

  // Obtém opções de tamanho e cor
  const sizeOptions = getSizeOptions();
  const colorOptions = getColorOptions();

  return (
    <div className="exibicao-produto">
      {/* Seção de imagens do produto */}
      <div className="exibicao-produto-esquerda">
        <div className="exibicao-produto-lista-imagens">
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
        </div>
        <div className="exibicao-produto-imagem">
          <img
            className="exibicao-produto-imagem-principal"
            src={backend_url + product.image}
            alt="img"
          />
        </div>
      </div>
      {/* Seção de detalhes do produto */}
      <div className="exibicao-produto-direita">
        <h1>{product.name}</h1>
        <div className="exibicao-produto-direita-precos">
          <div className="exibicao-produto-preco-antigo">
            {moeda}
            {product.old_price}
          </div>
          <div className="exibicao-produto-preco-novo">
            {moeda}
            {product.new_price}
          </div>
        </div>
        <div className="exibicao-produto-direita-descricao">
          {product.description}
        </div>
        {/* Seção de seleção de tamanho */}
        {sizeOptions.length > 0 && (
          <div className="exibicao-produto-direita-tamanho">
            <h1>Selecione o tamanho</h1>
            <div className="exibicao-produto-direita-tamanhos">
              {sizeOptions.map((size) => (
                <div
                  key={size}
                  className={`opcao-tamanho ${
                    selectedSize === size ? "selecionado" : ""
                  }`}
                  onClick={() => handleSizeClick(size)}
                >
                  {size}
                </div>
              ))}
            </div>
            {sizeError && (
              <p className="erro-tamanho">
                Por favor, selecione um tamanho antes de continuar.
              </p>
            )}
          </div>
        )}
        {/* Seção de seleção de cor */}
        {colorOptions.length > 0 && (
          <div className="exibicao-produto-direita-cor">
            <h1>Cores disponíveis</h1>
            <div className="exibicao-produto-direita-cores">
              {colorOptions.map((color) => (
                <div
                  key={color}
                  className={`opcao-cor ${
                    selectedColor === color ? "selecionado" : ""
                  }`}
                  onClick={() => handleColorClick(color)}
                >
                  {color}
                </div>
              ))}
            </div>
            {colorError && (
              <p className="erro-cor">
                Por favor, selecione uma cor antes de continuar.
              </p>
            )}
          </div>
        )}
        <button onClick={handleAddCarrinho}>Adicionar ao carrinho</button>
        <p className="exibicao-produto-direita-categoria">
          <span>Categoria :</span> {product.category}
        </p>
        <p className="exibicao-produto-direita-tags">
          <span>Tags :</span> {product.tags}
        </p>
      </div>
    </div>
  );
};

export default ProdutoDisplay;
