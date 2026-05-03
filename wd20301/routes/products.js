const express = require('express');
const router = express.Router();
// Đảm bảo đường dẫn require khớp chính xác với tên file trong thư mục controllers
// Lưu ý: Node.js phân biệt chữ hoa chữ thường (products.js khác với ProductController.js)
const productController = require('../controllers/products');

// Lấy toàn bộ sản phẩm: GET http://localhost:3000/api/products
router.get('/', productController.getAll);

// Lấy chi tiết 1 sản phẩm: GET http://localhost:3000/api/products/:id
router.get('/:id', productController.getById);

// Thêm mới sản phẩm: POST http://localhost:3000/api/products
router.post('/', productController.create);

// Cập nhật sản phẩm: PATCH http://localhost:3000/api/products/:id
router.patch('/:id', productController.update);

// Xóa sản phẩm: DELETE http://localhost:3000/api/products/:id
router.delete('/:id', productController.delete);

module.exports = router;