import { UserService } from "../services/UserService.js";
import { User } from "../models/User.js";

export class RegisterController {
    private userService = UserService.getInstance();

    /**
     * Khởi tạo các sự kiện cho trang đăng ký
     */
    init(): void {
        const registerForm = document.querySelector('#register-form');
        
        if (!registerForm) {
            console.error("Không tìm thấy form đăng ký (#register-form)");
            return;
        }

        registerForm.addEventListener('submit', async (e: Event) => {
            e.preventDefault();

            // Thu thập dữ liệu từ các ô nhập liệu
            const name = (document.querySelector('#name') as HTMLInputElement).value;
            const phone = (document.querySelector('#phone') as HTMLInputElement).value;
            const email = (document.querySelector('#email') as HTMLInputElement).value;
            const password = (document.querySelector('#password') as HTMLInputElement).value;
            const address = (document.querySelector('#address') as HTMLInputElement)?.value || "";

            try {
                // Tạo đối tượng User mới
                // id được để là undefined để MongoDB tự động sinh ra
                const newUser = new User(
                    undefined, 
                    name, 
                    phone, 
                    email, 
                    password, 
                    address, 
                    "user"
                );

                // Gọi hàm register trong UserService
                // Hàm này sẽ thực hiện POST tới /api/users/register (đã cấu hình Token ở phần trước)
                await this.userService.register(newUser);

                alert('Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.');
                
                // Chuyển hướng sang trang đăng nhập
                location.href = 'login.html';
                
            } catch (error: any) {
                // Hiển thị lỗi từ Server (ví dụ: Email đã tồn tại)
                console.error("Lỗi đăng ký:", error);
                alert(error.message || "Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.");
            }
        });
    }
}