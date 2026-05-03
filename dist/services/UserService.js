import { ApiService } from "./ApiService.js";
import { User } from "../models/User.js";
export class UserService extends ApiService {
    static getInstance() {
        if (!UserService.instance)
            UserService.instance = new UserService();
        return UserService.instance;
    }
    // Đăng ký
    async register(user) {
        return await this.post('/users/register', user);
    }
    // Đăng nhập (Nhận Token từ BE)
    async login(email, password) {
        const response = await this.post('/users/login', { email, password });
        if (response.token) {
            localStorage.setItem('token', response.token);
            this.saveLoginState(response.user);
            return response.user;
        }
        return false;
    }
    saveLoginState(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }
    getLoginState() {
        const userStr = localStorage.getItem('user');
        if (!userStr)
            return false;
        const u = JSON.parse(userStr);
        return new User(u.id, u.name, u.phone || '', u.email, '', u.address || '', u.role);
    }
    clearLoginState() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        location.href = 'login.html';
    }
    async getAll() {
        return await this.get('/users');
    }
    async getById(id) {
        return await this.get(`/users/${id}`);
    }
    async updateData(id, user) {
        return await this.update(`/users/${id}`, user);
    }
    async remove(id) {
        return await this.delete(`/users/${id}`);
    }
    async updateUserStatus(id, status) {
        return await this.update(`/users/${id}`, { status });
    }
}
//# sourceMappingURL=UserService.js.map