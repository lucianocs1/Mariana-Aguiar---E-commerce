const User = require("../models/userModel");

const addCarrinho = async (req, res) => {
  /*
    #swagger.tags = ['Carrinho']
    #swagger.summary = 'Adiciona um item ao carrinho do usuário'
    #swagger.description = 'Este endpoint adiciona um item ao carrinho do usuário identificado pelo token JWT.'

    #swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Token JWT do usuário',
      required: true,
      type: 'string'
    }

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              itemId: { type: 'string', description: 'ID do item a ser adicionado' }
            },
            required: ['itemId']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Item adicionado com sucesso',
      content: {
        "application/json": {
          schema: {
            type: 'string',
            example: 'Adicionado'
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: 'Usuário não encontrado',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Usuário não encontrado' }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao adicionar item ao carrinho',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao adicionar ao carrinho' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */

  try {
    const userData = await User.findOne({ _id: req.user.id });

    if (!userData) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (!userData.dadosCarrinho) {
      userData.dadosCarrinho = {};
    }

    if (!userData.dadosCarrinho[req.body.itemId]) {
      userData.dadosCarrinho[req.body.itemId] = 0;
    }

    userData.dadosCarrinho[req.body.itemId] += 1;
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { dadosCarrinho: userData.dadosCarrinho }
    );
    res.send("Adicionado");
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao adicionar ao carrinho", error: error.message });
  }
};

const removeDoCarrinho = async (req, res) => {
  /*
    #swagger.tags = ['Carrinho']
    #swagger.summary = 'Remove um item do carrinho do usuário'
    #swagger.description = 'Este endpoint remove um item do carrinho do usuário identificado pelo token JWT.'

    #swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Token JWT do usuário',
      required: true,
      type: 'string'
    }

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              itemId: { type: 'string', description: 'ID do item a ser removido' }
            },
            required: ['itemId']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Item removido com sucesso',
      content: {
        "application/json": {
          schema: {
            type: 'string',
            example: 'Removido'
          }
        }
      }
    }

    #swagger.responses[400] = {
      description: 'Item não encontrado ou quantidade inválida',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Item não encontrado no carrinho ou quantidade inválida' }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao remover item do carrinho',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao remover do carrinho' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */

  try {
    const userData = await User.findOne({ _id: req.user.id });

    if (!userData) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    if (userData.dadosCarrinho && userData.dadosCarrinho[req.body.itemId] > 0) {
      userData.dadosCarrinho[req.body.itemId] -= 1;
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { dadosCarrinho: userData.dadosCarrinho }
      );
      res.send("Removido");
    } else {
      res.status(400).json({
        message: "Item não encontrado no carrinho ou quantidade inválida",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao remover do carrinho", error: error.message });
  }
};

const getCarrinho = async (req, res) => {
  /*
    #swagger.tags = ['Carrinho']
    #swagger.summary = 'Busca o carrinho do usuário'
    #swagger.description = 'Este endpoint retorna os itens do carrinho do usuário identificado pelo token JWT.'

    #swagger.parameters['Authorization'] = {
      in: 'header',
      description: 'Token JWT do usuário',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Carrinho retornado com sucesso',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            additionalProperties: {
              type: 'integer',
              description: 'Quantidade de itens no carrinho'
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: 'Usuário não encontrado',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Usuário não encontrado' }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao buscar o carrinho',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao buscar o carrinho' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */

  try {
    const userData = await User.findOne({ _id: req.user.id });

    if (!userData) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.json(userData.dadosCarrinho || {});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar o carrinho", error: error.message });
  }
};

module.exports = { addCarrinho, removeDoCarrinho, getCarrinho };
