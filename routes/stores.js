const express = require("express");
const router = express.Router();
const {
  viewStoreForm,
  createStore,
  viewEditForm,
  editForm,
  deleteStore,
} = require("../controllers/stores");
const { isAuth, checkRole, catchErrors } = require("../middlewares");
router.get("/store/new/:productId", isAuth, viewStoreForm);
router.post("/store/new/:productId", isAuth, createStore);
router.get("/store/edit/:storeId", isAuth, viewEditForm);
router.post("/store/edit/:storeId", isAuth, editForm);
router.get("/store/delete/:storeId", isAuth, deleteStore);

module.exports = router;
