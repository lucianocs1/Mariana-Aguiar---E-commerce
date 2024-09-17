const express = require("express");
const {
  addCarrinho,
  removeDoCarrinho,
  getCarrinho,
} = require("../controllers/carrinhoController");
const fetchUser = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/addtocart", fetchUser, addCarrinho);
router.post("/removefromcart", fetchUser, removeDoCarrinho);
router.post("/getcart", fetchUser, getCarrinho);

module.exports = router;
