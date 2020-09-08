const express = require("express");
const router = express.Router();
const { viewStoreForm } = require("../controllers/stores");
router.get("/store/new", viewStoreForm);
module.exports = router;
