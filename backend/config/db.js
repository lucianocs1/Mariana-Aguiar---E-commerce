const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Use a variável de ambiente
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB: Conectado!");
  } catch (error) {
    console.error("MongoDB: erro na conexão:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
