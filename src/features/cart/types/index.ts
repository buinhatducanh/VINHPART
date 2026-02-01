// Cart types
export interface CartItem {
    id: number
    name: string
    slug: string
    price: number
    images: string[]
    quantity: number
}

export interface CartState {
    items: CartItem[]
    addItem: (item: Omit<CartItem, 'quantity'>) => void
    removeItem: (id: number) => void
    updateQuantity: (id: number, quantity: number) => void
    clearCart: () => void
    totalItems: () => number
    totalPrice: () => number
}
