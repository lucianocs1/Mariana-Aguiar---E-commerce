import { BrowserRouter } from "react-router-dom"; // Importa o componente BrowserRouter para habilitar o roteamento
import Footer from "./Components/Footer/Footer"; // Importa o componente Footer
import Navbar from "./Components/Navbar/Navbar"; // Importa o componente Navbar
import Admin from "./Pages/Admin"; // Importa o componente Admin que gerencia as rotas administrativas

// Exporta a URL base do backend para ser usada em requisições API
export const backend_url = "http://localhost:4000";

// Exporta o símbolo da moeda para ser usado na exibição de preços
export const currency = "R$ ";

function App() {
  return (
    <BrowserRouter> {/* Habilita o roteamento para o aplicativo */}
      <div>
        <Navbar /> {/* Renderiza o componente Navbar */}
        <Admin /> {/* Renderiza o componente Admin, que contém as rotas administrativas */}
        <Footer /> {/* Renderiza o componente Footer */}
      </div>
    </BrowserRouter>
  );
}

export default App; // Exporta o componente App para ser o ponto de entrada da aplicação
