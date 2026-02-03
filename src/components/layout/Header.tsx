'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Search, User } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useCartStore } from '@/store/cart-store'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)
    const [showAccountMenu, setShowAccountMenu] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isAtTop, setIsAtTop] = useState(true)
    const accountMenuRef = useRef<HTMLDivElement>(null)
    const totalItems = useCartStore(state => state.totalItems())

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setIsAtTop(currentScrollY < 50)

            if (currentScrollY < lastScrollY || currentScrollY < 10) {
                setIsVisible(true)
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
                setShowAccountMenu(false)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setShowAccountMenu(false)
            }
        }

        if (showAccountMenu) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showAccountMenu])

    return (
        <motion.header
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : -100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                transition: 'all 0.5s ease',
                background: isAtTop ? 'transparent' : 'rgba(0, 0, 0, 0.95)',
                backdropFilter: isAtTop ? 'none' : 'blur(12px)',
                borderBottom: isAtTop ? '1px solid transparent' : '1px solid rgba(220, 38, 38, 0.2)',
                boxShadow: isAtTop ? 'none' : '0 10px 40px rgba(220, 38, 38, 0.1)'
            }}
        >
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '80px',
                gap: 'var(--space-4)'
            }}>
                {/* Logo - VINPART Design */}
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)',
                            cursor: 'pointer'
                        }}
                    >
                        <motion.div
                            whileHover={{ rotate: 5 }}
                            style={{ position: 'relative', width: '56px', height: '56px' }}
                        >
                            {/* Outer glow ring */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to bottom right, #ef4444, var(--color-primary), #b91c1c)',
                                borderRadius: 'var(--radius-xl)',
                                filter: 'blur(8px)',
                                opacity: 0.6
                            }} />

                            {/* Main logo container */}
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                background: 'linear-gradient(to bottom right, var(--color-primary), #b91c1c, #991b1b)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 10px 30px rgba(220, 38, 38, 0.5)',
                                border: '1px solid rgba(239, 68, 68, 0.3)'
                            }}>
                                <div style={{ position: 'relative' }}>
                                    <span style={{
                                        fontSize: '24px',
                                        fontWeight: 900,
                                        color: 'white',
                                        letterSpacing: '-2px'
                                    }}>V</span>
                                    <span style={{
                                        position: 'absolute',
                                        top: '-4px',
                                        right: '-10px',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        color: '#fca5a5'
                                    }}>P</span>
                                </div>
                            </div>

                            {/* Corner accent */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '8px',
                                height: '8px',
                                background: 'white',
                                borderRadius: 'var(--radius-full)',
                                opacity: 0.6
                            }} />
                        </motion.div>

                        <div style={{ display: 'block' }}>
                            <motion.div
                                whileHover={{ x: 2 }}
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 900,
                                    letterSpacing: '1px'
                                }}
                            >
                                <span style={{
                                    background: 'linear-gradient(to right, white, #fca5a5, white)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text'
                                }}>
                                    VINPART
                                </span>
                            </motion.div>
                            <div style={{
                                fontSize: '10px',
                                color: 'var(--color-gray-400)',
                                letterSpacing: '3px',
                                fontWeight: 500
                            }}>
                                AUTO EXCELLENCE
                            </div>
                        </div>
                    </motion.div>
                </Link>

                {/* Search Bar - Desktop */}
                <div style={{
                    flex: 1,
                    maxWidth: '500px',
                    display: 'none'
                }} className="md-show">
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        transform: searchFocused ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.2s'
                    }}>
                        <Search style={{
                            position: 'absolute',
                            left: 'var(--space-4)',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            color: 'var(--color-gray-400)'
                        }} />
                        <input
                            type="text"
                            placeholder="Tìm kiếm phụ tùng, tên xe..."
                            className="input"
                            style={{
                                paddingLeft: 'var(--space-12)',
                                paddingRight: 'var(--space-4)',
                                background: 'var(--color-gray-900)',
                                border: '1px solid var(--color-gray-800)',
                                borderRadius: 'var(--radius-lg)'
                            }}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                    </div>
                </div>

                {/* Right Icons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                    {/* Search Icon - Mobile */}
                    <button style={{
                        display: 'block',
                        padding: 'var(--space-2)',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: 'var(--radius-lg)',
                        cursor: 'pointer',
                        transition: 'background 0.2s'
                    }} className="md-hide">
                        <Search size={20} color="var(--color-gray-400)" />
                    </button>

                    {/* Account */}
                    <div style={{ position: 'relative' }} ref={accountMenuRef}>
                        <button
                            onClick={() => setShowAccountMenu(!showAccountMenu)}
                            style={{
                                padding: 'var(--space-2)',
                                background: 'transparent',
                                border: 'none',
                                borderRadius: 'var(--radius-lg)',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            <User size={20} color="var(--color-gray-400)" />
                        </button>

                        <AnimatePresence>
                            {showAccountMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    style={{
                                        position: 'absolute',
                                        right: 0,
                                        top: '100%',
                                        marginTop: 'var(--space-2)',
                                        width: '200px',
                                        background: 'var(--color-gray-900)',
                                        border: '1px solid var(--color-gray-800)',
                                        borderRadius: 'var(--radius-lg)',
                                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <button style={{
                                        width: '100%',
                                        padding: 'var(--space-3) var(--space-4)',
                                        textAlign: 'left',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        fontSize: 'var(--font-size-sm)'
                                    }}>
                                        Đăng nhập
                                    </button>
                                    <button style={{
                                        width: '100%',
                                        padding: 'var(--space-3) var(--space-4)',
                                        textAlign: 'left',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        fontSize: 'var(--font-size-sm)'
                                    }}>
                                        Đăng ký
                                    </button>
                                    <div style={{ borderTop: '1px solid var(--color-gray-800)' }} />
                                    <button style={{
                                        width: '100%',
                                        padding: 'var(--space-3) var(--space-4)',
                                        textAlign: 'left',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--color-gray-400)',
                                        cursor: 'pointer',
                                        transition: 'background 0.2s',
                                        fontSize: 'var(--font-size-sm)'
                                    }}>
                                        Đơn hàng
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cart */}
                    <button
                        style={{
                            position: 'relative',
                            padding: 'var(--space-2)',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: 'var(--radius-lg)',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <ShoppingCart size={20} color="var(--color-gray-400)" style={{ transition: 'color 0.2s' }} />
                        {totalItems > 0 && (
                            <motion.span
                                key={totalItems}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                    position: 'absolute',
                                    top: '-4px',
                                    right: '-4px',
                                    background: 'var(--color-primary)',
                                    color: 'white',
                                    fontSize: '12px',
                                    fontWeight: 700,
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: 'var(--radius-full)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: '0 4px 15px rgba(220, 38, 38, 0.5)'
                                }}
                            >
                                {totalItems}
                            </motion.span>
                        )}
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{
                            display: 'block',
                            padding: 'var(--space-2)',
                            background: 'transparent',
                            border: 'none',
                            borderRadius: 'var(--radius-lg)',
                            cursor: 'pointer'
                        }}
                        className="md-hide"
                    >
                        {isMenuOpen ? <X size={22} color="var(--color-gray-400)" /> : <Menu size={22} color="var(--color-gray-400)" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            background: 'var(--color-gray-900)',
                            borderTop: '1px solid var(--color-gray-800)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 'var(--space-4)'
                        }}>
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
                                        color: 'white',
                                        textDecoration: 'none',
                                        fontWeight: 600,
                                        padding: 'var(--space-3) var(--space-4)',
                                        borderRadius: 'var(--radius-lg)',
                                        background: 'var(--color-gray-800)',
                                        marginBottom: 'var(--space-2)'
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </motion.header>
    )
}
