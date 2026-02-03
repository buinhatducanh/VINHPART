'use client'

import { motion } from 'motion/react'
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
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect('all')}
                style={{
                    padding: 'var(--space-2) var(--space-5)',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid',
                    borderColor: selectedId === 'all' ? 'var(--color-primary)' : 'var(--color-gray-700)',
                    background: selectedId === 'all'
                        ? 'linear-gradient(135deg, var(--color-primary), #b91c1c)'
                        : 'transparent',
                    color: selectedId === 'all' ? 'var(--color-white)' : 'var(--color-gray-300)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: selectedId === 'all' ? '0 4px 15px rgba(220, 38, 38, 0.3)' : 'none'
                }}
            >
                Tất cả
            </motion.button>

            {categories.map(cat => (
                <motion.button
                    key={cat.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelect(cat.id)}
                    style={{
                        padding: 'var(--space-2) var(--space-5)',
                        borderRadius: 'var(--radius-full)',
                        border: '2px solid',
                        borderColor: selectedId === cat.id ? 'var(--color-primary)' : 'var(--color-gray-700)',
                        background: selectedId === cat.id
                            ? 'linear-gradient(135deg, var(--color-primary), #b91c1c)'
                            : 'transparent',
                        color: selectedId === cat.id ? 'var(--color-white)' : 'var(--color-gray-300)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: selectedId === cat.id ? '0 4px 15px rgba(220, 38, 38, 0.3)' : 'none'
                    }}
                >
                    {cat.name}
                </motion.button>
            ))}
        </div>
    )
}
