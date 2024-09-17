import React, { useState } from "react";
import "./AddProduto.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    image: "",
    category: "roupas",
    new_price: "",
    old_price: "",
  });

  const AddProduto = async () => {
    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    formData.append("product", image);

    await fetch(`${backend_url}/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      product.image = dataObj.image_url;
      await fetch(`${backend_url}/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success
            ? alert("Produto adicionado")
            : alert("Falha ao adicionar o produto");
        });
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="adicionar-produto">
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
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
        />
      </div>
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
