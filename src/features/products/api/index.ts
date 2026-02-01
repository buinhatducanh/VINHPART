import { API_ENDPOINTS } from '@/shared/constants';
import type { Product, Category, ProductFilters } from '../types';

/**
 * Fetch all products with optional filters
 */
export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
    const params = new URLSearchParams();

    if (filters?.categoryId) params.set('categoryId', String(filters.categoryId));
    if (filters?.featured) params.set('featured', 'true');
    if (filters?.search) params.set('search', filters.search);
    if (filters?.page) params.set('page', String(filters.page));
    if (filters?.limit) params.set('limit', String(filters.limit));

    const url = `${API_ENDPOINTS.products}${params.toString() ? `?${params}` : ''}`;
    const res = await fetch(url);

    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

/**
 * Fetch single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
    const res = await fetch(`${API_ENDPOINTS.products}/${slug}`);
    if (!res.ok) return null;
    return res.json();
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
    const res = await fetch(API_ENDPOINTS.categories);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}
