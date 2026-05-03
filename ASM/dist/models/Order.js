import { User } from "./User.js";
export class Order {
    constructor(id, createdDate, total, user, items, status) {
        this.id = id;
        this.createdDate = createdDate;
        this.total = total;
        this.user = user;
        this.items = items;
        this.status = status;
    }
}
//# sourceMappingURL=Order.js.map