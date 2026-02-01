'use client'

import { useState, useEffect } from 'react'
import type { Banner } from '@/types'

interface BannerSliderProps {
    banners: Banner[]
}

export default function BannerSlider({ banners }: BannerSliderProps) {
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (banners.length <= 1) return

        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % banners.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [banners.length])

    if (banners.length === 0) {
        return (
            <div style={{
                height: '60vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, var(--color-black) 0%, #1a1a1a 100%)'
            }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h1 style={{
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                        fontWeight: 800,
                        marginBottom: 'var(--space-6)'
                    }}>
                        Phụ Tùng <span style={{ color: 'var(--color-primary)' }}>Ô Tô</span><br />
                        Chính Hãng
                    </h1>
                    <p style={{
                        color: 'var(--color-gray-400)',
                        maxWidth: '500px',
                        margin: '0 auto',
                        fontSize: 'var(--font-size-lg)'
                    }}>
                        Đảm bảo chất lượng từ nhà sản xuất. Giá cạnh tranh nhất thị trường.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            height: '60vh',
            overflow: 'hidden'
        }}>
            {banners.map((banner, i) => (
                <a
                    key={banner.id}
                    href={banner.link || '#'}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: current === i ? 1 : 0,
                        transition: 'opacity 1s ease',
                        display: 'block',
                        cursor: banner.link ? 'pointer' : 'default'
                    }}
                >
                    <img
                        src={banner.imageUrl}
                        alt={banner.title || 'Banner'}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            backgroundColor: 'var(--color-black)'
                        }}
                    />
                    {banner.title && (
                        <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            padding: 'var(--space-8)',
                            background: 'linear-gradient(transparent, rgba(0,0,0,0.8))'
                        }}>
                            <div className="container">
                                <h2 style={{
                                    fontSize: 'var(--font-size-2xl)',
                                    fontWeight: 700,
                                    color: 'var(--color-white)'
                                }}>
                                    {banner.title}
                                </h2>
                            </div>
                        </div>
                    )}
                </a>
            ))}

            {/* Indicators */}
            {banners.length > 1 && (
                <div style={{
                    position: 'absolute',
                    bottom: 'var(--space-6)',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 'var(--space-2)',
                    zIndex: 10
                }}>
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                border: 'none',
                                backgroundColor: current === i ? 'var(--color-primary)' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s'
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
