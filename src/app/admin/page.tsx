import { redirect } from 'next/navigation'
import { getCurrentUser, isAdmin } from '@/lib/auth'
import Link from 'next/link'
import { AdminLogoutButton } from './components/LogoutButton'

export default async function AdminDashboard() {
    const user = await getCurrentUser()

    if (!user || !isAdmin(user)) {
        redirect('/admin/login')
    }

    const stats = [
        { label: 'Sản phẩm', value: '8', icon: '📦', color: 'from-blue-500 to-cyan-500', href: '/admin/products' },
        { label: 'Đơn hàng', value: '0', icon: '🛒', color: 'from-purple-500 to-pink-500', href: '/admin/orders' },
        { label: 'Danh mục', value: '5', icon: '📁', color: 'from-orange-500 to-yellow-500', href: '/admin/categories' },
        { label: 'Banner', value: '3', icon: '🖼️', color: 'from-green-500 to-emerald-500', href: '/admin/banners' },
    ]

    const quickActions = [
        { label: 'Thêm sản phẩm mới', icon: '➕', href: '/admin/products/new' },
        { label: 'Xem đơn hàng mới', icon: '📋', href: '/admin/orders' },
        { label: 'Cập nhật banner', icon: '🎨', href: '/admin/banners' },
        { label: 'Xem trang chủ', icon: '🏠', href: '/', external: true },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Header */}
            <header className="bg-white/5 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">VinhPart Admin</h1>
                                <p className="text-sm text-slate-400">Quản lý cửa hàng</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium text-white">{user.email}</p>
                                <p className="text-xs text-slate-400">Quản trị viên</p>
                            </div>
                            <AdminLogoutButton />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Message */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Xin chào! 👋</h2>
                    <p className="text-slate-400">Đây là tổng quan về cửa hàng của bạn.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                            <div className="relative">
                                <div className="text-3xl mb-2">{stat.icon}</div>
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-slate-400">{stat.label}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Thao tác nhanh</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                target={action.external ? '_blank' : undefined}
                                className="flex items-center gap-3 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
                            >
                                <span className="text-2xl">{action.icon}</span>
                                <span className="text-white font-medium">{action.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
