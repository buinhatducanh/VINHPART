export interface Category {
    id: number
    name: string
    slug: string
    image?: string | null
}

export interface Product {
    id: number
    name: string
    slug: string
    description?: string | null
    price: number
    priceNote?: string | null
    images: string[]
    stock: number
    featured: boolean
    categoryId?: number | null
    category?: Category | null
}

export interface Banner {
    id: number
    imageUrl: string
    title?: string | null
    link?: string | null
    order: number
    active: boolean
}

export interface CartItem extends Product {
    quantity: number
}

export interface OrderItem {
    productId: number
    productName: string
    quantity: number
    price: number
}

export interface Order {
    id?: number
    orderNumber?: string
    name: string
    phone: string
    address: string
    note?: string
    status?: OrderStatus
    total: number
    items: OrderItem[]
}

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED'

export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
}
