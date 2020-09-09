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
router.post("/updatePriceUser/:productId/:storeName", isAuth, updateUserReview);
router.get(
  "https://api.mapbox.com/geocoding/v5/mapbox.places/:productName.json?access_token=pk.eyJ1IjoiZWR2aWNhdHkiLCJhIjoiY2tla2tkaHZ6MDg3ODJxbXN2aW9ldnVmbCJ9.jzrSUZ18F2b4FErS8pHTGA"
);

module.exports = router;
