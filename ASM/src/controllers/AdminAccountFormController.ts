import { UserService } from "../services/UserService.js";
import { AdminAccountFormView } from "../views/AdminAccountFormView.js";
import { User } from "../models/User.js";

export class AdminAccountFormController {
    private view = new AdminAccountFormView();
    private userService = new UserService();
    private userId: string | null = null;

    public async init() {
        const urlParams = new URLSearchParams(window.location.search);
        this.userId = urlParams.get('id');

        await this.render();
        this.attachEvents();
    }

    private async render() {
        let userData: User | null = null;
        if (this.userId) {
            try {
                userData = await this.userService.getById(this.userId);
            } catch (error) {
                console.error("Lỗi khi tải thông tin tài khoản:", error);
                alert("Không thể tải thông tin người dùng!");
            }
        }

        const container = document.getElementById("main");
        if (container) {
            container.innerHTML = this.view.renderForm(userData);
        }
    }

    private attachEvents() {
        const form = document.getElementById("accountForm") as HTMLFormElement;
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            try {
                if (this.userId) {
                    // Update (Lưu ý: Bạn có thể cần một phương thức update trong UserService)
                    // Ở đây tôi giả định bạn sẽ dùng PATCH
                    await this.userService.update(`/users/${this.userId}`, data);
                    alert("Cập nhật tài khoản thành công!");
                } else {
                    // Create
                    await this.userService.post('/users/register', data);
                    alert("Tạo tài khoản mới thành công!");
                }
                window.location.href = "admin_account.html";
            } catch (error: any) {
                alert("Lỗi: " + (error.message || "Không thể thực hiện yêu cầu"));
            }
        });
    }
}
