import { ApiService } from "./ApiService.js";
import { User } from "../models/User.js";

export class UserService extends ApiService {
    private static instance: UserService;
    static getInstance(): UserService {
        if (!UserService.instance) UserService.instance = new UserService();
        return UserService.instance;
    }

    // Đăng ký
    async register(user: User): Promise<any> {
        return await this.post('/users/register', user);
    }

    // Đăng nhập (Nhận Token từ BE)
    async login(email: string, password: string): Promise<any> {
        const response: any = await this.post('/users/login', { email, password });
        if (response.token) {
            localStorage.setItem('token', response.token);
            this.saveLoginState(response.user);
            return response.user;
        }
        return false;
    }

    saveLoginState(user: any): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getLoginState(): User | false {
        const userStr = localStorage.getItem('user');
        if (!userStr) return false;
        const u = JSON.parse(userStr);
        return new User(u.id, u.name, u.phone || '', u.email, '', u.address || '', u.role);
    }

    clearLoginState(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        location.href = 'login.html';
    }

    async getAll(): Promise<User[]> {
        return await this.get<User[]>('/users');
    }

    async getById(id: string): Promise<User> {
        return await this.get<User>(`/users/${id}`);
    }

    async updateData(id: string, user: Partial<User>): Promise<User> {
        return await this.update<User>(`/users/${id}`, user);
    }

    async remove(id: string): Promise<any> {
        return await this.delete(`/users/${id}`);
    }

    async updateUserStatus(id: string, status: string): Promise<any> {
        return await this.update(`/users/${id}`, { status });
    }
}