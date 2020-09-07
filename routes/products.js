const express = require("express");
const router = express.Router();
const {
  listAllProducts,
  viewNewForm,
  createProduct,
  viewEditForm,
  editProduct,
  deleteProduct
} = require('../controllers/products')

router.get('/', listAllProducts);
router.get('/new', viewNewForm);
router.post('/new', createProduct);
router.get('/edit/:id', viewEditForm);
router.post('/edit/:id', editProduct);
router.get('/delete/:id', deleteProduct);

module.exports = router