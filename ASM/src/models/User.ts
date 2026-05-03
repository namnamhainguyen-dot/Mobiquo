export class User {
    public id?: string|undefined;
    public name: string;
    public phone: string;
    public email?: string;
    public password?: string;
    public address?: string;
    public role: "admin" | "user";
    public status?: "active" | "locked";

    constructor(id: string|undefined, name: string, phone: string, email: string, password: string, address: string, role: "admin" | "user") {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.address = address;
        this.role = role;
        // status sẽ được gán từ data API nếu có
    }
}