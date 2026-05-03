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

const BonusSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

BonusSchema.set('toJSON', toJSONConfig);

module.exports = mongoose.model('bonus', BonusSchema);