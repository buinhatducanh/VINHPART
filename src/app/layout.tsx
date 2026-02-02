import type { Metadata } from 'next'
import './globals.css'
import { Header, Footer } from '@/components/layout'
import { Toaster } from '@/shared/ui'

export const metadata: Metadata = {
  title: 'AutoParts - Phụ Tùng Ô Tô Chính Hãng',
  description: 'Chuyên cung cấp phụ tùng ô tô chính hãng với giá cạnh tranh nhất. Cam kết chất lượng và dịch vụ tốt nhất.',
  keywords: 'phụ tùng ô tô, auto parts, phụ tùng chính hãng, linh kiện ô tô',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>
        <Header />
        <main style={{ minHeight: '100vh' }}>
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
