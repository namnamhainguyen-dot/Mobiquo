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

const billSchema = new Schema({
    createdDate: { // Đổi tên cho khớp với db.json
        type: Date,
        default: Date.now
    },
    total: { // db.json dùng total (thay vì totalAmount)
        type: Number,
        required: true,
        default: 0,
    },
    user: { // Chứa thông tin user
        type: Object,
        required: true
    },
    items: { // db.json dùng items (thay vì products)
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: "pending"
    }
});

billSchema.set('toJSON', toJSONConfig);

module.exports = mongoose.model('bill', billSchema);