'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { useCartStore } from '@/store/cart-store'
import { formatPrice } from '@/lib/utils'
import { CheckCircle, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

export default function OrderForm() {
    const { items, totalPrice, clearCart } = useCartStore()
    const total = totalPrice()

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        note: ''
    })
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (items.length === 0) {
            setError('Giỏ hàng trống. Vui lòng thêm sản phẩm.')
            toast.warning('Giỏ hàng trống. Vui lòng thêm sản phẩm.')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    address: formData.address,
                    note: formData.note,
                    items: items.map(item => ({
                        productId: item.id,
                        productName: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    total
                })
            })

            const data = await res.json()

            if (data.success) {
                setSubmitted(true)
                clearCart()
                toast.success('Đặt hàng thành công! Chúng tôi sẽ liên hệ sớm nhất.')
            } else {
                setError(data.error || 'Có lỗi xảy ra. Vui lòng thử lại.')
                toast.error(data.error || 'Có lỗi xảy ra. Vui lòng thử lại.')
            }
        } catch (err) {
            console.error(err)
            setError('Không thể kết nối máy chủ. Vui lòng thử lại.')
            toast.error('Không thể kết nối máy chủ. Vui lòng thử lại.')
        } finally {
            setLoading(false)
        }
    }

    if (submitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card"
                style={{
                    padding: 'var(--space-12)',
                    textAlign: 'center'
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                >
                    <CheckCircle
                        size={64}
                        style={{
                            color: '#22c55e',
                            margin: '0 auto var(--space-6)'
                        }}
                    />
                </motion.div>
                <h3 style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 700,
                    marginBottom: 'var(--space-4)',
                    color: 'white'
                }}>
                    Đặt hàng thành công!
                </h3>
                <p style={{ color: 'var(--color-gray-400)', marginBottom: 'var(--space-6)' }}>
                    Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ sớm nhất có thể.
                </p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setSubmitted(false)
                        setFormData({ name: '', phone: '', address: '', note: '' })
                    }}
                    className="btn btn-primary"
                >
                    Đặt hàng mới
                </motion.button>
            </motion.div>
        )
    }

    return (
        <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="card"
            style={{ padding: 'var(--space-6)' }}
        >
            <h3 style={{
                fontSize: 'var(--font-size-xl)',
                fontWeight: 700,
                marginBottom: 'var(--space-6)',
                color: 'white'
            }}>
                Thông tin giao hàng
            </h3>

            {/* Cart Summary */}
            {items.length > 0 && (
                <div style={{
                    background: 'var(--color-gray-800)',
                    borderRadius: 'var(--radius-md)',
                    padding: 'var(--space-4)',
                    marginBottom: 'var(--space-6)',
                    border: '1px solid var(--color-gray-700)'
                }}>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-400)', marginBottom: 'var(--space-2)' }}>
                        {items.length} sản phẩm trong giỏ hàng
                    </p>
                    <p className="price">{formatPrice(total)}</p>
                </div>
            )}

            {error && (
                <div style={{
                    background: 'rgba(220, 38, 38, 0.1)',
                    border: '1px solid rgba(220, 38, 38, 0.3)',
                    color: '#ef4444',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-4)',
                    fontSize: 'var(--font-size-sm)'
                }}>
                    {error}
                </div>
            )}

            <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 600,
                        marginBottom: 'var(--space-2)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-gray-300)'
                    }}>
                        Họ và tên *
                    </label>
                    <input
                        className="input"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 600,
                        marginBottom: 'var(--space-2)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-gray-300)'
                    }}>
                        Số điện thoại *
                    </label>
                    <input
                        className="input"
                        type="tel"
                        placeholder="0123 456 789"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 600,
                        marginBottom: 'var(--space-2)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-gray-300)'
                    }}>
                        Địa chỉ giao hàng *
                    </label>
                    <input
                        className="input"
                        type="text"
                        placeholder="123 Đường ABC, Quận 1, TP.HCM"
                        value={formData.address}
                        onChange={e => setFormData({ ...formData, address: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label style={{
                        display: 'block',
                        fontWeight: 600,
                        marginBottom: 'var(--space-2)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-gray-300)'
                    }}>
                        Ghi chú
                    </label>
                    <textarea
                        className="input"
                        placeholder="Ghi chú thêm về đơn hàng..."
                        value={formData.note}
                        onChange={e => setFormData({ ...formData, note: e.target.value })}
                        rows={3}
                        style={{ resize: 'vertical' }}
                    />
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn btn-primary"
                    disabled={loading || items.length === 0}
                    style={{
                        padding: 'var(--space-4)',
                        marginTop: 'var(--space-2)',
                        opacity: loading || items.length === 0 ? 0.7 : 1
                    }}
                >
                    {loading ? (
                        <>
                            <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                            Đang gửi...
                        </>
                    ) : (
                        'ĐẶT HÀNG NGAY'
                    )}
                </motion.button>
            </div>
        </motion.form>
    )
}
