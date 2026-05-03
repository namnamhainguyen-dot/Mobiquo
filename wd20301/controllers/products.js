const Product = require('../models/product');
const mongoose = require('mongoose');

// Lấy toàn bộ danh sách sản phẩm
exports.getAll = async (req, res) => {
    try {
        // 1. Lấy các tham số từ query string
        const { q, categoryId, brandId } = req.query;
        let queryFilter = {};

        // 2. Xây dựng bộ lọc tìm kiếm theo tên
        if (q) {
            queryFilter.name = { $regex: q, $options: 'i' }; // 'i': không phân biệt hoa thường
        }

        // 3. Lọc theo Danh mục (Lưu ý: dùng đúng tên trường category_id trong Model của bạn)
        if (categoryId && categoryId !== 'all') {
            queryFilter.category_id = categoryId;
        }

        // 4. Lọc theo Thương hiệu (Lưu ý: dùng đúng tên trường brand_id trong Model của bạn)
        if (brandId && brandId !== 'all') {
            queryFilter.brand_id = brandId;
        }

        // 5. Truy vấn và sử dụng .populate để lấy tên thay vì chỉ lấy ID
        const data = await Product.find(queryFilter)
            .populate('category_id', 'name') // Chỉ lấy thêm field 'name' của category
            .populate('brand_id', 'name image'); // Lấy 'name' và 'image' của brand

        // 6. Format lại dữ liệu cho Frontend (toJSONConfig trong Model thường đã lo việc đổi _id thành id, 
        // nhưng map lại thế này cho chắc chắn nếu bạn chưa tin tưởng Schema)
        const products = data.map(item => {
            const obj = item.toObject();
            return {
                ...obj,
                id: item._id.toString()
            };
        });

        res.json(products);
    } catch (err) {
        console.error("Lỗi getAllProducts:", err.message);
        res.status(500).json({ message: "Lỗi lấy danh sách sản phẩm: " + err.message });
    }
};

// Lấy sản phẩm theo ID
exports.getById = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem ID có đúng định dạng ObjectId của MongoDB không
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Định dạng ID không hợp lệ (Phải là chuỗi 24 ký tự)" });
        }

        const data = await Product.findById(id);
        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
        }

        const productObj = data.toObject();
        productObj.id = data._id.toString();

        res.json(productObj);
    } catch (err) {
        console.error("Lỗi getProductById:", err.message);
        res.status(500).json({ message: "Lỗi hệ thống: " + err.message });
    }
};

// Thêm sản phẩm mới
exports.create = async (req, res) => {
    try {
        const newItem = new Product(req.body);
        await newItem.save();
        
        const result = newItem.toObject();
        result.id = newItem._id.toString();
        
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ message: "Lỗi tạo sản phẩm: " + err.message });
    }
};

// Cập nhật sản phẩm
exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }

        const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại để cập nhật" });
        }

        const result = updated.toObject();
        result.id = updated._id.toString();

        res.json(result);
    } catch (err) {
        res.status(400).json({ message: "Lỗi cập nhật sản phẩm: " + err.message });
    }
};

// Xóa sản phẩm
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID không hợp lệ" });
        }

        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại để xóa" });
        }
        res.json({ message: "Xóa sản phẩm thành công", id: id });
    } catch (err) {
        res.status(400).json({ message: "Lỗi khi xóa: " + err.message });
    }
};