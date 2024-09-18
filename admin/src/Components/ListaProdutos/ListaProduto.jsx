import React, { useEffect, useState } from "react";
import "./ListaProduto.css";
import excluir_imagem from "../Assets/excluir_imagem.png";
// import edit_imagem from "../Assets/edit_imagem.png"; // Comentado pois não está em uso
import { backend_url, currency } from "../../App";
// import { useNavigate } from "react-router-dom"; // Comentado pois não está em uso

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]); // Estado para armazenar todos os produtos
  const [filter, setFilter] = useState(""); // Estado para armazenar o valor do filtro

  // const navigate = useNavigate(); // Inicialização comentada porque a navegação está desativada

  // Função para buscar todos os produtos do backend
  const fetchInfo = () => {
    fetch(`${backend_url}/allproducts`)
      .then((res) => res.json()) // Converte a resposta em JSON
      .then((data) => setAllProducts(data)); // Armazena os produtos no estado
  };

  // Hook useEffect para buscar os produtos ao carregar o componente
  useEffect(() => {
    fetchInfo();
  }, []); // O array vazio faz com que esse efeito execute apenas uma vez

  // Função para remover um produto
  const removeProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza de que deseja excluir este produto?" // Confirmação antes de deletar
    );
    if (confirmDelete) {
      // Envia requisição para remover o produto
      await fetch(`${backend_url}/removeproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }), // Envia o ID do produto a ser removido
      });

      fetchInfo(); // Atualiza a lista de produtos após a remoção
    }
  };

  // const handleEditClick = (id) => {
  //   // Redireciona para a página de edição com o ID do produto
  //   navigate(`/editproduto/${id}`);
  // }; // Comentado pois a funcionalidade de edição está desativada

  // Filtra os produtos de acordo com o valor digitado no campo de pesquisa
  const filteredProducts = allproducts.filter(
    (product) =>
      product.name.toLowerCase().includes(filter.toLowerCase()) || // Filtro por nome
      product.category.toLowerCase().includes(filter.toLowerCase()) // Filtro por categoria
  );

  return (
    <div className="listar-produto">
      <h1>Todos os Produtos</h1>

      {/* Campo de entrada para o filtro de produtos */}
      <input
        className="filtro"
        type="text"
        placeholder="Pesquisar produto.."
        value={filter}
        onChange={(e) => setFilter(e.target.value)} // Atualiza o estado do filtro ao digitar
      />

      <div className="listar-produto-format-principal">
        <p>Produtos</p> <p>Título</p> <p>Preço</p> <p>Preço com Desconto</p>{" "}
        <p>Categoria</p> <p>Ações</p> {/* Cabeçalhos das colunas */}
      </div>
      <div className="listar-produto-todos-produtos">
        <hr />
        {/* Mapeia e renderiza os produtos filtrados */}
        {filteredProducts.map((e, index) => (
          <div key={index}>
            <div className="listar-produto-format-principal listar-produto-format">
              {/* Exibe a imagem do produto */}
              <img
                className="listar-produto-icone-produto"
                src={backend_url + e.image}
                alt=""
              />
              {/* Exibe o título do produto */}
              <p className="listar-produto-titulo">{e.name}</p>
              {/* Exibe o preço original e o preço com desconto */}
              <p>
                {currency}
                {e.old_price}
              </p>
              <p>
                {currency}
                {e.new_price}
              </p>
              {/* Exibe a categoria do produto */}
              <p>{e.category}</p>
              <div className="listar-produto-icones">
                {/* Ícone de editar produto, desativado */}
                {/* <img
                  className="listar-produto-icone-editar"
                  onClick={() => handleEditClick(e.id)} // Função de editar comentada
                  src={edit_imagem}
                  alt="Editar"
                /> */}
                {/* Ícone de remover produto */}
                <img
                  className="listar-produto-icone-remover"
                  onClick={() => removeProduct(e.id)} // Função para remover o produto
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
