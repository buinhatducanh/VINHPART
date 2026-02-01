// Orders types
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'SHIPPING' | 'COMPLETED' | 'CANCELLED'

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
    createdAt?: string
}

export interface CreateOrderInput {
    name: string
    phone: string
    address: string
    note?: string
    items: Array<{
        productId: number
        quantity: number
        price: number
    }>
}
