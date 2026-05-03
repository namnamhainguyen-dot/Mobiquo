export class Product {
    public id: string|undefined;
    public name: string;
    public price: number;
    public image: string;
    public description: string;
    public category_id: string;
    public _id: any;
    constructor(id: string|undefined, name: string, price: number, image: string, description: string, category_id: string) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
        this.description = description;
        this.category_id = category_id;
    }
}