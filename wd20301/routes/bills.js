const express = require('express');
const router = express.Router();
const billsController = require("../controllers/bills");

// Lấy toàn bộ đơn hàng: GET http://localhost:3000/bills
router.get("/", billsController.getAllBills);

// Lấy chi tiết 1 đơn hàng: GET http://localhost:3000/bills/:id
router.get("/:id", billsController.getBillById);

// Tạo đơn hàng mới (Checkout): POST http://localhost:3000/bills
router.post("/", billsController.createBill);

// Cập nhật đơn hàng: PUT
router.put("/:id", billsController.updateBill);

// Xóa đơn hàng: DELETE
router.delete("/:id", billsController.deleteBill);

module.exports = router;