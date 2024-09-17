const carrinhoController = require("../../controllers/carrinhoController");
const produtoController = require("../../controllers/produtoController");
const authController = require("../../controllers/authController");

module.exports = (app) => {
  app.post("/login", authController.login);
  app.post("/signup", authController.signup);
  app.post("/addtocart", carrinhoController.addCarrinho);
  app.post("/removefromcart", carrinhoController.removeDoCarrinho);
  app.get("/getcart", carrinhoController.getCarrinho);
  app.get("/allproducts", produtoController.getAllProducts);
  app.get("/newcollections", produtoController.getNewCollections);
  app.get("/popularinwomen", produtoController.getPopular);
  app.get("/produto/:id", produtoController.getProductById);
  //   app.put("/edit/:id", produtoController.editProduto);
  app.post("/relatedproducts", produtoController.getRelatedProducts);
  app.post("/addproduct", produtoController.addProduct);
  app.post("/removeproduct", produtoController.removeProduct);
};
