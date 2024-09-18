const express = require("express"); // Importa o módulo Express para criar roteadores e gerenciar rotas

// Importa as funções do controlador de produtos
const {
  getAllProducts, // Função para obter todos os produtos
  getNewCollections, // Função para obter novas coleções
  getPopular, // Função para obter produtos populares
  getRelatedProducts, // Função para obter produtos relacionados
  addProduct, // Função para adicionar um novo produto
  removeProduct, // Função para remover um produto existente
  // editProduto, // Função para editar um produto (comentei para uso futuro)
  getProductById, // Função para obter um produto específico pelo ID
} = require("../controllers/produtoController");

const router = express.Router(); // Cria um roteador para gerenciar rotas específicas

// Define a rota para obter todos os produtos
router.get("/allproducts", getAllProducts);

// Define a rota para obter novas coleções
router.get("/newcollections", getNewCollections);

// Define a rota para obter produtos populares em uma categoria específica
router.get("/popularinwomen", getPopular);

// Define a rota para obter detalhes de um produto específico pelo ID
router.get("/produto/:id", getProductById);

// Define a rota para obter produtos relacionados
router.post("/relatedproducts", getRelatedProducts);

// Define a rota para adicionar um novo produto
router.post("/addproduct", addProduct);

// Define a rota para remover um produto existente
router.post("/removeproduct", removeProduct);

module.exports = router; // Exporta o roteador para ser utilizado em outras partes da aplicação
