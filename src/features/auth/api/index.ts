import { API_ENDPOINTS } from '@/shared/constants';
import type { LoginCredentials, AuthResponse, User } from '../types';

/**
 * Login with email and password
 */
export async function login(credentials: LoginCredentials): Promise<AuthResponse> {
    const res = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });

    return res.json();
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser(): Promise<User | null> {
    const res = await fetch(API_ENDPOINTS.auth.me);
    if (!res.ok) return null;
    const data = await res.json();
    return data.user;
}

/**
 * Logout current user
 */
export async function logout(): Promise<void> {
    await fetch(API_ENDPOINTS.auth.logout, { method: 'POST' });
}
