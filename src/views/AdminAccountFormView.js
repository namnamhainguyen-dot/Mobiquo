export class AdminAccountFormView {
    renderForm(user) {
        const title = user ? `Cập nhật tài khoản: ${user.name}` : "Thêm tài khoản mới";
        const btnText = user ? "Cập nhật tài khoản" : "Tạo tài khoản";
        return `
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card form-card">
                    <div class="card-body p-4">
                        <h2 class="h4 mb-4 fw-bold text-dark border-bottom pb-3">${title}</h2>
                        
                        <form id="accountForm">
                            <div class="row g-3">
                                <div class="col-md-6">
                                    <label class="form-label">Họ và tên</label>
                                    <input type="text" name="name" class="form-control" value="${user?.name || ''}" required placeholder="Nhập tên đầy đủ">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Email</label>
                                    <input type="email" name="email" class="form-control" value="${user?.email || ''}" required placeholder="email@example.com">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Số điện thoại</label>
                                    <input type="tel" name="phone" class="form-control" value="${user?.phone || ''}" placeholder="Nhập số điện thoại">
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Mật khẩu</label>
                                    <input type="password" name="password" class="form-control" ${user ? '' : 'required'} placeholder="${user ? 'Để trống nếu không muốn đổi' : 'Nhập mật khẩu'}">
                                </div>
                                <div class="col-12">
                                    <label class="form-label">Địa chỉ</label>
                                    <textarea name="address" class="form-control" rows="2" placeholder="Nhập địa chỉ nhận hàng">${user?.address || ''}</textarea>
                                </div>
                                <div class="col-md-6">
                                    <label class="form-label">Quyền hạn</label>
                                    <select name="role" class="form-select">
                                        <option value="user" ${user?.role === 'user' ? 'selected' : ''}>Khách hàng (User)</option>
                                        <option value="admin" ${user?.role === 'admin' ? 'selected' : ''}>Quản trị viên (Admin)</option>
                                    </select>
                                </div>
                                <div class="col-12 mt-4">
                                    <div class="d-flex gap-2">
                                        <button type="submit" class="btn btn-primary px-4">
                                            <i class="bi bi-check-circle me-1"></i> ${btnText}
                                        </button>
                                        <a href="admin_account.html" class="btn btn-light px-4 text-secondary">Hủy bỏ</a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}
