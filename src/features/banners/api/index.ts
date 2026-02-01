import { API_ENDPOINTS } from '@/shared/constants';
import type { Banner } from '../types';

/**
 * Get all active banners
 */
export async function getBanners(): Promise<Banner[]> {
    const res = await fetch(API_ENDPOINTS.banners);
    if (!res.ok) throw new Error('Failed to fetch banners');
    return res.json();
}
