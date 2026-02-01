// Product types
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

export interface Category {
    id: number
    name: string
    slug: string
    image?: string | null
}

export interface ProductFilters {
    categoryId?: number
    featured?: boolean
    search?: string
    page?: number
    limit?: number
}
