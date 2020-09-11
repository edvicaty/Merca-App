const Product = require("../models/Product");
const Store = require("../models/Store");
const Location = require("../models/Location");

exports.viewStoreForm = async (req, res) => {
  const { productId } = req.params;
  const product = await Product.findById(productId);
  res.render("stores/new", product);
};
exports.createStore = async (req, res) => {
  const { productId } = req.params;
  const { storeTitle, storeColonia, storeMunicipality, long, lat } = req.body;

  const location = await Location.create({
    municipality: storeMunicipality,
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
  res.render("stores/verifySingle", store);
};
