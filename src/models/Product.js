export class Product {
    id;
    name;
    price;
    image;
    description;
    category_id;
    _id;
    constructor(id, name, price, image, description, category_id) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category_id = category_id;
    }
}
