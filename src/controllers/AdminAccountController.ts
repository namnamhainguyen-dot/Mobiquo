import { UserService } from "../services/UserService.js";
import { AdminAccountView } from "../views/AdminAccountView.js";

export class AdminAccountController {
    private view = new AdminAccountView();
    private userService = new UserService();
    private currentEditId: string | null = null;

    public async init() {
        await this.render();
        this.attachEvents();
        this.exposeGlobals();
    }

    async render() {
        try {
            const users = await this.userService.getAll();
            const container = document.querySelector("table tbody");
            if (container) {
                container.innerHTML = this.view.renderUsers(users);
            }
        } catch (error) {
            console.error("Lỗi khi tải danh sách tài khoản:", error);
            const container = document.querySelector("table tbody");
            if (container) {
                container.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Lỗi kết nối máy chủ.</td></tr>`;
            }
        }
    }

    attachEvents(): void {
        // Xử lý Xóa
        document.querySelector('table tbody')?.addEventListener('click', async (e: Event) => {
            const target = e.target as HTMLElement;
            const deleteBtn = target.closest('.btn-delete') as HTMLButtonElement;

            if (deleteBtn) {
                const id = deleteBtn.dataset.id;
                if (!id) return;

                const ok = confirm("Bạn có chắc chắn muốn xóa tài khoản này? Thao tác này không thể hoàn tác.");
                if (ok) {
                    try {
                        await this.userService.remove(id);
                        alert("Xóa tài khoản thành công!");
                        await this.render();
                    } catch (error: any) {
                        alert("Lỗi khi xóa: " + (error.message || "Không thể thực hiện yêu cầu"));
                    }
                }
            }

            // Xử lý Khóa / Mở khóa
            const lockBtn = target.closest('.btn-toggle-lock') as HTMLButtonElement;
            if (lockBtn) {
                const id = lockBtn.dataset.id;
                const currentStatus = lockBtn.dataset.status;
                if (!id) return;

                const newStatus = currentStatus === 'locked' ? 'active' : 'locked';
                const msg = currentStatus === 'locked' ? "Mở khóa tài khoản này?" : "Bạn có chắc muốn khóa tài khoản này?";

                if (confirm(msg)) {
                    try {
                        await this.userService.updateUserStatus(id, newStatus);
                        alert(newStatus === 'locked' ? "Đã khóa tài khoản!" : "Đã mở khóa tài khoản!");
                        await this.render();
                    } catch (error: any) {
                        alert("Lỗi: " + (error.message || "Không thể cập nhật trạng thái"));
                    }
                }
            }
        });

        // Xử lý lưu từ Modal (Thêm mới)
        const btnSaveUser = document.getElementById('btnSaveUser');
        btnSaveUser?.addEventListener('click', async () => {
            const name = (document.getElementById('userName') as HTMLInputElement).value;
            const email = (document.getElementById('userEmail') as HTMLInputElement).value;
            const phone = (document.getElementById('userPhone') as HTMLInputElement).value;
            const role = (document.getElementById('userRole') as HTMLSelectElement).value;
            const status = (document.getElementById('userStatus') as HTMLSelectElement).value;

            if (!name || !email) {
                alert("Vui lòng nhập đầy đủ Tên và Email");
                return;
            }

            try {
                if (this.currentEditId) {
                    // Update
                    await this.userService.updateData(this.currentEditId, { 
                        name, 
                        email, 
                        phone, 
                        role: role as "admin" | "user", 
                        status: status as "active" | "locked" 
                    });
                    alert("Cập nhật tài khoản thành công!");
                } else {
                    // Create
                    await this.userService.post('/users/register', { name, email, phone, role, status, password: '123' });
                    alert("Thêm tài khoản thành công!");
                }
                
                // Đóng modal
                const modalEl = document.getElementById('addUserModal');
                const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
                modal?.hide();

                await this.render();
            } catch (error: any) {
                alert("Lỗi: " + (error.message || "Không thể thực hiện yêu cầu"));
            }
        });
    }

    private exposeGlobals() {
        // Hàm mở modal Sửa (Điền dữ liệu)
        (window as any).openEditUserModal = (id: string, name: string, email: string, phone: string, role: string, status: string) => {
            this.currentEditId = id;
            
            const modalEl = document.getElementById('addUserModal');
            if (!modalEl) return;

            const label = document.getElementById('addUserModalLabel');
            if (label) label.innerText = "Cập nhật tài khoản";
            
            const btnSave = document.getElementById('btnSaveUser');
            if (btnSave) btnSave.innerText = "Lưu thay đổi";

            // Điền dữ liệu vào form
            (document.getElementById('userName') as HTMLInputElement).value = name;
            (document.getElementById('userEmail') as HTMLInputElement).value = email;
            (document.getElementById('userPhone') as HTMLInputElement).value = phone;
            (document.getElementById('userRole') as HTMLSelectElement).value = role;
            (document.getElementById('userStatus') as HTMLSelectElement).value = status;

            const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        };

        // Ghi đè lại hàm resetAddUserModal để đảm bảo modal mở đúng cách
        (window as any).resetAddUserModal = () => {
            this.currentEditId = null;
            const modalEl = document.getElementById('addUserModal');
            if (!modalEl) return;
            
            // Reset form
            const form = document.getElementById('userForm') as HTMLFormElement;
            if (form) form.reset();
            
            const label = document.getElementById('addUserModalLabel');
            if (label) label.innerText = "Thêm tài khoản mới";

            const btnSave = document.getElementById('btnSaveUser');
            if (btnSave) btnSave.innerText = "Lưu tài khoản";
            
            const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        };
    }
}
