export declare class ApiService {
    protected baseUrl: string;
    private getHeaders;
    get<T>(endpoint: string): Promise<T>;
    post<T>(endpoint: string, data: any): Promise<T>;
    update<T>(endpoint: string, data: any): Promise<T>;
    delete<T>(endpoint: string): Promise<T>;
}
//# sourceMappingURL=ApiService.d.ts.map