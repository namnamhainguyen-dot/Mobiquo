import type { CartItem } from "../models/CartItem.js";
import type { Order } from "../models/Order.js";
import type { Bonus } from "../models/Bonus.js";

export class AdminOrderDetailView {
    renderOrder(o:Order){
        return `
            <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
            <div>
              <h2 class="fw-bold mb-1">Đơn hàng #${o.id || (o as any)._id}</h2>
              <p class="text-muted mb-0"><i class="bi bi-calendar3 me-1"></i> Ngày đặt: ${new Date(o.createdDate).toLocaleDateString('vi-VN')} ${new Date(o.createdDate).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
            <div class="text-md-end">
              <span class="badge status-pending fs-6 px-3 py-2 rounded-pill">
                <i class="bi bi-clock-history me-1"></i> ${o.status || 'pending'}
              </span>
            </div>
          </div>

          <div class="row g-4">
            <!-- Customer Info & Shipping -->
            <div class="col-lg-4">
              <div class="card shadow-sm mb-4">
                <div class="card-body">
                  <h5 class="fw-bold mb-3 border-bottom pb-2">Thông tin khách hàng</h5>
                  <div class="mb-3">
                    <div class="order-label">Người nhận</div>
                    <div class="order-value">${o.user?.name || "Khách"}</div>
                  </div>
                  <div class="mb-3">
                    <div class="order-label">Số điện thoại</div>
                    <div class="order-value">${o.user?.phone || ""}</div>
                  </div>
                  <div class="mb-3">
                    <div class="order-label">Email</div>
                    <div class="order-value">${o.user?.email || ""}</div>
                  </div>
                  <div class="mb-0">
                    <div class="order-label">Địa chỉ giao hàng</div>
                    <div class="order-value text-wrap">${o.user.address}</div>
                  </div>
                </div>
              </div>

              <div class="card shadow-sm">
                <div class="card-body">
                  <h5 class="fw-bold mb-3 border-bottom pb-2">Cập nhật trạng thái</h5>
                  <form>
                    <div class="mb-3">
                      <select class="form-select mb-3">
                        <option value="pending" selected>Đang chờ xử lý</option>
                        <option value="shipping">Đang giao hàng</option>
                        <option value="completed">Đã hoàn thành</option>
                        <option value="cancelled">Đã hủy đơn</option>
                      </select>
                      <button type="button" class="btn btn-primary w-100">Cập nhật trạng thái</button>
                    </div>
                  </form>
                  <div class="alert alert-light border small text-muted mb-0">
                    <i class="bi bi-info-circle me-1"></i> Khách hàng sẽ nhận được email thông báo khi bạn thay đổi trạng thái đơn hàng.
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Items -->
            <div class="col-lg-8">
              <div class="card shadow-sm">
                <div class="card-body">
                  <h5 class="fw-bold mb-3 border-bottom pb-2">Danh sách sản phẩm</h5>
                  <div class="table-responsive">
                    <table class="table align-middle">
                      <thead class="table-light">
                        <tr>
                          <th>Sản phẩm</th>
                          <th class="text-center">Đơn giá</th>
                          <th class="text-center">Số lượng</th>
                          <th class="text-end">Thành tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                      ${(o.items || []).map((item: CartItem) => `
                        <!-- Item 1 -->
                        <tr>
                          <td>
                            <div class="d-flex align-items-center">
                              <img src="public/img/${item.product.image}" class="product-img me-3" alt="${item.product.name}">
                              <div>
                                <div class="fw-bold">${item.product.name}</div>
                                <small class="text-muted d-block">${item.product.description}</small>
                              </div>
                            </div>
                          </td>
                          <td class="text-center">${item.product.price.toLocaleString('vi-VN')}đ</td>
                          <td class="text-center">x${item.quantity}</td>
                          <td class="text-end fw-bold">${(item.product.price * item.quantity).toLocaleString('vi-VN')}đ</td>
                        </tr>
                        `)}
                        
                        
                      </tbody>
                    </table>
                  </div>

                  <!-- Order Totals -->
                  <div class="row justify-content-end mt-3">
                    <div class="col-md-5">
                      <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Tạm tính:</span>
                        <span class="fw-bold">${o.total.toLocaleString('vi-VN')}đ</span>
                      </div>
                      <div class="d-flex justify-content-between mb-2">
                        <span class="text-muted">Phí vận chuyển:</span>
                        <span class="fw-bold text-success">Miễn phí</span>
                      </div>
                      <div class="d-flex justify-content-between mb-2 border-top pt-2 total-row">
                        <span>TỔNG CỘNG:</span>
                        <span>${o.total.toLocaleString('vi-VN')}đ</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Admin Notes -->
              <div class="card shadow-sm mt-4">
                <div class="card-body">
                  <h5 class="fw-bold mb-3"><i class="bi bi-chat-left-text me-2"></i>Ghi chú quản trị</h5>
                  <textarea class="form-control mb-3" rows="3" placeholder="Nhập ghi chú cho đơn hàng này (nếu có)..."></textarea>
                  <button class="btn btn-outline-primary btn-sm">Lưu ghi chú</button>
                </div>
              </div>
            </div>
          </div>
        `;
    }

    
}