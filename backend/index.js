const express = require("express"); // Importa o módulo Express para criar o servidor e gerenciar rotas
const path = require("path"); // Importa o módulo path para manipulação de caminhos de arquivos
const cors = require("cors"); // Importa o módulo CORS para permitir requisições de diferentes origens
const multer = require("multer"); // Importa o módulo Multer para manipulação de uploads de arquivos
const connectDB = require("./config/db"); // Importa a função para conectar ao banco de dados
const authRoutes = require("./routes/authRoutes"); // Importa as rotas de autenticação
const produtoRoutes = require("./routes/produtoRoutes"); // Importa as rotas de produtos
const carrinhoRoutes = require("./routes/carrinhoRoutes"); // Importa as rotas de carrinho
require("dotenv").config(); // Carrega variáveis de ambiente a partir do arquivo .env

const app = express(); // Cria uma instância do aplicativo Express
const port = process.env.PORT || 4000; // Define a porta do servidor (padrão: 4000)

// Conecta ao banco de dados
connectDB();

// Middleware para tratar JSON nas requisições
app.use(express.json());

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Configuração do Multer para gerenciamento de uploads de arquivos
const storage = multer.diskStorage({
  destination: "./upload/images", // Diretório onde os arquivos serão armazenados
  filename: (req, file, cb) => {
    // Define o nome do arquivo com base no campo do formulário, data atual e extensão do arquivo original
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage }); // Cria uma instância do Multer com a configuração de armazenamento

// Rota para upload de imagens
app.post("/upload", upload.single("product"), (req, res) => {
  // Envia a URL da imagem como resposta após o upload
  res.json({
    success: 1,
    image_url: `/images/${req.file.filename}`,
  });
});

// Middleware para servir arquivos estáticos (imagens) a partir do diretório de uploads
app.use("/images", express.static("upload/images"));

// Configurações das rotas
app.use(authRoutes); // Configura as rotas de autenticação
app.use("/", produtoRoutes); // Configura as rotas de produtos
app.use(carrinhoRoutes); // Configura as rotas de carrinho

// Inicia o servidor
app.listen(port, (error) => {
  // Loga uma mensagem indicando que o servidor está rodando ou um erro, se houver
  if (!error) console.log(`Server rodando na porta: ${port}`);
  else console.log("Error:", error);
});
