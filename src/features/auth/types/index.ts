// Auth types
export interface User {
    id: number
    email: string
    name?: string | null
    role: 'USER' | 'ADMIN'
}

export interface JwtPayload {
    userId: number
    email: string
    role: string
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface AuthResponse {
    success: boolean
    user?: User
    error?: string
}
