const User = require('../models/user');
const jwt = require('jsonwebtoken');

const SECRET_KEY = "DA-TOT-NGHIEP-POLY"; // Khóa bí mật để tạo Token

// Đăng ký tài khoản
exports.register = async (req, res) => {
    try {
        const { email } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email đã tồn tại" });

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Đăng nhập và tạo Token
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: "Email hoặc mật khẩu không chính xác" });
        }

        // Tạo token có hiệu lực trong 24h
        const token = jwt.sign(
            { id: user._id, role: user.role },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            message: "Đăng nhập thành công",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Lấy danh sách (Có thể dùng Middleware bảo mật sau này)
exports.getAll = async (req, res) => {
    try {
        const data = await User.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getById = async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        if (!data) return res.status(404).json({ message: "Không tìm thấy người dùng" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.update = async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) return res.status(404).json({ message: "Không tìm thấy người dùng" });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id);
        if (!data) return res.status(404).json({ message: "Không tìm thấy người dùng" });
        res.json({ message: "Xóa thành công", data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};