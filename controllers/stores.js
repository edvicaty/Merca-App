const Product = require("../models/Product");
const Store = require("../models/Store");
const Location = require("../models/Location");
const axios = require("axios");
const { findOne } = require("../models/Product");

exports.viewStoreForm = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.render("stores/new", product);
};
exports.createStore = async (req, res) => {
  const { productId } = req.params;
  const { storeTitle, storeColonia, storeMunicipality, long, lat } = req.body;
  const mapQuery = `${storeTitle}%20Colonia%20${storeColonia}%20Delegacion%20${storeMunicipality}%20`;

  // let minLong = "-100.00";
  // let minLat = "19.00";
  // let maxLong = "-98.00";
  // let maxLat = "20.00";
  // let mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${mapQuery}.json?bbox=${minLong},${minLat},${maxLong},${maxLat}&access_token=pk.eyJ1IjoiZWR2aWNhdHkiLCJhIjoiY2tla2tkaHZ6MDg3ODJxbXN2aW9ldnVmbCJ9.jzrSUZ18F2b4FErS8pHTGA`;
  // let response = await axios.get(mapBoxUrl);

  let municipality = "";

  const location = await Location.create({
    municipality: municipality,
    coordinates: {
      long: Number(long),
      lat: Number(lat),
    },
  });
  const newStore = await Store.create({
    storeName: `${storeTitle}, ${storeColonia}, ${storeMunicipality}`,
    priceUser: [],
    locations: location,
    product: productId,
    user: req.user.id,
  });
  const product = await Product.findOne({ _id: productId });
  product.stores.push(newStore);
  product.save();
  res.redirect(`/detail/${productId}`);
};
exports.viewVerifyForm = async (req, res) => {
  const stores = await Store.find({ verified: false })
    .populate("product")
    .populate("user")
    .populate("locations");

  // const query = {
  //   stores: { $elemMatch: { verified: false } },
  // };
  // const products = await Product.aggregate([
  //   {
  //     $project: {
  //       stores: {
  //         $filter: {
  //           input: "$stores",
  //           as: "store",
  //           cond: {
  //             $and: [{ $eq: ["$$store.verified", true] }],
  //           },
  //         },
  //       },
  //     },
  //   },
  // ]);
  // const productPopulate = await Product.populate(products, { path: "stores" });
  //const products = await Product.find(query).populate("stores");

  // const productsArr = await Product.find().populate("stores")
  // const productsStores = productsArr.map((product) => {
  //   return product.stores;
  // });
  // const produc productsUnverifiedStores.filter()
  //   filter((store) => {
  //     return store.verified === false;
  //   });
  // });
  // console.log(`arraaaaaay`, products);
  console.log(stores);
  res.render("stores/verify", { stores });
};
exports.verifyStore = async (req, res) => {
  const { storeId } = req.params;
  const store = await Store.findByIdAndUpdate(
    storeId,
    { verified: true },
    { new: true }
  );

  res.redirect("/store/checkVerify");
};
exports.deleteStore = async (req, res) => {
  const { storeId } = req.params;
  await Store.findByIdAndDelete(storeId);
  res.redirect("/store/checkVerify");
};
exports.unVerifyStore = async (req, res) => {
  const { storeId } = req.params;
  await Store.findByIdAndUpdate(storeId, { verified: false }, { new: true });
  res.redirect("/store/checkVerify");
};
exports.updateStore = async (req, res) => {
  const { storeId } = req.params;
  const { storeName, long, lat } = req.body;

  await Store.findByIdAndUpdate(storeId, { storeName }, { new: true }).populate(
    "locations"
  );

  const updatedStore = await Store.findOne({ _id: storeId }).populate(
    "locations"
  );

  updatedStore.locations.coordinates = {
    long: Number(long),
    lat: Number(lat),
  };
  updatedStore.locations.save();

  res.redirect(`/store/seeVerify/${storeId}`);
};

exports.viewUpdateStore = async (req, res) => {
  const store = await Store.findById(req.params.storeId)
    .populate("locations")
    .populate("products");
  console.log(`storeeee`, store);
  res.render("stores/verifySingle", store);
};
