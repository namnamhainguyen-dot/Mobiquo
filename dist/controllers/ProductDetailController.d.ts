export declare class ProductDetailController {
    private productService;
    private view;
    private bonusService;
    private cartService;
    private product;
    private bonuses;
    private selectedBonuses;
    /**
     * Khởi tạo trang chi tiết sản phẩm
     */
    init(): Promise<void>;
    /**
     * Render dữ liệu ra HTML
     */
    private render;
    /**
     * Gán các sự kiện tương tác
     */
    private addEvents;
    /**
     * Cập nhật hiển thị tổng tiền dựa trên sản phẩm và quà tặng đã chọn
     */
    private updateTotalPriceDisplay;
}
//# sourceMappingURL=ProductDetailController.d.ts.map