const Product = require('../models/Product');

exports.listAllProducts = async (req, res) => {
  let allProducts = await Product.find()
  res.render('products/index', {allProducts} )
}

exports.viewNewForm = (req, res) => {
  res.render('products/new')
}

exports.createProduct = async (req, res) => {
  const {name, type, store, priceUser} = req.body
  
  let appendStore = {
    storeName: store,
    priceProfeco: 0,
    priceUser: []
  }

  appendStore.priceUser.push(priceUser)

  const newProduct = await Product.create({
    name,
    type,
    stores: appendStore
  })
  console.log(newProduct)
  res.redirect('/')
}

exports.viewEditForm = async (req, res) => {
  const productId = req.params.id
  const product = await Product.findById(productId)
  res.render('products/edit', product)
}

exports.editProduct = async (req, res) => {
  const productId = req.params.id
  const {name, type} = req.body
  await Product.findByIdAndUpdate(productId, {name, type}, {new: true})
  res.redirect('/')
}

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id
  await Product.findByIdAndDelete(productId)
  res.redirect('/')
}