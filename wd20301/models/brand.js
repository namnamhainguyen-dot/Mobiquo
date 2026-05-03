const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: { 
        type: String, 
        required: true, 
        unique: true 
    },
    image: { type: String, default: "" }, // Logo thương hiệu
    status: { type: Boolean, default: true }
});

// Giữ nguyên toJSONConfig giống như Category của bạn để đổi _id thành id
brandSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => { ret.id = ret._id; delete ret._id; }
});

module.exports = mongoose.model('Brand', brandSchema);