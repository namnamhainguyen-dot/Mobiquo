import { UserService } from "../services/UserService.js";
export class LoginController {
    userService = UserService.getInstance();
    init() {
        document.querySelector('#login-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;
            try {
                const user = await this.userService.login(email, password);
                if (user) {
                    alert('Đăng nhập thành công!');
                    location.href = user.role === 'admin' ? 'admin_products.html' : 'index.html';
                }
            }
            catch (error) {
                alert(error.message || "Email hoặc mật khẩu sai");
            }
        });
    }
}
