// Shared constants
export const APP_NAME = 'VinhPart';
export const APP_DESCRIPTION = 'Phụ tùng ô tô chính hãng';

// Currency
export const CURRENCY = {
    code: 'VND',
    symbol: '₫',
    locale: 'vi-VN'
} as const;

// Pagination
export const PAGINATION = {
    defaultPageSize: 12,
    pageSizeOptions: [12, 24, 48]
} as const;

// Order Status
export const ORDER_STATUS_LABELS: Record<string, string> = {
    PENDING: 'Chờ xác nhận',
    CONFIRMED: 'Đã xác nhận',
    SHIPPING: 'Đang giao hàng',
    COMPLETED: 'Hoàn thành',
    CANCELLED: 'Đã hủy'
};

// API Endpoints
export const API_ENDPOINTS = {
    products: '/api/products',
    categories: '/api/categories',
    banners: '/api/banners',
    orders: '/api/orders',
    auth: {
        login: '/api/auth/login',
        logout: '/api/auth/logout',
        me: '/api/auth/me'
    }
} as const;
