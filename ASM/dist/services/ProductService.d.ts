import { Product } from "../models/Product.js";
import { ApiService } from "./ApiService.js";
export declare class ProductService extends ApiService {
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product>;
    create(p: Product | any): Promise<Product>;
    edit(p: Product | any): Promise<Product>;
    remove(id: string): Promise<any>;
    search(query: string, catId: string, brandId: string): Promise<Product[]>;
}
//# sourceMappingURL=ProductService.d.ts.map