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
const { isAuth, checkRole, catchErrors } = require("../middlewares");

router.get("/", isAuth, catchErrors(listAllProducts));
router.get("/new", isAuth, checkRole("ADMIN"), viewNewForm);
router.post("/new", isAuth, checkRole("ADMIN"), createProduct);
router.get("/edit/:id", isAuth, checkRole("ADMIN"), viewEditForm);
router.post("/edit/:id", isAuth, checkRole("ADMIN"), editProduct);
router.get("/delete/:id", isAuth, checkRole("ADMIN"), deleteProduct);
router.get("/type/:type", isAuth, viewProductType);
router.get("/detail/:id", isAuth, viewProduct);
router.post("/updatePriceUser/:storeId/:productId", isAuth, updateUserReview);

module.exports = router;
