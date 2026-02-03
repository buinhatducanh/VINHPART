'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { ShoppingCart, Zap } from 'lucide-react'
import type { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface ProductCardProps {
    product: Product
    onAddToCart: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const [currentImage, setCurrentImage] = useState(0)

    const images = product.images.length > 0
        ? product.images
        : ['https://ui-avatars.com/api/?name=No+Image&background=262626&color=737373&size=400']

    // Check for discount (using priceNote as indicator for demo)
    const hasDiscount = product.priceNote?.includes('%')
    const discountPercent = hasDiscount ? parseInt(product.priceNote?.match(/\d+/)?.[0] || '0') : 0

    // Stock status based on product stock quantity
    const getStockStatus = (): 'in_stock' | 'low_stock' | 'out_of_stock' => {
        const stock = product.stock ?? 10 // Default to in stock if not specified
        if (stock <= 0) return 'out_of_stock'
        if (stock <= 5) return 'low_stock'
        return 'in_stock'
    }
    const stockStatus = getStockStatus()

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="card"
            style={{ position: 'relative' }}
        >
            {/* Glow effect on hover */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to bottom, rgba(220, 38, 38, 0), rgba(220, 38, 38, 0.05), rgba(220, 38, 38, 0))',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                pointerEvents: 'none'
            }} />

            {/* Product Image */}
            <div style={{
                position: 'relative',
                aspectRatio: '1',
                background: 'linear-gradient(to bottom right, var(--color-gray-800), var(--color-gray-900))',
                overflow: 'hidden'
            }}>
                <motion.img
                    src={images[currentImage]}
                    alt={product.name}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                />

                {/* Overlay gradient */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, var(--color-gray-900), transparent, transparent)',
                    opacity: 0.6,
                    pointerEvents: 'none'
                }} />

                {/* Discount Badge */}
                {discountPercent > 0 && (
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        style={{
                            position: 'absolute',
                            top: 'var(--space-3)',
                            left: 'var(--space-3)',
                            zIndex: 10
                        }}
                    >
                        <div style={{
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: '#facc15',
                                borderRadius: 'var(--radius-full)',
                                filter: 'blur(8px)',
                                opacity: 0.6
                            }} />
                            <span className="badge badge-discount" style={{
                                position: 'relative',
                                fontWeight: 800,
                                border: '2px solid #fde047'
                            }}>
                                -{discountPercent}%
                            </span>
                        </div>
                    </motion.div>
                )}

                {/* Stock Badge */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-3)',
                        right: 'var(--space-3)',
                        zIndex: 10
                    }}
                >
                    {stockStatus === 'in_stock' && (
                        <span className="badge badge-success">Còn hàng</span>
                    )}
                    {stockStatus === 'low_stock' && (
                        <span className="badge badge-warning">Sắp hết</span>
                    )}
                    {stockStatus === 'out_of_stock' && (
                        <span className="badge" style={{
                            background: 'var(--color-gray-600)',
                            color: 'white'
                        }}>Hết hàng</span>
                    )}
                </motion.div>

                {/* Category Badge */}
                <div style={{
                    position: 'absolute',
                    bottom: 'var(--space-3)',
                    left: 'var(--space-3)',
                    zIndex: 10
                }}>
                    <span style={{
                        padding: 'var(--space-1) var(--space-3)',
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(12px)',
                        color: 'white',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 700,
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid rgba(220, 38, 38, 0.3)'
                    }}>
                        {product.category?.name || 'Chưa phân loại'}
                    </span>
                </div>

                {/* Image navigation dots */}
                {images.length > 1 && (
                    <div style={{
                        position: 'absolute',
                        bottom: 'var(--space-3)',
                        right: 'var(--space-3)',
                        display: 'flex',
                        gap: 'var(--space-1)',
                        zIndex: 10
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
                                    backgroundColor: currentImage === i
                                        ? 'var(--color-primary)'
                                        : 'rgba(255,255,255,0.5)',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div style={{ padding: 'var(--space-4)', position: 'relative', zIndex: 10 }}>
                <h3 style={{
                    color: 'var(--color-white)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-2)',
                    minHeight: '3rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    transition: 'color 0.3s'
                }}>
                    {product.name}
                </h3>

                {/* Description */}
                {product.description && (
                    <p style={{
                        color: 'var(--color-gray-400)',
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

                {/* Price Section */}
                <div style={{
                    background: 'linear-gradient(to right, rgba(220, 38, 38, 0.2), transparent)',
                    borderLeft: '4px solid var(--color-primary)',
                    paddingLeft: 'var(--space-3)',
                    paddingTop: 'var(--space-2)',
                    paddingBottom: 'var(--space-2)',
                    marginBottom: 'var(--space-4)'
                }}>
                    <div className="price" style={{ fontSize: 'var(--font-size-xl)', fontWeight: 800 }}>
                        {formatPrice(product.price)}
                    </div>
                    {product.priceNote && (
                        <p style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-gray-500)'
                        }}>
                            {product.priceNote}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onAddToCart}
                        className="btn btn-primary"
                        style={{
                            flex: 1,
                            padding: 'var(--space-3)',
                            gap: 'var(--space-2)'
                        }}
                    >
                        <Zap size={18} />
                        <span>Mua ngay</span>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onAddToCart}
                        className="btn btn-secondary"
                        style={{
                            padding: 'var(--space-3)',
                            minWidth: '44px'
                        }}
                    >
                        <ShoppingCart size={18} />
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}
