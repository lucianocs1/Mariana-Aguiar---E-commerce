import Navbar from "./Components/Navbar/Navbar"; // Importa o componente Navbar
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Importa as funcionalidades de roteamento do React Router
import Shop from "./Pages/Loja"; // Importa a página de loja
import Carrinho from "./Pages/Carrinho"; // Importa a página de carrinho
import Product from "./Pages/Produto"; // Importa a página de produto
import Footer from "./Components/Footer/Footer"; // Importa o componente Footer
import ShopCategory from "./Pages/CategoriaLoja"; // Importa a página de categoria da loja
import banner_calcados from "./Components/Assets/banner_calcados.png"; // Importa a imagem de banner para calçados
import banner_roupas from "./Components/Assets/banner1.png"; // Importa a imagem de banner para roupas
import banner_bolsas from "./Components/Assets/banner_bolsas.png"; // Importa a imagem de banner para bolsas
import LoginSignup from "./Pages/Login"; // Importa a página de login e cadastro

export const backend_url = "http://localhost:4000"; // Define a URL base do backend
export const moeda = "R$ "; // Define o símbolo da moeda

function App() {
  return (
    <div>
      <Router>
        {/* Componente Navbar exibido em todas as páginas */}
        <Navbar />
        <Routes>
          {/* Rota para a página principal da loja, com todos os gêneros */}
          <Route path="/" element={<Shop gender="all" />} />
          {/* Rota para a página de roupas com o banner correspondente */}
          <Route
            path="/roupas"
            element={<ShopCategory banner={banner_roupas} category="roupas" />}
          />
          {/* Rota para a página de calçados com o banner correspondente */}
          <Route
            path="/calcados"
            element={<ShopCategory banner={banner_calcados} category="calcados" />}
          />
          {/* Rota para a página de bolsas com o banner correspondente */}
          <Route
            path="/bolsas"
            element={<ShopCategory banner={banner_bolsas} category="bolsas" />}
          />
          {/* Rota para a página de detalhes do produto, com suporte para ID do produto */}
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          {/* Rota para a página do carrinho de compras */}
          <Route path="/carrinho" element={<Carrinho />} />
          {/* Rota para a página de login e cadastro */}
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        {/* Componente Footer exibido em todas as páginas */}
        <Footer />
      </Router>
    </div>
  );
}

export default App; // Exporta o componente App para uso em outras partes da aplicação
