const Category = require("../models/category");

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: "Lỗi lấy danh mục: " + err.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: "Không tìm thấy danh mục" });
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: "ID không hợp lệ" });
    }
};

exports.createCategory = async (req, res) => {
    try {
        // SỬA: Lấy cả name và description từ req.body
        const { name, description } = req.body;
        const category = new Category({ name, description }); 
        
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ message: "Lỗi tạo danh mục: " + err.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        // SỬA: Lấy dữ liệu mới từ body
        const { name, description } = req.body;

        const category = await Category.findByIdAndUpdate(
            req.params.id, 
            { name, description }, // Đưa cả 2 trường vào đây để update
            { new: true }
        );
        
        if (!category) return res.status(404).json({ message: "Không tìm thấy danh mục" });
        res.json(category);
    } catch (err) {
        res.status(400).json({ message: "Lỗi cập nhật: " + err.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Không tìm thấy danh mục" });
        res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (err) {
        res.status(500).json({ message: "Lỗi xóa danh mục: " + err.message });
    }
};