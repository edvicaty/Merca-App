const express = require("express");
const router = express.Router();
const {
  viewStoreForm,
  createStore,
  viewVerifyForm,
  verifyStore,
  deleteStore,
  unVerifyStore,
  updateStore,
  viewUpdateStore,
} = require("../controllers/stores");
const { isAuth, checkRole, catchErrors } = require("../middlewares");
router.get("/store/new/:productId", isAuth, viewStoreForm);
router.post("/store/new/:productId", isAuth, createStore);
router.get("/store/checkVerify", isAuth, checkRole("ADMIN"), viewVerifyForm);
router.get("/store/verify/:storeId", isAuth, checkRole("ADMIN"), verifyStore);
router.get("/store/delete/:storeId", isAuth, checkRole("ADMIN"), deleteStore);
router.get(
  "/store/unverify/:storeId",
  isAuth,
  checkRole("ADMIN"),
  unVerifyStore
);
router.post("/store/update/:storeId", isAuth, checkRole("ADMIN"), updateStore);
router.get(
  "/store/seeVerify/:storeId",
  isAuth,
  checkRole("ADMIN"),
  viewUpdateStore
);

module.exports = router;
