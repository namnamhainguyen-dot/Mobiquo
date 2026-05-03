export class User {
    id;
    name;
    phone;
    email;
    password;
    address;
    role;
    status;
    constructor(id, name, phone, email, password, address, role) {
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
