const router = require("express").Router();
const admin = require("../middlewares/admin");
const authorize = require("../middlewares/authorize");
const {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
} = require("../controllers/productController");

router.route("/").post([authorize, admin], createProduct).get(getProducts);

router.route("/:id").get(getProductById).post(updateProductById);

module.exports = router;
