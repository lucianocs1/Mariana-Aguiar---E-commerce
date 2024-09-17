const express = require("express");
const path = require("path");
const cors = require("cors");
const multer = require("multer");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const produtoRoutes = require("./routes/produtoRoutes");
const carrinhoRoutes = require("./routes/carrinhoRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;

// Conecta ao banco de dados
connectDB();

// Middleware para tratar JSON
app.use(express.json());
app.use(cors()); // Habilita o CORS

// Configuração do Multer para upload de arquivos
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage });

// Rota para upload de imagens
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`,
  });
});

// Middleware para servir arquivos estáticos
app.use("/images", express.static("upload/images"));

// Configurações das rotas
app.use(authRoutes); // Rotas de autenticação
app.use("/", produtoRoutes); // Rotas de produtos
app.use(carrinhoRoutes); // Rotas de carrinho

// Inicia o servidor
app.listen(port, (error) => {
  if (!error) console.log(`Server rodando na porta: ${port}`);
  else console.log("Error:", error);
});
