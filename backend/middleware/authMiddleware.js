const jwt = require("jsonwebtoken"); // Importa o módulo jsonwebtoken para manipulação de tokens JWT

// Middleware para verificar e extrair o usuário do token JWT
const fetchUser = (req, res, next) => {
  // Obtém o token do cabeçalho da requisição
  const token = req.header("auth-token");

  // Verifica se o token foi fornecido
  if (!token) {
    // Retorna uma resposta de erro se o token estiver ausente
    return res
      .status(401)
      .send({ errors: "Autentique usando um token válido" });
  }

  try {
    // Verifica e decodifica o token usando a chave secreta
    const data = jwt.verify(token, process.env.JWT_SECRET);
    
    // Adiciona os dados do usuário à requisição para acesso posterior
    req.user = data.user;
    
    // Passa o controle para o próximo middleware ou rota
    next();
  } catch (error) {
    // Retorna uma resposta de erro se o token não for válido ou se ocorrer um erro na verificação
    res.status(401).send({ errors: "Autentique usando um token válido" });
  }
};

module.exports = fetchUser; // Exporta o middleware fetchUser para ser utilizado em outras partes do aplicativo
