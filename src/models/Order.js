export class Order {
    id;
    createdDate;
    total;
    user;
    items;
    status;
    constructor(id, createdDate, total, user, items, status) {
        this.id = id;
        this.createdDate = createdDate;
        this.total = total;
        this.user = user;
        this.items = items;
        this.status = status;
    }
}
