import { AdminOrderController } from "./controllers/AdminOrderController.js";
import { AdminOrderDetailController } from "./controllers/AdminOrderDetailController.js";
import { AdminProductController } from "./controllers/AdminProductController.js";
import { AdminProductFormController } from "./controllers/AdminProductFormController.js";
import { AdminAccountController } from "./controllers/AdminAccountController.js";
import { AdminAccountFormController } from "./controllers/AdminAccountFormController.js";
import { AdminCategoryController } from "./controllers/AdminCategoryController.js";
import { AdminOrderFormController } from "./controllers/AdminOrderFormController.js";
import { UserService } from "./services/UserService.js";
let controller;
let user;
user = new UserService().getLoginState();
const page = location.pathname;
if (page.endsWith('admin_products.html')) {
    controller = new AdminProductController();
}
else if (page.endsWith('admin_productForm.html')) {
    controller = new AdminProductFormController();
}
else if (page.endsWith('admin_orders.html')) {
    controller = new AdminOrderController();
}
else if (page.endsWith('admin_orderDetail.html')) {
    controller = new AdminOrderDetailController();
}
else if (page.endsWith('admin_orderForm.html')) {
    controller = new AdminOrderFormController();
}
else if (page.endsWith('admin_account.html')) {
    controller = new AdminAccountController();
}
else if (page.endsWith('admin_accountForm.html')) {
    controller = new AdminAccountFormController();
}
else if (page.endsWith('admin_category.html')) {
    controller = new AdminCategoryController();
}
if (controller)
    controller.init();
