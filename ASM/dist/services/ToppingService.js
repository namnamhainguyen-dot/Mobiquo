import { Topping } from "../models/Bonus.js";
import { ApiService } from "./ApiService.js";
export class ToppingService extends ApiService {
    async getAll() {
        const data = await this.get('/toppings');
        return data.map((t) => new Topping(t.id, t.name, t.price));
    }
}
//# sourceMappingURL=ToppingService.js.map