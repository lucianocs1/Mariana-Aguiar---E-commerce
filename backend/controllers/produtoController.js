const Product = require("../models/produtoModel");
const mongoose = require("mongoose");
const fs = require("fs");

const getAllProducts = async (req, res) => {
  /*
    #swagger.tags = ['Produtos']
    #swagger.summary = 'Retorna todos os produtos'
    #swagger.description = 'Este endpoint retorna todos os produtos disponíveis no banco de dados.'

    #swagger.responses[200] = {
      description: 'Lista de produtos retornada com sucesso',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product'
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao buscar produtos',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao buscar produtos' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */
  
  try {
    const products = await Product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error: error.message });
  }
};

const getProductById = async (req, res) => {
  /*
    #swagger.tags = ['Produtos']
    #swagger.summary = 'Retorna os detalhes de um produto pelo ID'
    #swagger.description = 'Este endpoint busca e retorna os detalhes de um produto específico com base no ID fornecido.'

    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID do produto a ser buscado',
      required: true,
      type: 'string'
    }

    #swagger.responses[200] = {
      description: 'Detalhes do produto retornados com sucesso',
      content: {
        "application/json": {
          schema: {
            $ref: '#/components/schemas/Product'
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: 'Produto não encontrado',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Produto não encontrado' }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao buscar o produto',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao buscar o produto' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */

  try {
    const { id } = req.params;

    // Busca o produto diretamente usando o ID fornecido
    const product = await Product.findOne({ id: id });

    if (!product) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Erro ao buscar o produto:", error.message);
    res.status(500).json({ message: "Erro ao buscar o produto" });
  }
};


// const getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(id);
//     console.log("entrei aqui");
//     // Verifica se o ID é um ObjectId válido
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "ID de produto inválido" });
//     }

//     // Busca o produto diretamente usando o ID
//     const product = await Product.findById(id);

//     if (!product) {
//       return res.status(404).json({ message: "Produto não encontrado" });
//     }

//     res.status(200).json(product);
//   } catch (error) {
//     console.error("Erro ao buscar o produto:", error);
//     res.status(500).json({ message: "Erro ao buscar o produto" });
//   }
// };

const getNewCollections = async (req, res) => {
  /*
    #swagger.tags = ['Produtos']
    #swagger.summary = 'Retorna os últimos 8 produtos da coleção'
    #swagger.description = 'Este endpoint retorna os últimos 8 produtos adicionados à coleção.'

    #swagger.responses[200] = {
      description: 'Lista dos últimos 8 produtos retornada com sucesso',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product'
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao buscar os produtos',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao buscar os produtos' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */

  const products = await Product.find({});
  const arr = products.slice(-8);  // Pega os últimos 8 produtos
  res.send(arr);
};


const getPopular = async (req, res) => {
  /*
    #swagger.tags = ['Produtos']
    #swagger.summary = 'Retorna os 4 produtos mais populares da categoria "roupas"'
    #swagger.description = 'Este endpoint retorna os primeiros 4 produtos populares da categoria "roupas".'

    #swagger.responses[200] = {
      description: 'Lista dos 4 produtos populares retornada com sucesso',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product'
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao buscar os produtos populares',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao buscar os produtos populares' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */

  const products = await Product.find({ category: "roupas" });
  const arr = products.slice(0, 4);  // Pega os primeiros 4 produtos
  console.log(arr);
  res.send(arr);
};


const getRelatedProducts = async (req, res) => {
  /*
    #swagger.tags = ['Produtos']
    #swagger.summary = 'Retorna produtos relacionados com base na categoria'
    #swagger.description = 'Este endpoint retorna até 4 produtos relacionados com base na categoria fornecida no corpo da requisição.'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              category: { type: 'string', description: 'Categoria dos produtos relacionados' }
            },
            required: ['category']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Lista de produtos relacionados retornada com sucesso',
      content: {
        "application/json": {
          schema: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Product'
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao buscar os produtos relacionados',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao buscar os produtos relacionados' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */

  const { category } = req.body;
  const products = await Product.find({ category });
  const arr = products.slice(0, 4);  // Pega os primeiros 4 produtos relacionados
  res.send(arr);
};


