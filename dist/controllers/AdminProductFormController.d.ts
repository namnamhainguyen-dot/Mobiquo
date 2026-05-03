export declare class AdminProductFormController {
    private view;
    private productService;
    private categoryService;
    /**
     * Khởi tạo Form: Xác định chế độ Thêm mới hay Chỉnh sửa dựa vào ID trên URL
     */
    init(): Promise<void>;
    /**
     * Render giao diện Form
     */
    render(id: string | null): Promise<void>;
    /**
     * Xử lý các sự kiện Submit và Preview ảnh
     */
    attachEvents(id: string | null): void;
    /**
     * Cập nhật ảnh Preview
     */
    private updateImagePreview;
}
//# sourceMappingURL=AdminProductFormController.d.ts.map