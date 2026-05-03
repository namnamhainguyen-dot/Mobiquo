const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toJSONConfig = {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
    }
};

const ProductSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
    
    // 1. Tham chiếu tới Category
    // Sửa thành ObjectId để sau này dùng .populate('category_id') lấy tên danh mục
    category_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'category', // Phải khớp với tên model trong module.exports của Category
        required: true 
    },

    // 2. Tham chiếu tới Brand (TRƯỜNG MỚI)
    brand_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Brand'
    }
});

ProductSchema.set('toJSON', toJSONConfig);

module.exports = mongoose.model('product', ProductSchema);