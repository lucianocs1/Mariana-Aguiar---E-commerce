import React, { useContext, useEffect, useState } from "react";
import NavProduto from "../Components/NavProduto/NavProduto";
import ProductDisplay from "../Components/AreaProduto/AreaProduto";
import DescriptionBox from "../Components/DescricaoProd/DescricaoProd";
import RelatedProducts from "../Components/ProdutosRelacionados/ProdutosRelacionados";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Product = () => {
  // Obtém os produtos e outras funções do contexto ShopContext
  const { products } = useContext(ShopContext);

  // Obtém o ID do produto da URL
  const { productId } = useParams();

  // Estado para armazenar o produto selecionado
  const [product, setProduct] = useState(null);

  // Efeito para atualizar o estado do produto sempre que a lista de produtos ou o ID do produto mudar
  useEffect(() => {
    // Encontra o produto na lista de produtos com base no ID da URL
    const foundProduct = products.find((e) => e.id === Number(productId));
    setProduct(foundProduct); // Atualiza o estado com o produto encontrado
  }, [products, productId]);

  // Renderiza o componente somente se um produto for encontrado
  return product ? (
    <div>
      {/* Exibe o componente de breadcrumbs com base no produto atual */}
      <NavProduto product={product} />

      {/* Exibe o componente de detalhes do produto */}
      <ProductDisplay product={product} />

      {/* Exibe o componente de descrição do produto */}
      <DescriptionBox />

      {/* Exibe o componente de produtos relacionados com base no produto atual */}
      <RelatedProducts id={product.id} category={product.category} />
    </div>
  ) : null; // Retorna null enquanto o produto não é encontrado
};

export default Product;
