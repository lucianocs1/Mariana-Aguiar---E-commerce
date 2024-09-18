const express = require("express"); // Importa o módulo Express para criar roteadores e gerenciar rotas
const {
  addCarrinho, // Função para adicionar itens ao carrinho
  removeDoCarrinho, // Função para remover itens do carrinho
  getCarrinho, // Função para obter itens do carrinho
} = require("../controllers/carrinhoController"); // Importa as funções do controlador de carrinho
const fetchUser = require("../middleware/authMiddleware"); // Importa o middleware para autenticação de usuários
const router = express.Router(); // Cria um roteador para gerenciar rotas específicas

// Define a rota para adicionar itens ao carrinho, com autenticação de usuário
router.post("/addtocart", fetchUser, addCarrinho);

// Define a rota para remover itens do carrinho, com autenticação de usuário
router.post("/removefromcart", fetchUser, removeDoCarrinho);

// Define a rota para obter itens do carrinho, com autenticação de usuário
router.post("/getcart", fetchUser, getCarrinho);

module.exports = router; // Exporta o roteador para ser utilizado em outras partes da aplicação
