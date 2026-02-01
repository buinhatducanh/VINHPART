'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Search, Phone } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/store/cart-store'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const totalItems = useCartStore(state => state.totalItems())

    return (
        <>
            {/* Top Bar */}
            <div style={{
                background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)',
                color: 'white',
                fontSize: 'var(--font-size-sm)',
                padding: 'var(--space-2) 0'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <Phone size={14} />
                        <span>Hotline: 0123 456 789</span>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                        <span>🚚 Giao hàng toàn quốc</span>
                        <span className="md-show" style={{ display: 'none' }}>✓ Bảo hành chính hãng</span>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <header style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                background: 'var(--color-white)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
            }}>
                <div className="container" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: '75px',
                    gap: 'var(--space-4)'
                }}>
                    {/* Logo */}
                    <Link href="/" style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 800,
                        textDecoration: 'none',
                        color: 'var(--color-black)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)'
                    }}>
                        <div style={{
                            width: '45px',
                            height: '45px',
                            background: 'linear-gradient(135deg, #f97316, #ea580c)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 900,
                            fontSize: '18px'
                        }}>
                            VP
                        </div>
                        <div>
                            <span style={{ color: '#f97316' }}>VINH</span>
                            <span style={{ color: '#1e3a8a' }}>PART</span>
                        </div>
                    </Link>

                    {/* Search - Desktop */}
                    <div style={{
                        flex: 1,
                        maxWidth: '450px',
                        display: 'none'
                    }} className="md-show">
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            background: '#f8fafc',
                            border: '2px solid #e2e8f0',
                            borderRadius: '50px',
                            padding: '0 var(--space-4)',
                            transition: 'all 0.3s ease'
                        }}>
                            <Search size={20} color="#94a3b8" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm phụ tùng, phụ kiện..."
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    outline: 'none',
                                    padding: 'var(--space-3) var(--space-3)',
                                    background: 'transparent',
                                    fontSize: 'var(--font-size-sm)',
                                    color: '#334155'
                                }}
                            />
                            <button style={{
                                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                border: 'none',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '25px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 600
                            }}>
                                Tìm kiếm
                            </button>
                        </div>
                    </div>

                    {/* Desktop Nav */}
                    <nav style={{
                        display: 'none',
                        alignItems: 'center',
                        gap: 'var(--space-1)'
                    }} className="md-show">
                        {[
                            { href: '/#products', label: 'Sản phẩm' },
                            { href: '/#about', label: 'Về chúng tôi' },
                            { href: '/#contact', label: 'Liên hệ' }
                        ].map(item => (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    color: '#334155',
                                    textDecoration: 'none',
                                    fontWeight: 600,
                                    padding: '10px 16px',
                                    borderRadius: '8px',
                                    transition: 'all 0.2s ease',
                                    fontSize: '15px'
                                }}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Cart & Mobile Menu */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <button
                            style={{
                                position: 'relative',
                                background: '#f8fafc',
                                border: '2px solid #e2e8f0',
                                color: '#334155',
                                cursor: 'pointer',
                                padding: '12px',
                                borderRadius: '12px',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            <ShoppingCart size={22} />
                            {totalItems > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '-6px',
                                    width: '22px',
                                    height: '22px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 2px 8px rgba(249, 115, 22, 0.4)'
                                }}>
                                    {totalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            style={{
                                background: '#f8fafc',
                                border: '2px solid #e2e8f0',
                                color: '#334155',
                                cursor: 'pointer',
                                padding: '12px',
                                borderRadius: '12px',
                                display: 'block'
                            }}
                            className="md-hide"
                        >
                            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <nav style={{
                        background: 'white',
                        padding: 'var(--space-4)',
                        borderTop: '1px solid #e2e8f0',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                            {[
                                { href: '/#products', label: 'Sản phẩm' },
                                { href: '/#about', label: 'Về chúng tôi' },
                                { href: '/#contact', label: 'Liên hệ' }
                            ].map(item => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{
                                        color: '#334155',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        padding: '14px 16px',
                                        borderRadius: '10px',
                                        background: '#f8fafc'
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                )}
            </header>
        </>
    )
}
