import React, { createContext, useEffect, useState } from "react";
import { backend_url } from "../App";

// Cria o contexto para o gerenciamento de estado da loja
export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  // Estado para armazenar a lista de produtos
  const [products, setProducts] = useState([]);

  // Função para inicializar o carrinho de compras
  const getDefaultCarrinho = () => {
    let carrinho = {};
    for (let i = 0; i < 300; i++) {
      carrinho[i] = 0; // Inicializa todos os itens com quantidade 0
    }
    return carrinho;
  };

  // Estado para armazenar os itens do carrinho
  const [carrinhoItems, setCarrinhoItems] = useState(getDefaultCarrinho());

  // Efeito para buscar produtos e o carrinho quando o componente é montado
  useEffect(() => {
    // Busca todos os produtos do backend e atualiza o estado
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));

    // Se o usuário estiver autenticado, busca o carrinho
    if (localStorage.getItem("auth-token")) {
      fetch(`${backend_url}/getcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((resp) => resp.json())
        .then((data) => setCarrinhoItems(data))
        .catch((error) => console.error("Erro ao buscar carrinho:", error));
    }
  }, []); // Dependências vazias para executar apenas na montagem do componente

  // Calcula o valor total do carrinho
  const getTotalCarrinho = () => {
    return Object.keys(carrinhoItems).reduce((totalAmount, item) => {
      if (carrinhoItems[item] > 0) {
        // Encontra as informações do item no estado de produtos
        const itemInfo = products.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
          // Calcula o total com base na quantidade e no preço do item
          totalAmount += carrinhoItems[item] * itemInfo.new_price;
        }
      }
      return totalAmount;
    }, 0);
  };

  // Calcula o número total de itens no carrinho
  const getTotalCarrinhoItems = () => {
    return Object.keys(carrinhoItems).reduce((totalItem, item) => {
      if (carrinhoItems[item] > 0) {
        totalItem += carrinhoItems[item];
      }
      return totalItem;
    }, 0);
  };

  // Adiciona um item ao carrinho
  const addCarrinho = (itemId) => {
    // Verifica se o usuário está autenticado
    if (!localStorage.getItem("auth-token")) {
      alert("Por favor, efetue o seu login.");
      return;
    }
    console.log(`Adicionando item ${itemId} ao carrinho`);

    // Atualiza o estado do carrinho
    setCarrinhoItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    // Faz uma requisição ao backend para adicionar o item ao carrinho
    fetch(`${backend_url}/addtocart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": localStorage.getItem("auth-token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemId }),
    }).catch((error) => console.error("Erro ao adicionar ao carrinho:", error));
  };

  // Remove um item do carrinho
  const removeCarrinho = (itemId) => {
    if (carrinhoItems[itemId] > 0) {
      // Atualiza o estado do carrinho
      setCarrinhoItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

      // Faz uma requisição ao backend para remover o item do carrinho
      fetch(`${backend_url}/removefromcart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      }).catch((error) => console.error("Erro ao remover do carrinho:", error));
    }
  };

  // Atualiza a quantidade de um item no carrinho
  const updateCarrinhoItemQt = (itemId, quantity) => {
    if (quantity > 0) {
      // Atualiza o estado do carrinho
      setCarrinhoItems((prev) => ({ ...prev, [itemId]: quantity }));

      // Faz uma requisição ao backend para atualizar o carrinho
      fetch(`${backend_url}/updatecart`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId, quantity }),
      }).catch((error) => console.error("Erro ao atualizar carrinho:", error));
    } else {
      // Opcionalmente remove o item se a quantidade for zero
      removeCarrinho(itemId);
    }
  };

  // Valor do contexto fornecido para os componentes filhos
  const contextValue = {
    products,
    getTotalCarrinhoItems,
    carrinhoItems,
    addCarrinho,
    removeCarrinho,
    updateCarrinhoItemQt,
    getTotalCarrinho,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
