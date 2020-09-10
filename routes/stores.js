const express = require("express");
const router = express.Router();
const {
  viewStoreForm,
  createStore,
  viewVerifyForm,
  verifyForm,
  deleteStore,
} = require("../controllers/stores");
const { isAuth, checkRole, catchErrors } = require("../middlewares");
router.get("/store/new/:productId", isAuth, viewStoreForm);
router.post("/store/new/:productId", isAuth, createStore);
//FALTA VERIFICAR TIENDAS
router.get("/store/checkVerify", isAuth, checkRole("ADMIN"), viewVerifyForm);
router.post("/store/verify/:storeId", isAuth, checkRole("ADMIN"), verifyForm);
router.get("/store/delete/:storeId", isAuth, checkRole("ADMIN"), deleteStore);

module.exports = router;
