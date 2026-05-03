import { UserService } from "../services/UserService.js";
import { AdminAccountView } from "../views/AdminAccountView.js";
export class AdminAccountController {
    view = new AdminAccountView();
    userService = new UserService();
    currentEditId = null;
    async init() {
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
        }
        catch (error) {
            console.error("Lỗi khi tải danh sách tài khoản:", error);
            const container = document.querySelector("table tbody");
            if (container) {
                container.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Lỗi kết nối máy chủ.</td></tr>`;
            }
        }
    }
    attachEvents() {
        // Xử lý Xóa
        document.querySelector('table tbody')?.addEventListener('click', async (e) => {
            const target = e.target;
            const deleteBtn = target.closest('.btn-delete');
            if (deleteBtn) {
                const id = deleteBtn.dataset.id;
                if (!id)
                    return;
                const ok = confirm("Bạn có chắc chắn muốn xóa tài khoản này? Thao tác này không thể hoàn tác.");
                if (ok) {
                    try {
                        await this.userService.remove(id);
                        alert("Xóa tài khoản thành công!");
                        await this.render();
                    }
                    catch (error) {
                        alert("Lỗi khi xóa: " + (error.message || "Không thể thực hiện yêu cầu"));
                    }
                }
            }
            // Xử lý Khóa / Mở khóa
            const lockBtn = target.closest('.btn-toggle-lock');
            if (lockBtn) {
                const id = lockBtn.dataset.id;
                const currentStatus = lockBtn.dataset.status;
                if (!id)
                    return;
                const newStatus = currentStatus === 'locked' ? 'active' : 'locked';
                const msg = currentStatus === 'locked' ? "Mở khóa tài khoản này?" : "Bạn có chắc muốn khóa tài khoản này?";
                if (confirm(msg)) {
                    try {
                        await this.userService.update(`/users/${id}`, { status: newStatus });
                        alert(newStatus === 'locked' ? "Đã khóa tài khoản!" : "Đã mở khóa tài khoản!");
                        await this.render();
                    }
                    catch (error) {
                        alert("Lỗi: " + (error.message || "Không thể cập nhật trạng thái"));
                    }
                }
            }
        });
        // Xử lý lưu từ Modal (Thêm mới)
        const btnSaveUser = document.getElementById('btnSaveUser');
        btnSaveUser?.addEventListener('click', async () => {
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const phone = document.getElementById('userPhone').value;
            const role = document.getElementById('userRole').value;
            const status = document.getElementById('userStatus').value;
            if (!name || !email) {
                alert("Vui lòng nhập đầy đủ Tên và Email");
                return;
            }
            try {
                if (this.currentEditId) {
                    // Update
                    await this.userService.update(`/users/${this.currentEditId}`, { name, email, phone, role, status });
                    alert("Cập nhật tài khoản thành công!");
                }
                else {
                    // Create
                    await this.userService.post('/users/register', { name, email, phone, role, status, password: '123' });
                    alert("Thêm tài khoản thành công!");
                }
                // Đóng modal
                const modalEl = document.getElementById('addUserModal');
                const modal = window.bootstrap.Modal.getInstance(modalEl);
                modal?.hide();
                await this.render();
            }
            catch (error) {
                alert("Lỗi: " + (error.message || "Không thể thực hiện yêu cầu"));
            }
        });
    }
    exposeGlobals() {
        // Hàm mở modal Sửa (Điền dữ liệu)
        window.openEditUserModal = (id, name, email, phone, role, status) => {
            this.currentEditId = id;
            const modalEl = document.getElementById('addUserModal');
            if (!modalEl)
                return;
            const label = document.getElementById('addUserModalLabel');
            if (label)
                label.innerText = "Cập nhật tài khoản";
            const btnSave = document.getElementById('btnSaveUser');
            if (btnSave)
                btnSave.innerText = "Lưu thay đổi";
            // Điền dữ liệu vào form
            document.getElementById('userName').value = name;
            document.getElementById('userEmail').value = email;
            document.getElementById('userPhone').value = phone;
            document.getElementById('userRole').value = role;
            document.getElementById('userStatus').value = status;
            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        };
        // Ghi đè lại hàm resetAddUserModal để đảm bảo modal mở đúng cách
        window.resetAddUserModal = () => {
            this.currentEditId = null;
            const modalEl = document.getElementById('addUserModal');
            if (!modalEl)
                return;
            // Reset form
            const form = document.getElementById('userForm');
            if (form)
                form.reset();
            const label = document.getElementById('addUserModalLabel');
            if (label)
                label.innerText = "Thêm tài khoản mới";
            const btnSave = document.getElementById('btnSaveUser');
            if (btnSave)
                btnSave.innerText = "Lưu tài khoản";
            const modal = window.bootstrap.Modal.getOrCreateInstance(modalEl);
            modal.show();
        };
    }
}
