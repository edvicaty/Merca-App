const express = require("express");
const router = express.Router();
const {
  listAllProducts,
  viewNewForm,
  createProduct,
  viewEditForm,
  editProduct,
  deleteProduct,
  viewProductType,
  updateUserReview,
  viewProduct,
} = require("../controllers/products");

router.get("/", listAllProducts);
router.get("/new", viewNewForm);
router.post("/new", createProduct);
router.get("/edit/:id", viewEditForm);
router.post("/edit/:id", editProduct);
router.get("/delete/:id", deleteProduct);
router.get("/type/:type", viewProductType);
router.get("/detail/:id", viewProduct);
router.post("/updatePriceUser/:productId/:storeName", updateUserReview);

module.exports = router;
