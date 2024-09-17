const { MongoClient } = require("mongodb");
const fs = require("fs");

// URL de conexão MongoDB Atlas
const url = "mongodb+srv://lncfilho:lcnfilho123@cluster0.mkkqao8.mongodb.net";
const dbName = "e-commerce"; // Nome do seu banco de dados

// Função para gerar documentação
async function gerarDocumentacao() {
  const client = new MongoClient(url);

  try {
    // Conectando ao banco de dados
    await client.connect();
    console.log("Conectado ao MongoDB");
    const db = client.db(dbName);

    // Coletando lista de coleções
    const colecoes = await db.listCollections().toArray();

    // Objeto que armazenará a documentação
    let documentacao = {
      database: dbName,
      collections: [],
    };

    // Iterar sobre cada coleção
    for (const colecao of colecoes) {
      const nomeColecao = colecao.name;
      const documentos = await db.collection(nomeColecao).findOne();
      const indices = await db.collection(nomeColecao).indexes();

      let estruturaColecao = {
        name: nomeColecao,
        exampleDocument: documentos
          ? JSON.stringify(documentos, null, 2)
          : "Nenhum documento encontrado",
        indexes: indices.map((indice) => ({
          key: indice.key,
          unique: indice.unique || false,
          name: indice.name,
        })),
      };

      documentacao.collections.push(estruturaColecao);
    }

    // Escrevendo a documentação em um arquivo JSON
    fs.writeFileSync(
      "documentacao.json",
      JSON.stringify(documentacao, null, 2)
    );
    console.log(
      "Documentação gerada com sucesso! Verifique o arquivo documentacao.json"
    );
  } catch (err) {
    console.error("Erro ao gerar documentação:", err);
  } finally {
    // Fechar a conexão com o MongoDB
    await client.close();
  }
}

// Executa a função para gerar a documentação
gerarDocumentacao();
