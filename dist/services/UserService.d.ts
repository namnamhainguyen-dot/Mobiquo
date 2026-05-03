import { ApiService } from "./ApiService.js";
import { User } from "../models/User.js";
export declare class UserService extends ApiService {
    private static instance;
    static getInstance(): UserService;
    register(user: User): Promise<any>;
    login(email: string, password: string): Promise<any>;
    saveLoginState(user: any): void;
    getLoginState(): User | false;
    clearLoginState(): void;
    getAll(): Promise<User[]>;
    getById(id: string): Promise<User>;
    updateData(id: string, user: Partial<User>): Promise<User>;
    remove(id: string): Promise<any>;
    updateUserStatus(id: string, status: string): Promise<any>;
}
//# sourceMappingURL=UserService.d.ts.map