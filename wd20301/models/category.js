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

const categorySchema = new Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: "" 
    }
});

categorySchema.set('toJSON', toJSONConfig);

module.exports = mongoose.model('category', categorySchema);