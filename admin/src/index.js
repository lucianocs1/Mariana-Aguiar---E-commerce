import React from "react"; // Importa a biblioteca React
import ReactDOM from "react-dom/client"; // Importa o módulo ReactDOM para renderização
import "./index.css"; // Importa o arquivo de estilo global para a aplicação
import App from "./App"; // Importa o componente principal da aplicação

// Cria o ponto de entrada para a aplicação React no DOM
const root = ReactDOM.createRoot(document.getElementById("root"));

// Renderiza o componente App dentro do elemento com ID "root"
root.render(<App />);
