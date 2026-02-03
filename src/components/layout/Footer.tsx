import Link from 'next/link'
import { Phone, Mail, MapPin, Settings } from 'lucide-react'

export default function Footer() {
    return (
        <footer style={{
            background: 'var(--color-black)',
            borderTop: '1px solid var(--color-gray-800)',
            color: 'var(--color-white)',
            padding: 'var(--space-16) 0 var(--space-8)'
        }}>
            <div className="container">
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 'var(--space-10)',
                    marginBottom: 'var(--space-10)'
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)',
                            marginBottom: 'var(--space-4)'
                        }}>
                            <div style={{
                                width: '45px',
                                height: '45px',
                                background: 'linear-gradient(135deg, var(--color-primary), #b91c1c)',
                                borderRadius: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 900,
                                fontSize: '18px',
                                boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
                            }}>
                                VP
                            </div>
                            <h3 style={{
                                fontSize: 'var(--font-size-2xl)',
                                fontWeight: 800
                            }}>
                                <span style={{ color: 'var(--color-primary)' }}>VINH</span>
                                <span>PART</span>
                            </h3>
                        </div>
                        <p style={{ color: 'var(--color-gray-400)', lineHeight: 1.8 }}>
                            Chuyên cung cấp phụ tùng ô tô, xe máy chính hãng với giá cạnh tranh nhất.
                            Cam kết chất lượng và dịch vụ tốt nhất.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: 700,
                            marginBottom: 'var(--space-4)',
                            color: 'white'
                        }}>
                            Về chúng tôi
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <Link href="/#about" style={{ color: 'var(--color-gray-400)', textDecoration: 'none', transition: 'color 0.2s' }}>
                                Giới thiệu
                            </Link>
                            <Link href="/#contact" style={{ color: 'var(--color-gray-400)', textDecoration: 'none', transition: 'color 0.2s' }}>
                                Liên hệ
                            </Link>
                            <Link href="/#products" style={{ color: 'var(--color-gray-400)', textDecoration: 'none', transition: 'color 0.2s' }}>
                                Sản phẩm
                            </Link>
                        </div>
                    </div>

                    {/* Policies */}
                    <div>
                        <h4 style={{
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: 700,
                            marginBottom: 'var(--space-4)',
                            color: 'white'
                        }}>
                            Chính sách
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <span style={{ color: 'var(--color-gray-400)' }}>Chính sách bảo hành</span>
                            <span style={{ color: 'var(--color-gray-400)' }}>Chính sách đổi trả</span>
                            <span style={{ color: 'var(--color-gray-400)' }}>Chính sách vận chuyển</span>
                        </div>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{
                            fontSize: 'var(--font-size-lg)',
                            fontWeight: 700,
                            marginBottom: 'var(--space-4)',
                            color: 'white'
                        }}>
                            Liên hệ
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-gray-400)' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(220, 38, 38, 0.15)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Phone size={18} color="var(--color-primary)" />
                                </div>
                                <span>Hotline: 1900 xxxx</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'var(--color-gray-400)' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(220, 38, 38, 0.15)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Mail size={18} color="var(--color-primary)" />
                                </div>
                                <span>support@vinhpart.vn</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', color: 'var(--color-gray-400)' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(220, 38, 38, 0.15)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <MapPin size={18} color="var(--color-primary)" />
                                </div>
                                <span>Giờ làm việc: 8:00 - 22:00</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright & Admin Link */}
                <div style={{
                    borderTop: '1px solid var(--color-gray-800)',
                    paddingTop: 'var(--space-6)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'var(--space-4)'
                }}>
                    <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--font-size-sm)' }}>
                        © 2026 VinhPart. All rights reserved.
                    </p>
                    <Link
                        href="/admin/login"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            color: 'var(--color-gray-500)',
                            textDecoration: 'none',
                            fontSize: 'var(--font-size-sm)',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            background: 'var(--color-gray-800)',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        <Settings size={16} />
                        Quản trị viên
                    </Link>
                </div>
            </div>
        </footer>
    )
}
