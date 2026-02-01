'use client'

import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'

interface CartDrawerProps {
    isOpen: boolean
    onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore()
    const total = totalPrice()

    if (!isOpen) return null

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    transition: 'opacity 0.3s'
                }}
            />

            {/* Drawer */}
            <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '100%',
                maxWidth: '420px',
                backgroundColor: 'var(--color-white)',
                boxShadow: 'var(--shadow-xl)',
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideIn 0.3s ease'
            }}>
                {/* Header */}
                <div style={{
                    padding: 'var(--space-5)',
                    borderBottom: '1px solid var(--color-gray-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <ShoppingBag size={24} />
                        <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700 }}>
                            Giỏ hàng ({items.length})
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 'var(--space-2)',
                            borderRadius: 'var(--radius-full)',
                            color: 'var(--color-gray-500)'
                        }}
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Items */}
                <div style={{
                    flex: 1,
                    overflow: 'auto',
                    padding: 'var(--space-4)'
                }}>
                    {items.length === 0 ? (
                        <div style={{
                            textAlign: 'center',
                            padding: 'var(--space-16)',
                            color: 'var(--color-gray-500)'
                        }}>
                            <ShoppingBag size={48} style={{ margin: '0 auto var(--space-4)', opacity: 0.3 }} />
                            <p>Giỏ hàng trống</p>
                            <p style={{ fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>
                                Hãy thêm sản phẩm vào giỏ hàng!
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    style={{
                                        display: 'flex',
                                        gap: 'var(--space-4)',
                                        padding: 'var(--space-4)',
                                        backgroundColor: 'var(--color-gray-100)',
                                        borderRadius: 'var(--radius-lg)'
                                    }}
                                >
                                    {/* Image */}
                                    <img
                                        src={item.images[0] || 'https://ui-avatars.com/api/?name=No+Image'}
                                        alt={item.name}
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            objectFit: 'cover',
                                            borderRadius: 'var(--radius-md)'
                                        }}
                                    />

                                    {/* Details */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{
                                            fontWeight: 600,
                                            marginBottom: 'var(--space-1)',
                                            fontSize: 'var(--font-size-sm)',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {item.name}
                                        </h4>
                                        <p className="price" style={{ fontSize: 'var(--font-size-sm)', marginBottom: 'var(--space-3)' }}>
                                            {formatPrice(item.price)}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 'var(--space-2)'
                                        }}>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: 'var(--radius-sm)',
                                                    border: '1px solid var(--color-gray-300)',
                                                    background: 'var(--color-white)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span style={{
                                                fontWeight: 600,
                                                minWidth: '30px',
                                                textAlign: 'center'
                                            }}>
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                style={{
                                                    width: '28px',
                                                    height: '28px',
                                                    borderRadius: 'var(--radius-sm)',
                                                    border: '1px solid var(--color-gray-300)',
                                                    background: 'var(--color-white)',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <Plus size={14} />
                                            </button>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                style={{
                                                    marginLeft: 'auto',
                                                    color: 'var(--color-primary)',
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    padding: 'var(--space-1)'
                                                }}
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div style={{
                        padding: 'var(--space-5)',
                        borderTop: '1px solid var(--color-gray-200)',
                        background: 'var(--color-gray-100)'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 'var(--space-4)'
                        }}>
                            <span style={{ fontWeight: 600 }}>Tổng cộng:</span>
                            <span className="price" style={{ fontSize: 'var(--font-size-xl)' }}>
                                {formatPrice(total)}
                            </span>
                        </div>

                        <button
                            onClick={() => {
                                onClose()
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                            }}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: 'var(--space-4)' }}
                        >
                            Đặt hàng ngay
                        </button>

                        <button
                            onClick={clearCart}
                            style={{
                                width: '100%',
                                marginTop: 'var(--space-2)',
                                padding: 'var(--space-2)',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--color-gray-500)',
                                cursor: 'pointer',
                                fontSize: 'var(--font-size-sm)'
                            }}
                        >
                            Xóa giỏ hàng
                        </button>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
        </div>
    )
}
