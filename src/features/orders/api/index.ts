import { API_ENDPOINTS } from '@/shared/constants';
import type { Order, CreateOrderInput } from '../types';

/**
 * Create new order
 */
export async function createOrder(input: CreateOrderInput): Promise<Order> {
    const res = await fetch(API_ENDPOINTS.orders, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create order');
    }

    return res.json();
}

/**
 * Get orders (admin)
 */
export async function getOrders(): Promise<Order[]> {
    const res = await fetch(API_ENDPOINTS.orders);
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
}
