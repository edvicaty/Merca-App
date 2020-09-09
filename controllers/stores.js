const Product = require("../models/Product");
const Store = require("../models/Store");
const Location = require("../models/Location");
const axios = require("axios");

exports.viewStoreForm = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.render("stores/new", product);
};
exports.createStore = async (req, res) => {
  const { productId } = req.params;
  const { storeTitle, storeColonia, storeMunicipality } = req.body;
  const mapQuery = `${storeTitle}%20Colonia%20${storeColonia}%20Delegacion%20${storeMunicipality}%20`;
  let minLong = "-100.00";
  let minLat = "19.00";
  let maxLong = "-98.00";
  let maxLat = "20.00";
  let mapBoxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${mapQuery}.json?bbox=${minLong},${minLat},${maxLong},${maxLat}&access_token=pk.eyJ1IjoiZWR2aWNhdHkiLCJhIjoiY2tla2tkaHZ6MDg3ODJxbXN2aW9ldnVmbCJ9.jzrSUZ18F2b4FErS8pHTGA`;
  console.log(mapBoxUrl);
  let response = await axios.get(mapBoxUrl);
  const location = await Location.create({
    municipality: response.data.features[2].context[1].text,
    coordinates: {
      long: response.data.features[0].center[0],
      lat: response.data.features[0].center[1],
    },
  });
  const newStore = await Store.create({
    storeName: `${storeTitle}, ${storeColonia}, ${storeMunicipality}`,
    priceUser: [],
    locations: location,
  });
  const product = await Product.findOne({ _id: productId });
  product.stores.push(newStore);
  product.save();
  res.redirect(`/detail/${productId}`);
};
exports.viewEditForm = async (req, res) => {};
exports.editForm = async (req, res) => {};
exports.deleteStore = async (req, res) => {};
