var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId; // mongoose tự tạo trường _id kiểu ObjectId mongose.Schema.Types.ObjectId
var productDetail = new Schema({
    id: {type: ObjectId},
    name: {
        type: String, 
        required: true,
        unique: true,
        default: "No name",
    }
});

module.exports = mongoose.model('productDetail', productDetail);
//productDetails là tên collection trong mongodb