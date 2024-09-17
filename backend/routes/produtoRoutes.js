const express = require("express");

const {
  getAllProducts,
  getNewCollections,
  getPopular,
  getRelatedProducts,
  addProduct,
  removeProduct,
  // editProduto,
  getProductById,
} = require("../controllers/produtoController");
const router = express.Router();

router.get("/allproducts", getAllProducts);
router.get("/newcollections", getNewCollections);
router.get("/popularinwomen", getPopular);
router.get("/produto/:id", getProductById);
// router.put("/edit/:id", editProduto);
router.post("/relatedproducts", getRelatedProducts);
router.post("/addproduct", addProduct);
router.post("/removeproduct", removeProduct);

module.exports = router;
