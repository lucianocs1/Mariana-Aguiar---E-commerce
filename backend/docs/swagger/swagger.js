const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    version: "1.0.0",
    title: "E-commerce - Mariana Aguiar",
    description: "Documentação das API's do projeto Mariana Aguiar",
    termsOfService: "https://mockapi.io",
    contact: {
      name: "Suporte Técnico",
      url: "https://www.exemplo.com/contato",
    },
    license: {
      name: "MIT License",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  servers: [
    {
      url: "http://localhost:8080",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "ID do usuário",
          },
          name: {
            type: "string",
            description: "Nome do usuário",
          },
          email: {
            type: "string",
            description: "E-mail do usuário",
          },
          password: {
            type: "string",
            description: "Senha do usuário",
          },
          dadosCarrinho: {
            type: "object",
            additionalProperties: {
              type: "integer",
            },
            description:
              "Objeto que contém os itens do carrinho, onde a chave é o ID do item e o valor é a quantidade",
          },
          date: {
            type: "string",
            format: "date-time",
            description: "Data de criação do usuário",
          },
        },
      },
      Produto: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description: "ID do produto",
          },
          name: {
            type: "string",
            description: "Nome do produto",
          },
          description: {
            type: "string",
            description: "Descrição do produto",
          },
          image: {
            type: "string",
            description: "URL da imagem do produto",
          },
          category: {
            type: "string",
            description: "Categoria do produto",
          },
          new_price: {
            type: "number",
            description: "Preço atual do produto",
          },
          old_price: {
            type: "number",
            description: "Preço antigo do produto",
          },
          date: {
            type: "string",
            format: "date-time",
            description: "Data de criação do produto",
          },
          available: {
            type: "boolean",
            description: "Disponibilidade do produto",
          },
        },
      },
      Carrinho: {
        type: "object",
        properties: {
          itemId: {
            type: "string",
            description: "ID do item no carrinho",
          },
          quantity: {
            type: "integer",
            description: "Quantidade do item no carrinho",
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },

  // paths: {
  //   "/carrinho/adicionar": {
  //     post: {
  //       tags: ["Carrinho"],
  //       summary: "Adiciona um item ao carrinho do usuário",
  //       requestBody: {
  //         required: true,
  //         content: {
  //           "application/json": {
  //             schema: {
  //               type: "object",
  //               properties: {
  //                 itemId: {
  //                   type: "string",
  //                   description: "ID do item a ser adicionado ao carrinho",
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       responses: {
  //         200: {
  //           description: "Item adicionado com sucesso",
  //         },
  //         404: {
  //           description: "Usuário não encontrado",
  //         },
  //         500: {
  //           description: "Erro ao adicionar item ao carrinho",
  //         },
  //       },
  //     },
  //   },
  //   "/carrinho/remover": {
  //     post: {
  //       tags: ["Carrinho"],
  //       summary: "Remove um item do carrinho do usuário",
  //       requestBody: {
  //         required: true,
  //         content: {
  //           "application/json": {
  //             schema: {
  //               type: "object",
  //               properties: {
  //                 itemId: {
  //                   type: "string",
  //                   description: "ID do item a ser removido do carrinho",
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       responses: {
  //         200: {
  //           description: "Item removido com sucesso",
  //         },
  //         400: {
  //           description:
  //             "Item não encontrado ou quantidade inválida no carrinho",
  //         },
  //         404: {
  //           description: "Usuário não encontrado",
  //         },
  //         500: {
  //           description: "Erro ao remover item do carrinho",
  //         },
  //       },
  //     },
  //   },
  //   "/carrinho": {
  //     get: {
  //       tags: ["Carrinho"],
  //       summary: "Retorna os itens do carrinho do usuário",
  //       responses: {
  //         200: {
  //           description: "Carrinho retornado com sucesso",
  //           content: {
  //             "application/json": {
  //               schema: {
  //                 type: "object",
  //                 additionalProperties: {
  //                   type: "integer",
  //                   description: "Quantidade de itens no carrinho",
  //                 },
  //               },
  //             },
  //           },
  //         },
  //         404: {
  //           description: "Usuário não encontrado",
  //         },
  //         500: {
  //           description: "Erro ao buscar o carrinho",
  //         },
  //       },
  //     },
  //   },
  // },
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./endpoints.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server"); // Your project's root file
});
