import { UserService } from "../services/UserService.js";
import { User } from "../models/User.js";

export class UserProfileController {
  private userService = UserService.getInstance();
  private currentUser: User | false = false;

  public async init() {
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

  private async loadProfileData() {
    try {
      // Lấy profile mới nhất từ backend (api GetProfile)
      const currentUser = this.currentUser as User;
      const userResponse = await this.userService.getById(
        currentUser.id as string,
      );

      // Đổ vào UI
      (document.getElementById("profileId") as HTMLInputElement).value =
        userResponse.id || "";
      (document.getElementById("profileRole") as HTMLInputElement).value =
        userResponse.role === "admin" ? "Super Admin" : "Thành viên";
      (document.getElementById("profileName") as HTMLInputElement).value =
        userResponse.name || "";
      (document.getElementById("profileEmail") as HTMLInputElement).value =
        userResponse.email || "";
      (document.getElementById("profilePhone") as HTMLInputElement).value =
        userResponse.phone || "";
      (document.getElementById("profileAddress") as HTMLInputElement).value =
        userResponse.address || "";

      // Cập nhật Avatar info
      document.getElementById("avatarName")!.innerText =
        userResponse.name || "Người dùng";
      document.getElementById("avatarRole")!.innerText =
        userResponse.role === "admin" ? "Quản trị viên" : "Khách hàng";
      (document.getElementById("avatarImg") as HTMLImageElement).src =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userResponse.name || "U")}&background=000f38&color=fff&size=200`;
    } catch (error) {
      console.error("Lỗi lấy thông tin profile:", error);
      alert("Không thể lấy thông tin profile!");
    }
  }

  private attachEvents() {
    const btnSave = document.getElementById("btnSaveProfile");

    btnSave?.addEventListener("click", async () => {
      const name = (
        document.getElementById("profileName") as HTMLInputElement
      ).value.trim();
      const email = (
        document.getElementById("profileEmail") as HTMLInputElement
      ).value.trim();
      const phone = (
        document.getElementById("profilePhone") as HTMLInputElement
      ).value.trim();
      const address = (
        document.getElementById("profileAddress") as HTMLInputElement
      ).value.trim();

      if (!name || !email) {
        alert("Họ tên và Email không được để trống!");
        return;
      }

      try {
        const currentUser = this.currentUser as User;
        const userUpdated = await this.userService.updateData(
          currentUser.id as string,
          {
            name,
            email,
            phone,
            address,
          },
        );
        alert("Cập nhật hồ sơ thành công!");

        // Cập nhật lại localStorage để header cập nhật tên
        if (userUpdated) {
          this.userService.saveLoginState(userUpdated);
          this.currentUser = this.userService.getLoginState();
        }

        await this.loadProfileData(); // Reload data
      } catch (error) {
        console.error("Lỗi cập nhật profile:", error);
        alert("Lỗi khi cập nhật hồ sơ!");
      }
    });

    const btnChangePassword = document.getElementById("btnChangePassword");
    btnChangePassword?.addEventListener("click", async () => {
      const currentPassword = (
        document.getElementById("currentPassword") as HTMLInputElement
      ).value;
      const newPassword = (
        document.getElementById("newPassword") as HTMLInputElement
      ).value;
      const confirmNewPassword = (
        document.getElementById("confirmNewPassword") as HTMLInputElement
      ).value;

      if (!currentPassword || !newPassword || !confirmNewPassword) {
        alert("Vui lòng nhập đầy đủ thông tin mật khẩu!");
        return;
      }

      // Validate mật khẩu: Ít nhất 8 ký tự, 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(newPassword)) {
        alert(
          "Mật khẩu mới phải có ít nhất 8 ký tự, bao gồm ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt (@$!%*?&)!",
        );
        return;
      }

      if (newPassword !== confirmNewPassword) {
        alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
        return;
      }

      try {
        const currentUser = this.currentUser as User;

        // Kiểm tra mật khẩu cũ
        const userResponse = await this.userService.getById(
          currentUser.id as string,
        );
        if (userResponse.password !== currentPassword) {
          alert("Mật khẩu hiện tại không đúng!");
          return;
        }

        // Cập nhật mk mới
        await this.userService.updateData(currentUser.id as string, {
          password: newPassword,
        });
        alert("Đổi mật khẩu thành công!");

        // Xóa thông tin đã nhập
        (document.getElementById("currentPassword") as HTMLInputElement).value =
          "";
        (document.getElementById("newPassword") as HTMLInputElement).value = "";
        (
          document.getElementById("confirmNewPassword") as HTMLInputElement
        ).value = "";
      } catch (error) {
        console.error("Lỗi đổi mật khẩu:", error);
        alert("Lỗi khi đổi mật khẩu!");
      }
    });

    const togglePasswordBtns = document.querySelectorAll(".toggle-password");
    togglePasswordBtns.forEach((btn) => {
      btn.addEventListener("click", function (this: HTMLButtonElement) {
        const input = this.previousElementSibling as HTMLInputElement;
        const icon = this.querySelector("i");

        if (input && input.type === "password") {
          input.type = "text";
          icon?.classList.remove("bi-eye");
          icon?.classList.add("bi-eye-slash");
        } else if (input) {
          input.type = "password";
          icon?.classList.remove("bi-eye-slash");
          icon?.classList.add("bi-eye");
        }
      });
    });
  }
}
