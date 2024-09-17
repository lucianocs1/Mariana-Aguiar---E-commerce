import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Loja";
import Carrinho from "./Pages/Carrinho";
import Product from "./Pages/Produto";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/CategoriaLoja";
import banner_calcados from "./Components/Assets/banner_calcados.png";
import banner_roupas from "./Components/Assets/banner1.png";
import banner_bolsas from "./Components/Assets/banner_bolsas.png";
import LoginSignup from "./Pages/Login";
export const backend_url = "http://localhost:4000";
export const moeda = "R$ ";

function App() {
  // const [showLogin,setShowLogin] = useState(false);

  return (
    <div>
      <Router>
        {/* {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>} */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route
            path="/roupas"
            element={<ShopCategory banner={banner_roupas} category="roupas" />}
          />
          <Route
            path="/calcados"
            element={
              <ShopCategory banner={banner_calcados} category="calcados" />
            }
          />
          <Route
            path="/bolsas"
            element={<ShopCategory banner={banner_bolsas} category="bolsas" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
