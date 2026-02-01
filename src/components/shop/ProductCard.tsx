'use client'

import { useState } from 'react'
import { ShoppingCart, Eye } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
    product: Product
    onAddToCart: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const [currentImage, setCurrentImage] = useState(0)
    const [isHovered, setIsHovered] = useState(false)

    const images = product.images.length > 0
        ? product.images
        : ['https://ui-avatars.com/api/?name=No+Image&background=e5e5e5&color=737373&size=400']

    return (
        <div
            className="card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <div style={{
                position: 'relative',
                paddingTop: '75%',
                backgroundColor: 'var(--color-gray-200)',
                overflow: 'hidden'
            }}>
                <img
                    src={images[currentImage]}
                    alt={product.name}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s',
                        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
                    }}
                />

                {/* Featured Badge */}
                {product.featured && (
                    <span style={{
                        position: 'absolute',
                        top: 'var(--space-3)',
                        left: 'var(--space-3)',
                        padding: 'var(--space-1) var(--space-3)',
                        backgroundColor: 'var(--color-primary)',
                        color: 'var(--color-white)',
                        borderRadius: 'var(--radius-full)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 700
                    }}>
                        Hot
                    </span>
                )}

                {/* Image navigation dots */}
                {images.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: 'var(--space-2)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: 'var(--space-1)'
                    }}>
                        {images.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentImage(i)}
                                style={{
                                    width: '8px',
                                    height: '8px',
                                    borderRadius: '50%',
                                    border: 'none',
                                    backgroundColor: currentImage === i ? 'var(--color-primary)' : 'rgba(255,255,255,0.7)',
                                    cursor: 'pointer'
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Quick actions overlay */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-3)',
                    opacity: isHovered ? 1 : 0,
                    transition: 'opacity 0.3s'
                }}>
                    <button
                        onClick={onAddToCart}
                        className="btn btn-primary"
                        style={{ padding: 'var(--space-3)' }}
                    >
                        <ShoppingCart size={20} />
                    </button>
                    <button
                        className="btn btn-secondary"
                        style={{ padding: 'var(--space-3)' }}
                    >
                        <Eye size={20} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div style={{ padding: 'var(--space-5)' }}>
                {/* Category */}
                <span style={{
                    display: 'inline-block',
                    padding: 'var(--space-1) var(--space-3)',
                    backgroundColor: 'var(--color-gray-200)',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 'var(--font-size-xs)',
                    fontWeight: 600,
                    marginBottom: 'var(--space-3)',
                    color: 'var(--color-gray-600)'
                }}>
                    {product.category?.name || 'Chưa phân loại'}
                </span>

                {/* Name */}
                <h3 style={{
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-2)',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                }}>
                    {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                    <p style={{
                        color: 'var(--color-gray-500)',
                        fontSize: 'var(--font-size-sm)',
                        marginBottom: 'var(--space-4)',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {product.description}
                    </p>
                )}

                {/* Price & Add to Cart */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 'var(--space-4)'
                }}>
                    <div>
                        <span className="price">{formatPrice(product.price)}</span>
                        {product.priceNote && (
                            <p style={{
                                fontSize: 'var(--font-size-xs)',
                                color: 'var(--color-gray-500)'
                            }}>
                                {product.priceNote}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={onAddToCart}
                        className="btn btn-primary"
                    >
                        + Thêm
                    </button>
                </div>
            </div>
        </div>
    )
}
