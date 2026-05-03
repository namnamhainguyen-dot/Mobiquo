const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// 1. Cấu hình kết nối
const MONGO_URI = 'mongodb://127.0.0.1:27017/final_asm2'; // Thay 'final_asm' bằng tên DB bạn muốn
const DB_JSON_PATH = path.join(__dirname, '../ASM/db.json'); // Đường dẫn tới file db.json

// 2. Kết nối MongoDB
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('--- Đã kết nối MongoDB để Import dữ liệu ---');
        importData();
    })
    .catch(err => console.error('Lỗi kết nối:', err));

async function importData() {
    try {
        // Đọc file db.json
        const rawData = fs.readFileSync(DB_JSON_PATH, 'utf-8');
        const data = JSON.parse(rawData);

        // Định nghĩa các Collection cần import
        // Chúng ta sẽ dùng mảng keys từ db.json: products, categories, users, v.v.
        const collections = Object.keys(data);

        for (const colName of collections) {
            console.log(`Đang xử lý collection: ${colName}...`);
            
            // Lấy mảng dữ liệu (ví dụ: data.products)
            const items = data[colName];

            if (Array.isArray(items)) {
                // Lấy hoặc tạo Model động cho collection này
                // (Không cần schema chặt chẽ vì đây là bước đổ dữ liệu thô)
                const Model = mongoose.model(colName, new mongoose.Schema({}, { strict: false, collection: colName }));

                // Xóa dữ liệu cũ nếu có (Tùy chọn - để tránh trùng lặp)
                await Model.deleteMany({});

                // Chèn dữ liệu mới
                // Lưu ý: Chúng ta giữ nguyên trường 'id' từ json để không làm hỏng quan hệ dữ liệu
                await Model.insertMany(items);
                console.log(`=> Đã chèn thành công ${items.length} bản ghi vào ${colName}.`);
            }
        }

        console.log('\n--- HOÀN THÀNH IMPORT DỮ LIỆU ---');
        process.exit(0);
    } catch (error) {
        console.error('Lỗi trong quá trình import:', error);
        process.exit(1);
    }
}