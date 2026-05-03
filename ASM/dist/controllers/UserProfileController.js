import { UserService } from "../services/UserService.js";
import { User } from "../models/User.js";
export class UserProfileController {
    constructor() {
        this.userService = UserService.getInstance();
        this.currentUser = false;
    }
    async init() {
        // Lấy thông tin user đăng nhập từ localStorage
        this.currentUser = this.userService.getLoginState();
        if (!this.currentUser || !this.currentUser.id) {
            alert("Vui lòng đăng nhập!");
            location.href = "login.html";
            return;
        }
        await this.loadProfileData();
        this.attachEvents();
    }
    async loadProfileData() {
        try {
            // Lấy profile mới nhất từ backend (api GetProfile)
            const currentUser = this.currentUser;
            const userResponse = await this.userService.getById(currentUser.id);
            // Đổ vào UI
            document.getElementById("profileId").value =
                userResponse.id || "";
            document.getElementById("profileRole").value =
                userResponse.role === "admin" ? "Super Admin" : "Thành viên";
            document.getElementById("profileName").value =
                userResponse.name || "";
            document.getElementById("profileEmail").value =
                userResponse.email || "";
            document.getElementById("profilePhone").value =
                userResponse.phone || "";
            document.getElementById("profileAddress").value =
                userResponse.address || "";
            // Cập nhật Avatar info
            document.getElementById("avatarName").innerText =
                userResponse.name || "Người dùng";
            document.getElementById("avatarRole").innerText =
                userResponse.role === "admin" ? "Quản trị viên" : "Khách hàng";
            document.getElementById("avatarImg").src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(userResponse.name || "U")}&background=000f38&color=fff&size=200`;
        }
        catch (error) {
            console.error("Lỗi lấy thông tin profile:", error);
            alert("Không thể lấy thông tin profile!");
        }
    }
    attachEvents() {
        const btnSave = document.getElementById("btnSaveProfile");
        btnSave?.addEventListener("click", async () => {
            const name = document.getElementById("profileName").value.trim();
            const email = document.getElementById("profileEmail").value.trim();
            const phone = document.getElementById("profilePhone").value.trim();
            const address = document.getElementById("profileAddress").value.trim();
            if (!name || !email) {
                alert("Họ tên và Email không được để trống!");
                return;
            }
            try {
                const currentUser = this.currentUser;
                const userUpdated = await this.userService.updateData(currentUser.id, {
                    name,
                    email,
                    phone,
                    address,
                });
                alert("Cập nhật hồ sơ thành công!");
                // Cập nhật lại localStorage để header cập nhật tên
                if (userUpdated) {
                    this.userService.saveLoginState(userUpdated);
                    this.currentUser = this.userService.getLoginState();
                }
                await this.loadProfileData(); // Reload data
            }
            catch (error) {
                console.error("Lỗi cập nhật profile:", error);
                alert("Lỗi khi cập nhật hồ sơ!");
            }
        });
        const btnChangePassword = document.getElementById("btnChangePassword");
        btnChangePassword?.addEventListener("click", async () => {
            const currentPassword = document.getElementById("currentPassword").value;
            const newPassword = document.getElementById("newPassword").value;
            const confirmNewPassword = document.getElementById("confirmNewPassword").value;
            if (!currentPassword || !newPassword || !confirmNewPassword) {
                alert("Vui lòng nhập đầy đủ thông tin mật khẩu!");
                return;
            }
            // Validate mật khẩu: Ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(newPassword)) {
                alert("Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (@$!%*?&)!");
                return;
            }
            if (newPassword !== confirmNewPassword) {
                alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
                return;
            }
            try {
                const currentUser = this.currentUser;
                // Kiểm tra mật khẩu cũ
                const userResponse = await this.userService.getById(currentUser.id);
                if (userResponse.password !== currentPassword) {
                    alert("Mật khẩu hiện tại không đúng!");
                    return;
                }
                // Cập nhật mk mới
                await this.userService.updateData(currentUser.id, {
                    password: newPassword,
                });
                alert("Đổi mật khẩu thành công!");
                // Xóa thông tin đã nhập
                document.getElementById("currentPassword").value =
                    "";
                document.getElementById("newPassword").value = "";
                document.getElementById("confirmNewPassword").value = "";
            }
            catch (error) {
                console.error("Lỗi đổi mật khẩu:", error);
                alert("Lỗi khi đổi mật khẩu!");
            }
        });
        const togglePasswordBtns = document.querySelectorAll(".toggle-password");
        togglePasswordBtns.forEach((btn) => {
            btn.addEventListener("click", function () {
                const input = this.previousElementSibling;
                const icon = this.querySelector("i");
                if (input && input.type === "password") {
                    input.type = "text";
                    icon?.classList.remove("bi-eye");
                    icon?.classList.add("bi-eye-slash");
                }
                else if (input) {
                    input.type = "password";
                    icon?.classList.remove("bi-eye-slash");
                    icon?.classList.add("bi-eye");
                }
            });
        });
    }
}
//# sourceMappingURL=UserProfileController.js.map