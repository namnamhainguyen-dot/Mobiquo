const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

// 1. Khởi tạo ứng dụng Express
const app = express();

// 2. Cấu hình Middleware (Phải đặt TRƯỚC các Routes)
app.use(cors()); // Cho phép Frontend truy cập API
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 3. Kết nối cơ sở dữ liệu MongoDB
// Sử dụng 127.0.0.1 để tránh lỗi phân giải DNS của 'localhost' trên một số hệ điều hành
const mongoURI = 'mongodb://127.0.0.1:27017/final_asm2';
mongoose.connect(mongoURI)
  .then(() => {
    console.log('====================================');
    console.log('✅ KẾT NỐI MONGODB THÀNH CÔNG');
    console.log('📂 Database: final_asm2');
    console.log('====================================');
  })
  .catch((err) => {
    console.error('❌ LỖI KẾT NỐI MONGODB:', err.message);
    console.log('HƯỚNG DẪN: Hãy mở MongoDB Compass và kiểm tra Service MongoDB đã chạy chưa.');
  });

// 4. Import các Router (Đảm bảo các file này tồn tại trong thư mục routes)
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require("./routes/products");
const categoriesRouter = require("./routes/categories");
const billsRouter = require("./routes/bills");
const brandsRouter = require("./routes/brands");
const bonusesRouter = require('./routes/bonuses'); // Kiểm tra file routes/bonuses.js

// 5. Đăng ký các Route với tiền tố /api
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/bills', billsRouter);
app.use('/api/brands', brandsRouter);
app.use('/api/bonuses', bonusesRouter);

// Cấu hình View Engine (Cho các trang thông báo lỗi giao diện)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// 6. Xử lý lỗi 404 (Khi không tìm thấy đường dẫn)
app.use(function (req, res, next) {
  next(createError(404));
});

// 7. Bộ xử lý lỗi tập trung (Global Error Handler)
app.use(function (err, req, res, next) {
  const status = err.status || 500;

  // In lỗi chi tiết ra Terminal để lập trình viên dễ theo dõi
  console.error(`❗ LỖI [${status}]:`, err.message);

  res.status(status);

  // Nếu là yêu cầu API, trả về dữ liệu JSON thay vì trang HTML
  if (req.originalUrl.startsWith('/api')) {
    return res.json({
      success: false,
      message: err.message
    });
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});

module.exports = app;