import React, { useEffect, useState } from "react";
import "./ListaProduto.css";
import excluir_imagem from "../Assets/excluir_imagem.png";
// import edit_imagem from "../Assets/edit_imagem.png";
import { backend_url, currency } from "../../App";
// import { useNavigate } from "react-router-dom";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [filter, setFilter] = useState(""); // Estado para o filtro

  // const navigate = useNavigate();
  const fetchInfo = () => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir este produto?"
    );
    if (confirmDelete) {
      await fetch(`${backend_url}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      fetchInfo();
    }
  };

  // const handleEditClick = (id) => {
  //   // Redireciona para a página de edição com o ID do produto
  //   navigate(`/editproduto/${id}`);
  // };

  // Filtrar produtos com base no valor do filtro
  const filteredProducts = allproducts.filter(
    (product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()) ||
      product.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="listar-produto">
      <h1>Todos os Produtos</h1>

      {/* Campo de entrada para o filtro */}
      <input
        className="filtro"
        type="text"
        placeholder="Pesquisar produto.."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="listar-produto-format-principal">
        <p>Produtos</p> <p>Título</p> <p>Preço</p> <p>Preço com Desconto</p>{" "}
        <p>Categoria</p> <p>Ações</p>
      </div>
      <div className="listar-produto-todos-produtos">
        <hr />
        {filteredProducts.map((e, index) => (
          <div key={index}>
            <div className="listar-produto-format-principal listar-produto-format">
              <img
                className="listar-produto-icone-produto"
                src={backend_url + e.image}
                alt=""
              />
              <p className="listar-produto-titulo">{e.name}</p>
              <p>
                {currency}
                {e.old_price}
              </p>
              <p>
                {currency}
                {e.new_price}
              </p>
              <p>{e.category}</p>
              <div className="listar-produto-icones">
                {/* <img
                  className="listar-produto-icone-editar"
                  onClick={() => handleEditClick(e.id)}
                  src={edit_imagem}
                  alt="Editar"
                /> */}
                <img
                  className="listar-produto-icone-remover"
                  onClick={() => removeProduct(e.id)}
                  src={excluir_imagem}
                  alt="Remover"
                />
              </div>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
