// import React, { useState, useEffect } from "react";
// import "./EditProduto.css";
// import upload_area from "../Assets/upload_area.svg";
// import { backend_url } from "../../App";
// import { useParams } from "react-router-dom";
// import axios from "axios"; // Importa o Axios

// const EditProduto = () => {
//   const { id } = useParams();
//   const [image, setImage] = useState(false);
//   const [productDetails, setProductDetails] = useState({
//     name: "",
//     description: "",
//     image: "",
//     category: "",
//     new_price: "",
//     old_price: "",
//   });

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await fetch(`${backend_url}/produto/${id}`, {
//           method: "GET",
//           headers: { Accept: "application/json" },
//         });

//         if (!response.ok) {
//           throw new Error("Erro ao carregar o produto");
//         }

//         const data = await response.json();

//         if (data) {
//           setProductDetails({
//             name: data.name,
//             description: data.description,
//             image: data.image,
//             category: data.category,
//             new_price: data.new_price,
//             old_price: data.old_price,
//           });
//         } else {
//           alert("Falha ao carregar o produto: Dados não encontrados");
//         }
//       } catch (error) {
//         console.error("Erro ao carregar o produto:", error);
//         alert("Falha ao carregar o produto.");
//       }
//     };

//     fetchProductDetails();
//   }, [id]);
//   const AddProduto = async () => {
//     let product = { ...productDetails }; // Clona os detalhes do produto para alterações

//     try {
//       // Faz a requisição PUT para atualizar o produto
//       const response = await axios.put(
//         `${backend_url}/edit/${id}`,
//         product,
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Verifica se a resposta contém o produto atualizado
//       if (response.data._id) {
//         // Checa se o ID do produto está presente, indicando sucesso
//         alert("Produto editado com sucesso!");
//       } else {
//         alert("Falha ao editar o produto.");
//       }
//     } catch (error) {
//       console.error("Erro ao editar o produto:", error);
//       alert("Ocorreu um erro ao tentar editar o produto.");
//     }
//   };

//   const changeHandler = (e) => {
//     setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="adicionar-produto">
//       <div className="adicionar-produto-campo-item">
//         <p>Título do Produto</p>
//         <input
//           type="text"
//           name="name"
//           value={productDetails.name}
//           onChange={(e) => {
//             changeHandler(e);
//           }}
//           placeholder="Digite aqui"
//         />
//       </div>
//       <div className="adicionar-produto-campo-item">
//         <p>Descrição do Produto</p>
//         <input
//           type="text"
//           name="description"
//           value={productDetails.description}
//           onChange={(e) => {
//             changeHandler(e);
//           }}
//           placeholder="Digite aqui"
//         />
//       </div>
//       <div className="adicionar-produto-preco">
//         <div className="adicionar-produto-campo-item">
//           <p>Preço</p>
//           <input
//             type="number"
//             name="old_price"
//             value={productDetails.old_price}
//             onChange={(e) => {
//               changeHandler(e);
//             }}
//             placeholder="Digite aqui"
//           />
//         </div>
//         <div className="adicionar-produto-campo-item">
//           <p>Promoção</p>
//           <input
//             type="number"
//             name="new_price"
//             value={productDetails.new_price}
//             onChange={(e) => {
//               changeHandler(e);
//             }}
//             placeholder="Digite aqui"
//           />
//         </div>
//       </div>
//       <div className="adicionar-produto-campo-item">
//         <p>Categoria do Produto</p>
//         <select
//           value={productDetails.category}
//           name="category"
//           className="adicionar-produto-seletor"
//           onChange={changeHandler}
//         >
//           <option value="roupas">Roupas</option>
//           <option value="calcados">Calçados</option>
//           <option value="bolsas">Bolsas</option>
//         </select>
//       </div>
//       <div className="adicionar-produto-campo-item">
//         <p>Imagem do Produto</p>
//         <label htmlFor="file-input">
//           <img
//             className="adicionar-produto-imagem-miniatura"
//             src={!image ? upload_area : URL.createObjectURL(image)}
//             alt=""
//           />
//         </label>
//         <input
//           onChange={(e) => setImage(e.target.files[0])}
//           type="file"
//           name="image"
//           id="file-input"
//           accept="image/*"
//           hidden
//         />
//       </div>
//       <button
//         className="adicionar-produto-botao"
//         onClick={() => {
//           AddProduto();
//         }}
//       >
//         Editar
//       </button>
//     </div>
//   );
// };

// export default EditProduto;
