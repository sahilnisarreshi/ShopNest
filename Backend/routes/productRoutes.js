const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controller/productController");

const router = express.Router();

// All products
router
    .route("/")
    .get(getProducts)
    .post(protect, admin, upload.single("image"), createProduct);

// Specific product
router
    .route("/:id")
    .get(getProductById)
    .put(protect, admin, upload.single("image"), updateProduct)
    .delete(protect, admin, deleteProduct);

module.exports = router;