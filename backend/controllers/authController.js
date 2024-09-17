const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Controlador para autenticação do usuário
const login = async (req, res) => {
  /*
    #swagger.tags = ['Autenticação']
    #swagger.summary = 'Realiza o login do usuário'
    #swagger.description = 'Este endpoint autentica o usuário com base no email e senha fornecidos e retorna um token JWT se bem-sucedido.'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              email: { type: 'string', description: 'E-mail do usuário' },
              password: { type: 'string', description: 'Senha do usuário' }
            },
            required: ['email', 'password']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Login bem-sucedido',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              token: { type: 'string', description: 'Token JWT de autenticação' },
              username: { type: 'string', description: 'Nome do usuário' }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: 'Falha na autenticação',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: false },
              errors: { type: 'string', example: 'E-mail ou senha está incorreto' }
            }
          }
        }
      }
    }
  */
  // Encontra um usuário pelo e-mail fornecido
  const user = await User.findOne({ email: req.body.email });
  if (user && (await user.comparePassword(req.body.password))) {
    const token = jwt.sign(
      { user: { id: user.id, name: user.name } },
      process.env.JWT_SECRET, // Usa a chave secreta do .env
      { expiresIn: "1h" } // Define a expiração do token
    );
    res.json({ success: true, token, username: user.name });
  } else {
    res.status(400).json({
      success: false,
      errors: "E-mail ou senha está incorreto",
    });
  }
};

// Controlador para criação de novos usuários
const signup = async (req, res) => {
  /*
    #swagger.tags = ['Autenticação']
    #swagger.summary = 'Cria um novo usuário'
    #swagger.description = 'Este endpoint registra um novo usuário, cria um carrinho padrão e retorna um token JWT para autenticação.'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              username: { type: 'string', description: 'Nome do usuário' },
              email: { type: 'string', description: 'E-mail do usuário' },
              password: { type: 'string', description: 'Senha do usuário' }
            },
            required: ['username', 'email', 'password']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Registro bem-sucedido',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              token: { type: 'string', description: 'Token JWT de autenticação' },
              username: { type: 'string', description: 'Nome do usuário' }
            }
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: 'E-mail inválido ou já em uso',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: false },
              errors: { type: 'string', example: 'E-mail inválido ou já em uso' }
            }
          }
        }
      }
    }
  */

  // Verifica se o formato do e-mail é válido
  if (!isEmailValid(req.body.email)) {
    return res.status(400).json({ success: false, errors: "E-mail inválido" });
  }

  // Verifica se o e-mail já está em uso
  const check = await User.findOne({ email: req.body.email });
  if (check) {
    return res
      .status(400)
      .json({ success: false, errors: "Este e-mail já está em uso" });
  }

  const carrinho = Array.from({ length: 300 }, () => 0);
  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    dadosCarrinho: carrinho,
  });
  await user.save();
  const token = jwt.sign(
    { user: { id: user.id, name: user.name } },
    process.env.JWT_SECRET, // Usa a chave secreta do .env
    { expiresIn: "1h" } // Define a expiração do token
  );
  res.json({ success: true, token, username: user.name });
};

module.exports = { login, signup };
