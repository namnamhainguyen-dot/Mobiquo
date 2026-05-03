const Brand = require("../models/brand");

exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (err) {
        res.status(500).json({ message: "Lỗi lấy thương hiệu: " + err.message });
    }
};

exports.getBrandById = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);
        if (!brand) return res.status(404).json({ message: "Không tìm thấy thương hiệu" });
        res.json(brand);
    } catch (err) {
        res.status(500).json({ message: "ID không hợp lệ" });
    }
};

exports.createBrand = async (req, res) => {
    try {
        const brand = new Brand({ name: req.body.name });
        await brand.save();
        res.status(201).json(brand);
    } catch (err) {
        res.status(400).json({ message: "Lỗi tạo thương hiệu: " + err.message });
    }
};