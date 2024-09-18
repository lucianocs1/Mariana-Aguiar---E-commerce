import React, { useState } from "react";
import "./AddProduto.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

// Componente principal para adicionar um produto
const AddProduct = () => {
  // Estado para armazenar a imagem selecionada
  const [image, setImage] = useState(false);

  // Estado para armazenar os detalhes do produto
  const [productDetails, setProductDetails] = useState({
    name: "",           // Nome do produto
    description: "",    // Descrição do produto
    image: "",          // URL da imagem após upload
    category: "roupas", // Categoria inicial do produto
    new_price: "",      // Preço promocional
    old_price: "",      // Preço original
  });

  // Função para adicionar um novo produto
  const AddProduto = async () => {
    let dataObj; // Variável para armazenar a resposta do upload
    let product = productDetails; // Detalhes do produto

    // Cria um FormData para enviar a imagem
    let formData = new FormData();
    formData.append("product", image);

    // Faz upload da imagem para o backend
    await fetch(`${backend_url}/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json()) // Converte a resposta em JSON
      .then((data) => {
        dataObj = data; // Armazena os dados retornados
      });

    // Se o upload da imagem foi bem-sucedido
    if (dataObj.success) {
      product.image = dataObj.image_url; // Define a URL da imagem no produto

      // Envia os detalhes do produto para o backend
      await fetch(`${backend_url}/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product), // Converte o produto em JSON
      })
        .then((resp) => resp.json()) // Converte a resposta em JSON
        .then((data) => {
          // Exibe mensagem de sucesso ou falha
          data.success
            ? alert("Produto adicionado")
            : alert("Falha ao adicionar o produto");
        });
    }
  };

  // Função para atualizar os campos de texto do formulário
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="adicionar-produto">
      {/* Campo para título do produto */}
      <div className="adicionar-produto-campo-item">
        <p>Título do Produto</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Digite aqui"
        />
      </div>

      {/* Campo para descrição do produto */}
      <div className="adicionar-produto-campo-item">
        <p>Descrição do Produto</p>
        <input
          type="text"
          name="description"
          value={productDetails.description}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Digite aqui"
        />
      </div>

      {/* Campos para o preço e promoção */}
      <div className="adicionar-produto-preco">
        <div className="adicionar-produto-campo-item">
          <p>Preço</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={(e) => {
              changeHandler(e);
            }}
            placeholder="Digite aqui"
          />
        </div>
        <div className="adicionar-produto-campo-item">
          <p>Promoção</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={(e) => {
              changeHandler(e);
            }}
            placeholder="Digite aqui"
          />
        </div>
      </div>

      {/* Seletor de categoria */}
      <div className="adicionar-produto-campo-item">
        <p>Categoria do Produto</p>
        <select
          value={productDetails.category}
          name="category"
          className="adicionar-produto-seletor"
          onChange={changeHandler}
        >
          <option value="roupas">Roupas</option>
          <option value="calcados">Calçados</option>
          <option value="bolsas">Bolsas</option>
        </select>
      </div>

      {/* Campo para upload de imagem */}
      <div className="adicionar-produto-campo-item">
        <p>Imagem do Produto</p>
        <label htmlFor="file-input">
          <img
            className="adicionar-produto-imagem-miniatura"
            src={!image ? upload_area : URL.createObjectURL(image)}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])} // Define a imagem selecionada
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
        />
      </div>

      {/* Botão para adicionar o produto */}
      <button
        className="adicionar-produto-botao"
        onClick={() => {
          AddProduto();
        }}
      >
        Adicionar
      </button>
    </div>
  );
};

export default AddProduct;
