import React, { useState, useContext } from "react";
import "./AreaProduto.css";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, moeda } from "../../App";

const ProdutoDisplay = ({ product }) => {
  const { addCarrinho } = useContext(ShopContext);
  const [selectedSize, setSelectedSize] = useState(null); // Armazena o tamanho selecionado
  const [selectedColor, setSelectedColor] = useState(null); // Armazena a cor selecionada
  const [sizeError, setSizeError] = useState(false); // Para exibir mensagem de erro de tamanho
  const [colorError, setColorError] = useState(false); // Para exibir mensagem de erro de cor

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSizeError(false); // Remove a mensagem de erro ao selecionar o tamanho
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    setColorError(false); // Remove a mensagem de erro ao selecionar a cor
  };

  const getSizeOptions = () => {
    if (product.category.includes("calcados")) {
      return ["36", "37", "38", "39", "40"];
    } else if (product.category.includes("roupas")) {
      return ["P", "M", "G", "GG", "XG"];
    } else {
      return [];
    }
  };

  const getColorOptions = () => {
    if (product.category.includes("bolsas")) {
      return ["Preto", "Marrom", "Bege", "Vermelho"];
    } else {
      return [];
    }
  };

  const handleAddCarrinho = () => {
    // Verifica se o tamanho e a cor foram selecionados, se aplicável
    if (
      product.category.includes("calcados") ||
      product.category.includes("roupas")
    ) {
      if (!selectedSize) {
        setSizeError(true); // Exibe mensagem de erro
        return;
      }
    }

    if (product.category.includes("bolsas") && !selectedColor) {
      setColorError(true); // Exibe mensagem de erro
      return;
    }

    addCarrinho(product.id); // Adiciona ao carrinho
  };

  const sizeOptions = getSizeOptions();
  const colorOptions = getColorOptions();

  return (
    <div className="exibicao-produto">
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
