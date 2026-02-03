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
                background: 'linear-gradient(135deg, var(--color-black) 0%, #1a1a1a 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Shimmer effect */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                    animation: 'shimmer 2s infinite'
                }} />
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
                </a>
            ))}
        </div>
    )
}
