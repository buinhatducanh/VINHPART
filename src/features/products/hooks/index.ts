'use client'

import { useState, useEffect, useMemo } from 'react';
import { getProducts, getCategories } from '../api';
import type { Product, Category, ProductFilters } from '../types';

/**
 * Hook to fetch products with filters
 */
export function useProducts(filters?: ProductFilters) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Memoize filters to prevent unnecessary re-renders
    const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await getProducts(filters);
                setProducts(data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterKey]);

    return { products, loading, error };
}

/**
 * Hook to fetch categories
 */
export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getCategories()
            .then(setCategories)
            .finally(() => setLoading(false));
    }, []);

    return { categories, loading };
}
