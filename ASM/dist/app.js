import { HomeController } from "./controllers/HomeController.js";
import { ProductDetailController } from "./controllers/ProductDetailController.js";
import { CartController } from "./controllers/CartController.js";
import { RegisterController } from "./controllers/RegisterController.js";
import { LoginController } from "./controllers/LoginController.js";
import { UserService } from "./services/UserService.js";
// import { Navbar } from "./views/Navbar.js"; // Mở ra nếu bạn đã dùng
let controller;
// location.pathname có thể là "/ASM/index.html"
let page = location.pathname;
let user;
user = new UserService().getLoginState();
/**
 * Giải pháp: Sử dụng .endsWith() để kiểm tra tên file ở cuối đường dẫn.
 * Điều này giúp code chạy đúng dù bạn ở thư mục /ASM/ hay thư mục gốc.
 */
if (page.endsWith('productDetail.html')) {
    controller = new ProductDetailController();
}
else if (page.endsWith('cart.html')) {
    controller = new CartController();
}
else if (page.endsWith('register.html')) {
    controller = new RegisterController();
}
else if (page.endsWith('login.html')) {
    controller = new LoginController();
}
else if (page.endsWith('index.html') || page === '/' || page.endsWith('/ASM/')) {
    // Các trường hợp quay về trang chủ
    controller = new HomeController();
}
else {
    // Trường hợp mặc định nếu không khớp trang nào
    controller = new HomeController();
}
// Khởi tạo controller đã chọn
if (controller) {
    console.log("Đang khởi tạo Controller cho trang:", page);
    controller.init();
}
//# sourceMappingURL=app.js.map