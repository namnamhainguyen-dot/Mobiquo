export class AdminOrderFormView {
    renderForm(o) {
        return `
            <div class="col-lg-7">
              <div class="card form-card mb-4">
                <div class="card-body p-4">
                  <h5 class="fw-bold mb-4 border-bottom pb-2">Thông tin khách hàng</h5>
                  <form id="orderForm">
                    <div class="row g-3 mb-3">
                      <div class="col-md-6">
                        <label class="form-label fw-bold">Tên người nhận</label>
                        <input type="text" class="form-control" name="userName" value="${o.user?.name || ''}">
                      </div>
                      <div class="col-md-6">
                        <label class="form-label fw-bold">Số điện thoại</label>
                        <input type="text" class="form-control" name="phone" value="${o.user?.phone || ''}">
                      </div>
                    </div>
                    <div class="mb-4">
                      <label class="form-label fw-bold">Địa chỉ giao hàng</label>
                      <textarea class="form-control" name="address" rows="2">${o.user?.address || ''}</textarea>
                    </div>

                    <h5 class="fw-bold mb-4 border-bottom pb-2">Trạng thái vận hành</h5>
                    <div class="row g-3">
                      <div class="col-md-6">
                        <label class="form-label fw-bold">Trạng thái đơn</label>
                        <select class="form-select" name="status" id="orderStatus">
                          <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Chờ xử lý</option>
                          <option value="shipping" ${o.status === 'shipping' ? 'selected' : ''}>Đang giao hàng</option>
                          <option value="success" ${o.status === 'success' ? 'selected' : ''}>Đã hoàn thành</option>
                          <option value="cancel" ${o.status === 'cancel' ? 'selected' : ''}>Đã hủy</option>
                        </select>
                      </div>
                      <div class="col-md-6 text-end d-flex align-items-end justify-content-end">
                         <button type="submit" class="btn btn-primary px-5 py-2">Lưu thay đổi đơn hàng</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div class="col-lg-5">
              <div class="card form-card bg-white">
                <div class="card-body p-4">
                  <h5 class="fw-bold mb-4 border-bottom pb-2">Tóm tắt giá trị</h5>
                  <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Tổng tiền hàng:</span>
                    <span class="fw-bold">${o.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                  <div class="d-flex justify-content-between mb-3">
                    <span class="text-muted">Phí vận chuyển:</span>
                    <span class="text-success fw-bold">Miễn phí</span>
                  </div>
                  <div class="d-flex justify-content-between mb-4 border-top pt-3">
                    <span class="h5 fw-bold">TỔNG CỘNG:</span>
                    <span class="h5 fw-bold text-primary">${o.total.toLocaleString('vi-VN')}đ</span>
                  </div>
                  
                  <div class="mb-3">
                    <label class="form-label fw-bold">Ghi chú nội bộ</label>
                    <textarea class="form-control" rows="3" placeholder="Ghi chú về việc giao hàng, đóng gói..."></textarea>
                  </div>
                  <div class="alert alert-warning small mb-0">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Lưu ý: Việc xóa hoặc hủy đơn hàng sẽ hoàn lại số lượng tồn kho của sản phẩm.
                  </div>
                </div>
              </div>
            </div>
        `;
    }
}
