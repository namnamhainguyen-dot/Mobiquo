import { CategoryService } from "../services/CategoryService.js";
import { Category } from "../models/Category.js";

export class AdminCategoryController {
    private categoryService = new CategoryService();
    private currentEditId: string | null = null;

    public async init() {
        await this.renderCategories();
        this.attachEvents();
        this.exposeGlobals();
    }

    private async renderCategories() {
        const listElement = document.getElementById('category-list');
        if (!listElement) return;

        try {
            const categories: Category[] = await this.categoryService.getAll();
            listElement.innerHTML = '';

            categories.forEach((cat) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><i class="bi bi-tags fs-4 text-secondary"></i></td>
                    <td>
                        <div class="fw-bold">${cat.name}</div>
                        <small class="text-muted">ID: ${cat.id}</small>
                    </td>
                    <td>${cat.description || ''}</td>
                    <td class="text-center"><span class="badge bg-secondary rounded-pill">0</span></td>
                    <td><span class="badge bg-success">Hiển thị</span></td>
                    <td class="text-end">
                         <button class="btn btn-sm btn-outline-primary me-1" 
                            onclick="prepareEdit('${cat.id}', '${cat.name}', '${cat.description || ''}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                         <button class="btn btn-sm btn-outline-danger" 
                            onclick="deleteCategory('${cat.id}')">
                           <i class="bi bi-trash"></i>
                         </button>
                    </td>
                `;
                listElement.appendChild(tr);
            });
        } catch (error) {
            console.error("Lỗi khi load danh mục:", error);
            listElement.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Không thể tải dữ liệu</td></tr>';
        }
    }

    private attachEvents() {
        const btnSave = document.getElementById('btnSaveCategory');
        btnSave?.addEventListener('click', async () => {
            const inputName = document.getElementById('catName') as HTMLInputElement;
            const inputDesc = document.getElementById('catDesc') as HTMLTextAreaElement;
            
            const name = inputName.value;
            const description = inputDesc.value;

            if (!name) {
                alert("Vui lòng nhập tên danh mục");
                return;
            }

            try {
                if (this.currentEditId) {
                    await this.categoryService.updateCategory(this.currentEditId, name, description);
                    alert("Cập nhật thành công!");
                } else {
                    await this.categoryService.create(name, description);
                    alert("Thêm mới thành công!");
                }
                
                const modalElement = document.getElementById('addCategoryModal');
                const modal = (window as any).bootstrap.Modal.getInstance(modalElement);
                modal?.hide();

                await this.renderCategories();
            } catch (error) {
                console.error("Lỗi xử lý danh mục:", error);
                alert("Có lỗi xảy ra trong quá trình xử lý!");
            }
        });
    }

    private exposeGlobals() {
        (window as any).prepareEdit = (id: string, name: string, desc: string) => {
            this.currentEditId = id;
            
            const inputName = document.getElementById('catName') as HTMLInputElement;
            const inputDesc = document.getElementById('catDesc') as HTMLTextAreaElement;
            const modalTitle = document.getElementById('categoryModalTitle');
            const btnSave = document.getElementById('btnSaveCategory');

            if (inputName) inputName.value = name;
            if (inputDesc) inputDesc.value = desc;
            if (modalTitle) modalTitle.innerText = "Cập nhật nhóm thiết bị";
            if (btnSave) btnSave.innerText = "Lưu thay đổi";

            const modalElement = document.getElementById('addCategoryModal');
            const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalElement);
            modal.show();
        };

        (window as any).resetAddModal = () => {
            this.currentEditId = null;
            const form = document.getElementById('categoryForm') as HTMLFormElement;
            if (form) form.reset();
            
            const modalTitle = document.getElementById('categoryModalTitle');
            const btnSave = document.getElementById('btnSaveCategory');
            if (modalTitle) modalTitle.innerText = "Tạo nhóm thiết bị mới";
            if (btnSave) btnSave.innerText = "Lưu cấu hình";

            const modalElement = document.getElementById('addCategoryModal');
            const modal = (window as any).bootstrap.Modal.getOrCreateInstance(modalElement);
            modal.show();
        };

        (window as any).deleteCategory = async (id: string) => {
            if (confirm("Bạn có chắc muốn xóa danh mục này?")) {
                try {
                    await this.categoryService.deleteCategory(id);
                    await this.renderCategories();
                } catch (error) {
                    console.error("Lỗi xóa danh mục:", error);
                    alert("Lỗi khi xóa danh mục");
                }
            }
        };
    }
}