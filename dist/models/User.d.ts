export declare class User {
    id?: string | undefined;
    name: string;
    phone: string;
    email?: string;
    password?: string;
    address?: string;
    role: "admin" | "user";
    status?: "active" | "locked";
    constructor(id: string | undefined, name: string, phone: string, email: string, password: string, address: string, role: "admin" | "user");
}
//# sourceMappingURL=User.d.ts.map