export class AdminProductFormView {
    renderForm(products, categories) {
        if (products) {
            return `<div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="h4 fw-bold mb-0" id="pageTitle">Sửa sản phẩm</h2>
            </div>

            <div class="row">
              <!-- Cột trái: Form nhập liệu -->
              <div class="col-lg-8">
                <div class="card form-card">
                  <div class="card-body p-4">
                    <form id="product-form">
                      <!-- Tên sản phẩm (name) -->
                      <div class="mb-4">
                        <label class="form-label" for="prodName">Tên sản phẩm</label>
                        <input type="text" class="form-control" id="name" name="name" value="${products.name}" placeholder="Nhập tên sản phẩm đầy đủ..." required>
                      </div>

                      <div class="row g-3 mb-4">
                        <!-- Giá (price) -->
                        <div class="col-md-6">
                          <label class="form-label" for="prodPrice">Giá bán (VNĐ)</label>
                          <input type="number" class="form-control" id="price" name="price" value="${products.price}" placeholder="0" required>
                        </div>
                        <!-- Danh mục (category_id) -->
                        <div class="col-md-6">
                          <label class="form-label" for="prodCategory">Danh mục</label>
                          <select id="category_id" class="form-select">
                ${categories.map((c) => `<option value="${c.id}" ${c.id == products.category_id ? 'selected' : ''}>${c.name}</option>`).join('')}  
                </select>
                        </div>
                      </div>

                      <!-- Hình ảnh (image) - Hỗ trợ cả chọn tệp và nhập tên/URL -->
                      <div class="mb-4">
                        <label class="form-label">Hình ảnh sản phẩm</label>
                        <div class="input-group mb-2">
                            <span class="input-group-text bg-light"><i class="bi bi-image"></i></span>
                            <input type="text" class="form-control" id="image" name="image" value="${products.image}" placeholder="${products.image}" required>
                            <button class="btn btn-outline-primary" type="button" onclick="document.getElementById('fileUpload').click()">
                                <i class="bi bi-upload me-1"></i> Tải lên từ máy
                            </button>
                        </div>
                        <!-- Input file ẩn -->
                        <input type="file" id="fileUpload" accept="image/*">
                        <small class="text-muted">Gợi ý: Bạn có thể chọn tệp từ máy để xem trước hoặc nhập trực tiếp tên tệp có sẵn trong hệ thống.</small>
                      </div>

                      <!-- Mô tả (description) -->
                      <div class="mb-4">
                        <label class="form-label" for="prodDesc">Mô tả sản phẩm</label>
                        <textarea class="form-control" id="description" name="description" rows="4" placeholder="${products.description}">${products.description}</textarea>
                      </div>

                      <div class="d-flex gap-2 justify-content-between border-top pt-4">
                        <button type="button" class="btn btn-danger" id="btnDelete" style="display: none;">
                            <i class="bi bi-trash me-2"></i>Xóa khỏi hệ thống
                        </button>
                        <div class="ms-auto d-flex gap-2">
                          <a href="admin_products.html" class="btn btn-secondary px-4">Hủy</a>
                          <button type="submit" class="btn btn-primary px-5" id="btnSubmit">Lưu sản phẩm</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <!-- Cột phải: Xem trước (Preview) -->
              <div class="col-lg-4">
                <div class="card form-card sticky-top" style="top: 100px; z-index: 10;">
                  <div class="card-body p-4 text-center">
                    <h5 class="fw-bold mb-3">Bản xem trước ảnh</h5>
                    <img src="public/img/${products.image}" class="preview-img mb-3" id="imgPreview">
                    <div id="fileInfo" class="small text-muted mb-0"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
        }
        return `<div class="container-fluid">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h2 class="h4 fw-bold mb-0" id="pageTitle">Thêm sản phẩm mới</h2>
            </div>

            <div class="row">
              <!-- Cột trái: Form nhập liệu -->
              <div class="col-lg-8">
                <div class="card form-card">
                  <div class="card-body p-4">
                    <form id="product-form">
                      <!-- Tên sản phẩm (name) -->
                      <div class="mb-4">
                        <label class="form-label" for="prodName">Tên sản phẩm</label>
                        <input type="text" class="form-control" id="name" name="name" value="" placeholder="Nhập tên sản phẩm đầy đủ..." required>
                      </div>

                      <div class="row g-3 mb-4">
                        <!-- Giá (price) -->
                        <div class="col-md-6">
                          <label class="form-label" for="prodPrice">Giá bán (VNĐ)</label>
                          <input type="number" class="form-control" id="price" name="price" value="" placeholder="0" required>
                        </div>
                        <!-- Danh mục (category_id) -->
                        <div class="col-md-6">
                          <label class="form-label" for="prodCategory">Danh mục</label>
                          <select id="category_id" class="form-select">
                ${categories.map((c) => `<option value="${c.id}" >${c.name}</option>`).join('')}  
                </select>
                        </div>
                      </div>

                      <!-- Hình ảnh (image) - Hỗ trợ cả chọn tệp và nhập tên/URL -->
                      <div class="mb-4">
                        <label class="form-label">Hình ảnh sản phẩm</label>
                        <div class="input-group mb-2">
                            <span class="input-group-text bg-light"><i class="bi bi-image"></i></span>
                            <input type="text" class="form-control" id="image" name="image" placeholder="Tên tệp ảnh (vd: sp1.png) hoặc URL..." required>
                            <button class="btn btn-outline-primary" type="button" onclick="document.getElementById('fileUpload').click()">
                                <i class="bi bi-upload me-1"></i> Tải lên từ máy
                            </button>
                        </div>
                        <!-- Input file ẩn -->
                        <input type="file" id="fileUpload" accept="image/*">
                        <small class="text-muted">Gợi ý: Bạn có thể chọn tệp từ máy để xem trước hoặc nhập trực tiếp tên tệp có sẵn trong hệ thống.</small>
                      </div>

                      <!-- Mô tả (description) -->
                      <div class="mb-4">
                        <label class="form-label" for="prodDesc">Mô tả sản phẩm</label>
                        <textarea class="form-control" id="description" name="description" rows="4" placeholder="Mô tả ngắn gọn về đặc tính sản phẩm..."></textarea>
                      </div>

                      <div class="d-flex gap-2 justify-content-between border-top pt-4">
                        <button type="button" class="btn btn-danger" id="btnDelete" style="display: none;">
                            <i class="bi bi-trash me-2"></i>Xóa khỏi hệ thống
                        </button>
                        <div class="ms-auto d-flex gap-2">
                          <a href="admin_products.html" class="btn btn-secondary px-4">Hủy</a>
                          <button type="submit" class="btn btn-primary px-5" id="btnSubmit">Lưu sản phẩm</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <!-- Cột phải: Xem trước (Preview) -->
              <div class="col-lg-4">
                <div class="card form-card sticky-top" style="top: 100px; z-index: 10;">
                  <div class="card-body p-4 text-center">
                    <h5 class="fw-bold mb-3">Bản xem trước ảnh</h5>
                    <img src="https://placehold.co/400x400?text=Chưa+có+ảnh" class="preview-img mb-3" id="imgPreview">
                    <div id="fileInfo" class="small text-muted mb-0">Chưa có tệp nào được chọn</div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    }
}
//# sourceMappingURL=AdminProductFormView.js.map