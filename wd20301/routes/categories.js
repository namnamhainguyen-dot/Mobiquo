const express = require('express');
const router = express.Router();
const categoriesController = require("../controllers/categories");

// Lấy danh sách danh mục: GET http://localhost:3000/categories
router.get("/", categoriesController.getAllCategories);

// Lấy chi tiết danh mục: GET http://localhost:3000/categories/:id
router.get("/:id", categoriesController.getCategoryById);

// Tạo danh mục mới: POST http://localhost:3000/categories
router.post("/", categoriesController.createCategory);

// Cập nhật danh mục: PUT http://localhost:3000/categories/:id
router.put("/:id", categoriesController.updateCategory);

// Xóa danh mục: DELETE http://localhost:3000/categories/:id
router.delete("/:id", categoriesController.deleteCategory);

module.exports = router;