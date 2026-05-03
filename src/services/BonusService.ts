import { Bonus } from "../models/Bonus.js";
import { ApiService } from "./ApiService.js";

export class BonusService extends ApiService {
    async getAll():Promise<Bonus[]> {
        const data:Bonus[]= await this.get('/bonuses');
        return data.map((t:Bonus) => new Bonus(t.id, t.name, t.price));
    }
}