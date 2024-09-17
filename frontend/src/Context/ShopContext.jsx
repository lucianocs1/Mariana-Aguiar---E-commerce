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

  useEffect(() => {
    // Busca todos os produtos quando o componente é montado
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));

    // Busca o carrinho do usuário se estiver autenticado
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
        const itemInfo = products.find(
          (product) => product.id === Number(item)
        );
        if (itemInfo) {
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
    if (!localStorage.getItem("auth-token")) {
      alert("Por favor, efetue o seu login.");
      return;
    }
    console.log(`Adicionando item ${itemId} ao carrinho`);

    setCarrinhoItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

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
      setCarrinhoItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

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
      setCarrinhoItems((prev) => ({ ...prev, [itemId]: quantity }));

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
      removeCarrinho(itemId); // Opcionalmente remove o item se a quantidade for zero
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
