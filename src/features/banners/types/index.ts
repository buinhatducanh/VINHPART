// Banner types
export interface Banner {
    id: number
    imageUrl: string
    title?: string | null
    link?: string | null
    order: number
    active: boolean
}
