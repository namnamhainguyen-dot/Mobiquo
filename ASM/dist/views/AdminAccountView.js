export class AdminAccountView {
    /**
     * Render danh sách tài khoản ra HTML table rows
     */
    renderUsers(users) {
        if (!users || users.length === 0) {
            return `<tr><td colspan="6" class="text-center py-4 text-muted">Không có tài khoản nào</td></tr>`;
        }
        return users.map((u, index) => `
            <tr>
                <td>
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random" class="avatar-img" alt="Avatar">
                </td>
                <td>
                <div class="fw-bold">${u.name}</div>
                <small class="text-muted">ID: ${u.id}</small>
                </td>
                <td>
                <div>${u.email}</div>
                <small class="text-muted">${u.phone || 'N/A'}</small>
                </td>
                <td>
                    ${u.role === 'admin'
            ? `<span class="badge badge-role-admin rounded-pill"><i class="bi bi-shield-lock-fill me-1"></i> Admin</span>`
            : `<span class="badge badge-role-client rounded-pill">Client</span>`}
                </td>
                <td>
                    <span class="badge ${u.status === 'locked' ? 'bg-danger' : 'bg-success'} bg-opacity-10 ${u.status === 'locked' ? 'text-danger' : 'text-success'}">
                        ${u.status === 'locked' ? 'Đã khóa' : 'Hoạt động'}
                    </span>
                </td>
                <td class="text-end">
                    <!-- Nút sửa form modal -->
                    <button class="btn btn-sm btn-outline-primary me-1" title="Sửa thông tin"
                        onclick="openEditUserModal('${u.id}', '${u.name}', '${u.email}', '${u.phone || ''}', '${u.role}', 'active')">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <!-- Nút khóa/mở khóa -->
                    <button class="btn btn-sm ${u.status === 'locked' ? 'btn-outline-success' : 'btn-outline-warning'} btn-toggle-lock" 
                            data-id="${u.id}" data-status="${u.status || 'active'}" title="${u.status === 'locked' ? 'Mở khóa' : 'Khóa tài khoản'}">
                        <i class="bi ${u.status === 'locked' ? 'bi-unlock' : 'bi-lock'}"></i>
                    </button>
                    <!-- Nút xóa -->
                    <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${u.id}" title="Xóa tài khoản">
                    <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }
}
//# sourceMappingURL=AdminAccountView.js.map