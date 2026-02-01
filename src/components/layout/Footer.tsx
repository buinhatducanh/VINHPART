import Link from 'next/link'
import { Phone, Mail, MapPin, Settings } from 'lucide-react'

export default function Footer() {
    return (
        <footer style={{
            background: 'linear-gradient(180deg, #0f172a, #1e293b)',
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
                            <h3 style={{
                                fontSize: 'var(--font-size-2xl)',
                                fontWeight: 800
                            }}>
                                <span style={{ color: '#f97316' }}>VINH</span>
                                <span>PART</span>
                            </h3>
                        </div>
                        <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>
                            Chuyên cung cấp phụ tùng ô tô chính hãng với giá cạnh tranh nhất.
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
                            Liên kết nhanh
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <Link href="/#products" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                                Sản phẩm
                            </Link>
                            <Link href="/#about" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                                Về chúng tôi
                            </Link>
                            <Link href="/#contact" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                                Liên hệ
                            </Link>
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
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: '#94a3b8' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(249, 115, 22, 0.15)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Phone size={18} color="#f97316" />
                                </div>
                                <span>0123 456 789</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: '#94a3b8' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(249, 115, 22, 0.15)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Mail size={18} color="#f97316" />
                                </div>
                                <span>contact@autoparts.vn</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', color: '#94a3b8' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    background: 'rgba(249, 115, 22, 0.15)',
                                    borderRadius: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <MapPin size={18} color="#f97316" />
                                </div>
                                <span>123 Đường ABC, Quận 1, TP.HCM</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright & Admin Link */}
                <div style={{
                    borderTop: '1px solid rgba(148, 163, 184, 0.2)',
                    paddingTop: 'var(--space-6)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 'var(--space-4)'
                }}>
                    <p style={{ color: '#64748b', fontSize: 'var(--font-size-sm)' }}>
                        © 2026 VinhPart. Tất cả quyền được bảo lưu.
                    </p>
                    <Link
                        href="/admin/login"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            color: '#64748b',
                            textDecoration: 'none',
                            fontSize: 'var(--font-size-sm)',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            background: 'rgba(100, 116, 139, 0.1)',
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
