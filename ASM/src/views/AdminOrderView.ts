import type { Order } from "../models/Order.js";

export class AdminOrderView {
    renderOrders(orders: Order[]){
        if (orders.length==0) {
            return `<tr><td colspan="6" class="text-center py-4 text-muted">Đang tải biểu mẫu...</td></tr>`
        }

        return orders.map((o:any, index:number)=> `
            <tr>
                        <td><strong>#${o.id || o._id}</strong></td>
                        <td>${o.user?.name || "Khách"} <br><small class="text-muted">${o.user?.phone || ""}</small></td>
                        <td>${new Date(o.createdDate).toLocaleDateString('vi-VN')}</td>
                        <td>${o.total.toLocaleString('vi-VN')}đ</td>
                        <td><span class="badge bg-warning text-dark">${o.status || 'pending'}</span></td>
                        <td class="text-end">
                           <!-- Link sang Detail để xem -->
                           <a href="admin_orderDetail.html?id=${o.id}" class="btn btn-sm btn-outline-info me-1" title="Xem">
                             <i class="bi bi-eye"></i>
                           </a>
                           <!-- Link sang Form để sửa/xóa -->
                           <a href="admin_orderForm.html?id=${o.id}" class="btn btn-sm btn-outline-primary" title="Xử lý">
                             <i class="bi bi-pencil-square"></i> Sửa
                           </a>
                        </td>
                      </tr>
        `).join('');
    }

    
}