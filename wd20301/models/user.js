const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Cấu hình Virtuals để biến _id thành id cho Frontend
const toJSONConfig = {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
};

const userSchema = new Schema({
    name: { // Khớp với db.json (thay vì username)
        type: String, 
        required: true,
        default: "Khách hàng",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: "",
    },
    address: { // Thêm trường address cho giống db.json
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    avatarURL: {
        type: String,
        default: "No avatar",
    },
    status: {
        type: String,
        enum: ['active', 'locked'],
        default: 'active',
    }
}, { timestamps: true }); // Tự động tạo createdAt và updatedAt

userSchema.set('toJSON', toJSONConfig);

module.exports = mongoose.model('user', userSchema);