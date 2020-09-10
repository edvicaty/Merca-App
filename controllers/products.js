const Product = require("../models/Product");
const Review = require("../models/Review");
const Location = require("../models/Location");
const Store = require("../models/Store");
const axios = require("axios");

exports.listAllProducts = async (req, res) => {
  admin = false;
  if (req.user.role === "ADMIN") {
    admin = true;
  }
  let allProducts = await Product.find().populate({
    path: "stores",
    populate: {
      path: "priceUser",
      model: "Review",
    },
  });
  res.render("products/index", { allProducts, admin });
};

exports.viewNewForm = (req, res) => {
  res.render("products/new");
};

exports.createProduct = async (req, res) => {
  const { name, type, store, priceProfeco, imageUrl } = req.body;
  //mapbox
  let minLong = "-100.00";
  let minLat = "19.00";
  let maxLong = "-98.00";
  let maxLat = "20.00";

  let response = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${store}.json?bbox=${minLong},${minLat},${maxLong},${maxLat}&access_token=pk.eyJ1IjoiZWR2aWNhdHkiLCJhIjoiY2tla2tkaHZ6MDg3ODJxbXN2aW9ldnVmbCJ9.jzrSUZ18F2b4FErS8pHTGA`
  );
  const location = await Location.create({
    municipality: response.data.features[2].context[1].text,
    coordinates: {
      long: response.data.features[0].center[0],
      lat: response.data.features[0].center[1],
    },
  });

  const newStore = await Store.create({
    storeName: store,
    priceProfeco,
    priceUser: [],
    locations: location,
  });
  await Product.create({
    name,
    type,
    stores: newStore,
    imageUrl,
  });

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
  admin = false;
  if (req.user.role === "ADMIN") {
    admin = true;
  }
  const id = req.params.id;
  const product = await Product.findById(id)
    .populate({
      path: "stores",
      populate: {
        path: "priceUser",
        model: "Review",
      },
    })
    .populate({
      path: "stores",
      populate: {
        path: "locations",
        model: "Location",
      },
    });
  arrayPricesProfeco = [];
  product.stores.forEach((store) => {
    if (typeof store.priceProfeco === "number") {
      arrayPricesProfeco.push(store.priceProfeco);
    }
  });

  averageProfeco = (
    arrayPricesProfeco.reduce((acc, currentValue) => acc + currentValue) /
    arrayPricesProfeco.length
  ).toFixed(2);

  maxProfeco = Math.max(...arrayPricesProfeco).toFixed(2);
  minProfeco = Math.min(...arrayPricesProfeco).toFixed(2);
  // console.log(averageProfeco, maxProfeco, minProfeco);

  res.render("products/detail", {
    product,
    stats: { averageProfeco, maxProfeco, minProfeco },
    admin,
  });
};

exports.updateUserReview = async (req, res) => {
  const { storeId, productId } = req.params;
  const { score } = req.body;

  const review = await Review.create({ score, user: req.user.id });

  const store = await Store.findOne({ _id: storeId });
  store.priceUser.push(review);
  store.save();

  let updatedProduct = await Product.findOne({ _id: productId }).populate({
    path: "stores",
    populate: {
      path: "priceUser",
      model: "Review",
    },
  });

  for (let i = 0; i < updatedProduct.stores.length; i++) {
    let sum = 0;
    for (let j = 0; j < updatedProduct.stores[i].priceUser.length; j++) {
      sum += updatedProduct.stores[i].priceUser[j].score;
    }
    if (sum > 0) {
      updatedProduct.stores[i].average = (
        sum / updatedProduct.stores[i].priceUser.length
      ).toFixed(2);
    }
    if (
      4 * updatedProduct.stores[i].priceProfeco >
      updatedProduct.stores[i].average >
      0
    ) {
      await updatedProduct.stores[i].save();
    }
  }
  res.redirect(`/detail/${productId}`);
};
