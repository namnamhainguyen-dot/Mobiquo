const Bill = require("../models/bill");

exports.getAllBills = async (req, res) => {
    try {
        const bills = await Bill.find();
        res.json(bills);
    } catch (err) {
        res.status(500).json({ message: "Lỗi lấy hóa đơn: " + err.message });
    }
};

exports.getBillById = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (!bill) return res.status(404).json({ message: "Không tìm thấy hóa đơn" });
        res.json(bill);
    } catch (err) {
        res.status(400).json({ message: "ID hóa đơn không hợp lệ" });
    }
};

exports.createBill = async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        await newBill.save();
        res.status(201).json(newBill);
    } catch (err) {
        res.status(400).json({ message: "Lỗi tạo hóa đơn: " + err.message });
    }
};

exports.updateBill = async (req, res) => {
    try {
        const updated = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Không tìm thấy hóa đơn để sửa" });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: "Lỗi khi cập nhật hóa đơn" });
    }
};

exports.deleteBill = async (req, res) => {
    try {
        const deleted = await Bill.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Hóa đơn không tồn tại" });
        res.json({ message: "Xóa hóa đơn thành công", id: req.params.id });
    } catch (err) {
        res.status(400).json({ message: "Lỗi khi xóa hóa đơn" });
    }
};