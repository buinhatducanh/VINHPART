'use client'

import type { Category } from '@/types'

interface CategoryFilterProps {
    categories: Category[]
    selectedId: number | 'all'
    onSelect: (id: number | 'all') => void
}

export default function CategoryFilter({ categories, selectedId, onSelect }: CategoryFilterProps) {
    return (
        <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            justifyContent: 'center',
            marginBottom: 'var(--space-10)',
            flexWrap: 'wrap'
        }}>
            <button
                onClick={() => onSelect('all')}
                style={{
                    padding: 'var(--space-2) var(--space-5)',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid',
                    borderColor: selectedId === 'all' ? 'var(--color-primary)' : 'var(--color-gray-300)',
                    backgroundColor: selectedId === 'all' ? 'var(--color-primary)' : 'transparent',
                    color: selectedId === 'all' ? 'var(--color-white)' : 'var(--color-black)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                }}
            >
                Tất cả
            </button>

            {categories.map(cat => (
                <button
                    key={cat.id}
                    onClick={() => onSelect(cat.id)}
                    style={{
                        padding: 'var(--space-2) var(--space-5)',
                        borderRadius: 'var(--radius-full)',
                        border: '2px solid',
                        borderColor: selectedId === cat.id ? 'var(--color-primary)' : 'var(--color-gray-300)',
                        backgroundColor: selectedId === cat.id ? 'var(--color-primary)' : 'transparent',
                        color: selectedId === cat.id ? 'var(--color-white)' : 'var(--color-black)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                    }}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    )
}
