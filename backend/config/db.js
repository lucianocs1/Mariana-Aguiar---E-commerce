const mongoose = require("mongoose"); // Importa o módulo mongoose para interagir com o MongoDB

// Função assíncrona para conectar ao banco de dados MongoDB
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Obtém a URI de conexão do MongoDB das variáveis de ambiente
    
    // Conecta ao MongoDB usando a URI e opções de configuração
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true, // Usa o novo analisador de URL para conectar
      useUnifiedTopology: true, // Usa o mecanismo de gerenciamento de topologia unificado
    });
    
    console.log("MongoDB: Conectado!"); // Mensagem de sucesso ao conectar
  } catch (error) {
    console.error("MongoDB: erro na conexão:", error); // Mensagem de erro se a conexão falhar
    process.exit(1); // Sai do processo com código de erro 1
  }
};

module.exports = connectDB; // Exporta a função connectDB para ser usada em outros arquivos

