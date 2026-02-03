'use client'

import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import { ShoppingCart, Shield, Zap, Truck, RefreshCw, Star } from 'lucide-react'
import { BannerSlider, ProductCard, CartDrawer, OrderForm, CategoryFilter } from '@/components/shop'
import { useCartStore } from '@/store/cart-store'
import { toast } from 'sonner'
import type { Product, Category, Banner } from '@/types'

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [banners, setBanners] = useState<Banner[]>([])
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>('all')
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { addItem, totalItems } = useCartStore()

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)

      try {
        const [prodRes, catRes, banRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/banners')
        ])

        const prodData = await prodRes.json()
        const catData = await catRes.json()
        const banData = await banRes.json()

        if (prodData.success) setProducts(prodData.data)
        if (catData.success) setCategories(catData.data)
        if (banData.success) setBanners(banData.data)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Đã có lỗi xảy ra khi tải dữ liệu.')
        toast.error('Đã có lỗi xảy ra khi tải dữ liệu')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredProducts = selectedCategoryId === 'all'
    ? products
    : products.filter(p => p.categoryId === selectedCategoryId)

  const handleAddToCart = (product: Product) => {
    addItem(product)
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`)
  }

  const benefits = [
    { icon: Shield, title: 'Chính hãng 100%', desc: 'Bảo hành đầy đủ, nguồn gốc rõ ràng' },
    { icon: Zap, title: 'Phù hợp từng loại xe', desc: 'Tư vấn chính xác theo hãng & model' },
    { icon: Truck, title: 'Giao hàng nhanh', desc: 'Miễn phí vận chuyển đơn > 500k' },
    { icon: RefreshCw, title: 'Đổi trả dễ dàng', desc: '30 ngày đổi trả không điều kiện' }
  ]

  const reviews = [
    {
      name: 'Nguyễn Văn A',
      vehicle: 'Honda Winner X',
      rating: 5,
      comment: 'Phụ tùng chất lượng cao, giao hàng nhanh. Xe chạy êm hơn hẳn sau khi thay!'
    },
    {
      name: 'Trần Thị B',
      vehicle: 'Toyota Camry',
      rating: 5,
      comment: 'Tư vấn nhiệt tình, chính xác. Giá cả hợp lý, sẽ quay lại ủng hộ!'
    },
    {
      name: 'Lê Văn C',
      vehicle: 'Yamaha Exciter 155',
      rating: 5,
      comment: 'Đóng gói cẩn thận, sản phẩm chính hãng. Rất hài lòng với dịch vụ!'
    }
  ]

  return (
    <>
      {/* Hero Section with BannerSlider */}
      <section style={{
        background: 'var(--color-black)',
        color: 'var(--color-white)',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px'
      }}>
        <BannerSlider banners={banners} />

        {/* Hero Content Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 10,
          pointerEvents: 'none'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ textAlign: 'center', pointerEvents: 'auto' }}
          >
            <h1 style={{
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 800,
              marginBottom: 'var(--space-4)',
              background: 'linear-gradient(to right, white, #e5e5e5, var(--color-primary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Nâng Cấp Hiệu Suất Xe
            </h1>
            <h2 style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontWeight: 800,
              color: 'var(--color-primary)',
              marginBottom: 'var(--space-6)'
            }}>
              Phụ Tùng Chính Hãng
            </h2>
            <p style={{
              fontSize: 'var(--font-size-lg)',
              color: 'var(--color-gray-300)',
              marginBottom: 'var(--space-8)',
              maxWidth: '600px',
              margin: '0 auto var(--space-8)'
            }}>
              Chất lượng cao cấp, hiệu suất vượt trội, phù hợp mọi loại xe
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="#products"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                style={{ padding: 'var(--space-4) var(--space-8)', fontSize: 'var(--font-size-base)' }}
              >
                Mua ngay
              </motion.a>
              <motion.a
                href="#about"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline"
                style={{ padding: 'var(--space-4) var(--space-8)', fontSize: 'var(--font-size-base)' }}
              >
                Xem danh mục
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: 'var(--space-8)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            style={{
              width: '24px',
              height: '40px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              padding: 'var(--space-2)'
            }}
          >
            <div style={{
              width: '4px',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: 'var(--radius-full)'
            }} />
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section style={{
        padding: 'var(--space-20) 0',
        background: 'linear-gradient(to bottom, var(--color-black), var(--color-gray-900))'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-8)'
            }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                style={{
                  background: 'var(--color-gray-900)',
                  border: '1px solid var(--color-gray-800)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(to bottom right, var(--color-primary), #b91c1c)',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4)',
                  boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
                }}>
                  <benefit.icon size={28} color="white" />
                </div>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'white', marginBottom: 'var(--space-2)' }}>
                  {benefit.title}
                </h3>
                <p style={{ color: 'var(--color-gray-400)', fontSize: 'var(--font-size-sm)' }}>
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="section" style={{ background: 'var(--color-gray-900)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
          >
            <h2 style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 800,
              color: 'white',
              marginBottom: 'var(--space-4)'
            }}>
              Sản phẩm <span style={{ color: 'var(--color-primary)' }}>nổi bật</span>
            </h2>
            <p style={{ color: 'var(--color-gray-400)' }}>
              Được tin dùng bởi hàng nghìn khách hàng
            </p>
          </motion.div>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedId={selectedCategoryId}
            onSelect={setSelectedCategoryId}
          />

          {/* Products Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-20)' }}>
              <div className="spinner" style={{ marginBottom: 'var(--space-4)' }} />
              <p style={{ color: 'var(--color-gray-400)' }}>Đang tải sản phẩm...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-20)', color: 'var(--color-primary)' }}>
              <p>{error}</p>
              <button
                className="btn btn-primary"
                style={{ marginTop: 'var(--space-4)' }}
                onClick={() => window.location.reload()}
              >
                Thử lại
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-20)', color: 'var(--color-gray-500)' }}>
              <p>Không có sản phẩm nào trong danh mục này.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 'var(--space-6)'
            }}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Customer Reviews */}
      <section style={{ padding: 'var(--space-20) 0', background: 'var(--color-black)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
          >
            <h2 style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 800,
              color: 'white',
              marginBottom: 'var(--space-4)'
            }}>
              Đánh giá từ <span style={{ color: 'var(--color-primary)' }}>khách hàng</span>
            </h2>
            <p style={{ color: 'var(--color-gray-400)' }}>
              Trải nghiệm thực tế từ người dùng
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-8)'
          }}>
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                style={{
                  background: 'var(--color-gray-900)',
                  border: '1px solid var(--color-gray-800)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-6)',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ display: 'flex', gap: '4px', marginBottom: 'var(--space-4)' }}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="#facc15" color="#facc15" />
                  ))}
                </div>
                <p style={{
                  color: 'var(--color-gray-300)',
                  marginBottom: 'var(--space-4)',
                  fontStyle: 'italic'
                }}>
                  "{review.comment}"
                </p>
                <div style={{ borderTop: '1px solid var(--color-gray-800)', paddingTop: 'var(--space-4)' }}>
                  <p style={{ color: 'white', fontWeight: 700 }}>{review.name}</p>
                  <p style={{ color: 'var(--color-gray-400)', fontSize: 'var(--font-size-sm)' }}>{review.vehicle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" style={{
        padding: 'var(--space-20) 0',
        background: 'linear-gradient(to right, var(--color-primary), #b91c1c)'
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 800,
              color: 'white',
              marginBottom: 'var(--space-4)'
            }}>
              Sẵn sàng nâng cấp xe của bạn?
            </h2>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: 'var(--space-8)',
              maxWidth: '600px',
              margin: '0 auto var(--space-8)'
            }}>
              Khám phá hàng nghìn sản phẩm chính hãng với giá tốt nhất
            </p>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-4) var(--space-10)',
                background: 'white',
                color: 'var(--color-primary)',
                fontWeight: 700,
                borderRadius: 'var(--radius-lg)',
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
              }}
            >
              Khám phá ngay
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ background: 'var(--color-gray-900)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}
          >
            <h2 style={{
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 800,
              color: 'white',
              marginBottom: 'var(--space-4)'
            }}>
              Liên hệ <span style={{ color: 'var(--color-primary)' }}>đặt hàng</span>
            </h2>
          </motion.div>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <OrderForm />
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <motion.button
        onClick={() => setIsCartOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="animate-glow"
        style={{
          position: 'fixed',
          bottom: 'var(--space-6)',
          right: 'var(--space-6)',
          width: '60px',
          height: '60px',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, var(--color-primary), #b91c1c)',
          color: 'var(--color-white)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 40px rgba(220, 38, 38, 0.5)',
          zIndex: 90,
          cursor: 'pointer'
        }}
      >
        <ShoppingCart size={24} />
        {totalItems() > 0 && (
          <motion.span
            key={totalItems()}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              width: '24px',
              height: '24px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-black)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {totalItems()}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
