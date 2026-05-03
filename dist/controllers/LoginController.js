import { UserService } from "../services/UserService.js";
export class LoginController {
    constructor() {
        this.userService = UserService.getInstance();
    }
    init() {
        const loginForm = document.querySelector("#login-form");
        if (loginForm) {
            loginForm.addEventListener("submit", async (e) => {
                e.preventDefault();
                const email = document.querySelector("#email")
                    .value;
                const password = document.querySelector("#password").value;
                const alertDiv = document.getElementById("alert-message");
                const submitBtn = document.querySelector("#login-form .btn-primary");
                let originalText = "";
                if (submitBtn) {
                    originalText = submitBtn.textContent || "";
                    submitBtn.textContent = "Đang xử lý...";
                    submitBtn.disabled = true;
                }
                try {
                    const user = await this.userService.login(email, password);
                    if (user) {
                        if (alertDiv) {
                            alertDiv.style.display = "block";
                            alertDiv.className = "alert-message alert-success";
                            alertDiv.textContent =
                                "Đăng nhập thành công! Đang chuyển hướng...";
                        }
                        else {
                            alert("Đăng nhập thành công!");
                        }
                        setTimeout(() => {
                            location.href =
                                user.role === "admin" ? "admin_products.html" : "index.html";
                        }, 1000);
                    }
                    else {
                        throw new Error("Email hoặc mật khẩu sai");
                    }
                }
                catch (error) {
                    if (alertDiv) {
                        alertDiv.style.display = "block";
                        alertDiv.className = "alert-message alert-error";
                        alertDiv.textContent = error.message || "Email hoặc mật khẩu sai";
                        setTimeout(() => {
                            alertDiv.style.display = "none";
                        }, 3000);
                    }
                    else {
                        alert(error.message || "Email hoặc mật khẩu sai");
                    }
                    if (submitBtn) {
                        submitBtn.textContent = originalText;
                        submitBtn.disabled = false;
                    }
                }
            });
        }
    }
}
//# sourceMappingURL=LoginController.js.map