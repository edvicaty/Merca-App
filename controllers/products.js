const Product = require("../models/Product");
const Review = require("../models/Review");

exports.listAllProducts = async (req, res) => {
  let allProducts = await Product.find().populate({
    path: "stores",
    populate: {
      path: "priceUser",
      model: "Review",
    },
  });
  res.render("products/index", { allProducts });
};

exports.viewNewForm = (req, res) => {
  res.render("products/new");
};

exports.createProduct = async (req, res) => {
  const { name, type, store, priceProfeco } = req.body;
  console.log(`typeeeeeee`, type);

  let appendStore = {
    storeName: store,
    priceProfeco,
    priceUser: [],
  };

  const newProduct = await Product.create({
    name,
    type,
    stores: appendStore,
  });
  console.log(newProduct);
  res.redirect("/");
};

exports.viewEditForm = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);
  res.render("products/edit", product);
};

exports.editProduct = async (req, res) => {
  const productId = req.params.id;
  const { name, type } = req.body;
  await Product.findByIdAndUpdate(productId, { name, type }, { new: true });
  res.redirect("/");
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  await Product.findByIdAndDelete(productId);
  res.redirect("/");
};
exports.viewProductType = async (req, res) => {
  const type = req.params.type;
  const products = await Product.find({ type: type }).populate(
    "stores.priceUser"
  );
  res.render("products/detailType", { products });
};

exports.viewProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).populate("stores.priceUser");
  arrayPricesProfeco = [];
  product.stores.forEach((store) => {
    arrayPricesProfeco.push(store.priceProfeco);
  });
  averageProfeco =
    arrayPricesProfeco.reduce((acc, currentValue) => acc + currentValue) /
    arrayPricesProfeco.length;
  maxProfeco = Math.max(arrayPricesProfeco);
  minProfeco = Math.min(arrayPricesProfeco);
  console.log(averageProfeco, maxProfeco, minProfeco);

  res.render("products/detail", {
    product,
    stats: { averageProfeco, maxProfeco, minProfeco },
  });
};

exports.updateUserReview = async (req, res) => {
  const { productId, storeName } = req.params;
  const { score } = req.body;
  const review = await Review.create({ score, user: req.user.id });
  let product = await Product.findOne({ _id: productId });
  let productStores = product.stores;
  let specificStoreArray = productStores.filter(
    (store) => store.storeName === storeName
  );

  specificStoreArray[0].priceUser.push(review._id);
  await product.save();

  //for para las tiendas
  let updatedProduct = await Product.findOne({ _id: productId }).populate(
    "stores.priceUser"
  );

  for (let i = 0; i < updatedProduct.stores.length; i++) {
    let sum = 0;
    for (let j = 0; j < updatedProduct.stores[i].priceUser.length; j++) {
      sum += updatedProduct.stores[i].priceUser[j].score;
    }
    updatedProduct.stores[i].average =
      sum / updatedProduct.stores[i].priceUser.length;
    await updatedProduct.save();
  }
  res.redirect(`/detail/${productId}`);
};
