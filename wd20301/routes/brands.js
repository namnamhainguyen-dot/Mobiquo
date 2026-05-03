const express = require('express');
const router = express.Router();
const brandsController = require("../controllers/brands");

// Lấy danh sách thương hiệu: GET http://localhost:3000/brands
router.get("/", brandsController.getAllBrands);

// Lấy chi tiết thương hiệu: GET http://localhost:3000/brands/:id
router.get("/:id", brandsController.getBrandById);

// Tạo thương hiệu mới: POST http://localhost:3000/brands
router.post("/", brandsController.createBrand);

module.exports = router;