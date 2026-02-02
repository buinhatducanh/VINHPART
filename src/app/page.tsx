'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, CheckCircle, Shield, Truck, Headphones } from 'lucide-react'
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

  const features = [
    { icon: Shield, title: 'Chính hãng 100%', desc: 'Cam kết tất cả sản phẩm đều là hàng chính hãng' },
    { icon: CheckCircle, title: 'Giá tốt nhất', desc: 'Cam kết giá cạnh tranh nhất thị trường' },
    { icon: Truck, title: 'Giao hàng nhanh', desc: 'Giao hàng nhanh chóng toàn quốc' },
    { icon: Headphones, title: 'Hỗ trợ 24/7', desc: 'Tư vấn miễn phí mọi lúc mọi nơi' }
  ]

  return (
    <>
      {/* Hero Section with BannerSlider */}
      <section style={{
        background: 'var(--color-black)',
        color: 'var(--color-white)',
        minHeight: '60vh',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <BannerSlider banners={banners} />
      </section>

      {/* Products Section */}
      <section id="products" className="section" style={{ background: 'var(--color-gray-100)' }}>
        <div className="container">
          <h2 className="section-title">
            Sản phẩm <span>nổi bật</span>
          </h2>

          {/* Category Filter */}
          <CategoryFilter
            categories={categories}
            selectedId={selectedCategoryId}
            onSelect={setSelectedCategoryId}
          />

          {/* Products Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-20)' }}>
              <div className="spinner" style={{ marginBottom: 'var(--space-4)' }}></div>
              <p>Đang tải sản phẩm...</p>
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
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={() => handleAddToCart(product)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">
            Tại sao chọn <span>AutoParts</span>?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-8)'
          }}>
            {features.map((item, i) => (
              <div key={i} className="card" style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-full)',
                  background: 'linear-gradient(135deg, var(--color-primary), #ef4444)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto var(--space-4)'
                }}>
                  <item.icon size={28} color="white" />
                </div>
                <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 700, marginBottom: 'var(--space-3)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--color-gray-500)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section" style={{ background: 'var(--color-gray-100)' }}>
        <div className="container">
          <h2 className="section-title">
            Liên hệ <span>đặt hàng</span>
          </h2>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <OrderForm />
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        style={{
          position: 'fixed',
          bottom: 'var(--space-6)',
          right: 'var(--space-6)',
          width: '60px',
          height: '60px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-white)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-xl)',
          zIndex: 90,
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
      >
        <ShoppingCart size={24} />
        {totalItems() > 0 && (
          <span style={{
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
          }}>
            {totalItems()}
          </span>
        )}
      </button>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}