const addProduct = async (req, res) => {
  /*
    #swagger.tags = ['Produtos']
    #swagger.summary = 'Adiciona um novo produto'
    #swagger.description = 'Este endpoint adiciona um novo produto ao banco de dados.'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Nome do produto' },
              description: { type: 'string', description: 'Descrição do produto' },
              image: { type: 'string', description: 'URL da imagem do produto' },
              category: { type: 'string', description: 'Categoria do produto' },
              new_price: { type: 'number', description: 'Preço novo do produto' },
              old_price: { type: 'number', description: 'Preço antigo do produto' }
            },
            required: ['name', 'description', 'image', 'category', 'new_price']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Produto adicionado com sucesso',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              name: { type: 'string', example: 'Nome do produto' }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao adicionar o produto',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao adicionar o produto' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */

  const products = await Product.find({});
  const id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  const product = new Product({
    id,
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  res.json({ success: true, name: req.body.name });
};


const removeProduct = async (req, res) => {
  /*
    #swagger.tags = ['Produtos']
    #swagger.summary = 'Remove um produto'
    #swagger.description = 'Este endpoint remove um produto existente no banco de dados com base no ID fornecido.'

    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              id: { type: 'number', description: 'ID do produto a ser removido' },
              name: { type: 'string', description: 'Nome do produto a ser removido' }
            },
            required: ['id']
          }
        }
      }
    }

    #swagger.responses[200] = {
      description: 'Produto removido com sucesso',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              success: { type: 'boolean', example: true },
              name: { type: 'string', example: 'Nome do produto removido' }
            }
          }
        }
      }
    }

    #swagger.responses[404] = {
      description: 'Produto não encontrado',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Produto não encontrado' }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: 'Erro ao remover o produto',
      content: {
        "application/json": {
          schema: {
            type: 'object',
            properties: {
              message: { type: 'string', example: 'Erro ao remover o produto' },
              error: { type: 'string' }
            }
          }
        }
      }
    }
  */

  await Product.findOneAndDelete({ id: req.body.id });
  res.json({ success: true, name: req.body.name });
};


// const editProduto = async (req, res) => {
//   try {
//     // Obtém o ID do produto a ser editado
//     const { id } = req.params;
//     // Obtém os dados atualizados do corpo da requisição
//     const updatedData = req.body;

//     // Se um novo arquivo de imagem for enviado, inclui-o na atualização
//     if (req.file) {
//       updatedData.image = `${req.file.filename}`; // Correção na interpolação da string

//       // Remove o arquivo de imagem antigo
//       const oldProduto = await Product.findById(id); // Usando o nome correto do modelo
//       if (oldProduto && oldProduto.image) {
//         // fs.unlink(`uploads/${oldProduto.image}`, (err) => {
//         fs.unlink(`${oldProduto.image}`, (err) => {
//           // Correção na interpolação
//           if (err) console.log(err);
//         });
//       }
//     }

//     // Atualiza o produto no banco de dados
//     const produto = await Product.findByIdAndUpdate(id, updatedData, {
//       new: true,
//     });
//     if (!produto) {
//       return res.json({ success: false, message: "Produto não encontrado" });
//     }

//     // Responde com sucesso e uma mensagem de confirmação
//     res.json({ success: true, message: "Produto atualizado", data: produto });
//   } catch (error) {
//     // Em caso de erro, loga o erro no console
//     console.log(error);
//     // Responde com um JSON indicando falha e uma mensagem de erro
//     res.json({ success: false, message: "Erro ao atualizar produto" });
//   }
// };

module.exports = {
  getAllProducts,
  getNewCollections,
  getPopular,
  getRelatedProducts,
  addProduct,
  removeProduct,
  // editProduto,
  getProductById,
};
