import { Bonus } from "../models/Bonus.js";
import { ApiService } from "./ApiService.js";
export class BonusService extends ApiService {
    async getAll() {
        const data = await this.get('/bonuses');
        return data.map((t) => new Bonus(t.id, t.name, t.price));
    }
}
//# sourceMappingURL=BonusService.js.map