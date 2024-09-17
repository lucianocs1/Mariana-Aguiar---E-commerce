const express = require("express");
const { login, signup } = require("../controllers/authController");
const router = express.Router();

// Define as rotas para autenticação
router.post("/login", login); // Rota para login
router.post("/signup", signup); // Rota para registro de novo usuário

module.exports = router;
