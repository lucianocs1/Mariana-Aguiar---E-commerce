// const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

// export const fetchProductDetails = async (id) => {
//   try {
//     const response = await fetch(`${API_URL}/produto/${id}`, {
//       method: "GET",
//       headers: { Accept: "application/json" },
//     });
//     const data = await response.json();
//     return data[0]; // Assumindo que você está esperando um array com um único item
//   } catch (error) {
//     console.error("Erro ao buscar detalhes do produto:", error);
//     throw new Error("Falha ao carregar o produto");
//   }
// };

// export const uploadProductImage = async (image) => {
//   try {
//     const formData = new FormData();
//     formData.append("product", image);

//     const response = await fetch(`${API_URL}/upload`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//       },
//       body: formData,
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Erro ao fazer upload da imagem:", error);
//     throw new Error("Falha ao fazer upload da imagem");
//   }
// };

// export const updateProduct = async (id, product) => {
//   try {
//     const response = await fetch(`${API_URL}/edit/${id}`, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(product),
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Erro ao atualizar o produto:", error);
//     throw new Error("Falha ao atualizar o produto");
//   }
// };
