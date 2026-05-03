export class ApiService {
    // SỬA: Bỏ chữ /api (vì Backend của bạn không dùng) 
    // và nên thêm dấu / ở cuối để tránh lỗi ghép chuỗi
    baseUrl = 'http://localhost:3000/api';
    getHeaders() {
        const token = localStorage.getItem('token');
        const headers = { "Content-Type": "application/json" };
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
        }
        return headers;
    }
    async get(endpoint) {
        try {
            // endpoint truyền vào là "/categories" -> kết quả là http://localhost:3000/categories
            let res = await fetch(`${this.baseUrl}${endpoint}`, {
                headers: this.getHeaders()
            });
            if (!res.ok)
                throw new Error('Không thể lấy dữ liệu');
            return await res.json();
        }
        catch (error) {
            throw error;
        }
    }
    async post(endpoint, data) {
        try {
            let res = await fetch(`${this.baseUrl}${endpoint}`, {
                method: "POST",
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (!res.ok)
                throw new Error(result.message || 'Lỗi gửi dữ liệu');
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    // SỬA: Đảm bảo dùng PUT để khớp với Backend router.put
    async update(endpoint, data) {
        try {
            const res = await fetch(`${this.baseUrl}${endpoint}`, {
                method: "PUT", // Đã khớp với Backend
                headers: this.getHeaders(),
                body: JSON.stringify(data)
            });
            const result = await res.json();
            if (!res.ok)
                throw new Error(result.message || 'Lỗi cập nhật');
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(endpoint) {
        try {
            const res = await fetch(`${this.baseUrl}${endpoint}`, {
                method: "DELETE",
                headers: this.getHeaders()
            });
            const result = await res.json();
            if (!res.ok)
                throw new Error(result.message || 'Lỗi xóa dữ liệu');
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
