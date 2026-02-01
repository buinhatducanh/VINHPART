'use client'

import { useRouter } from 'next/navigation'

export function AdminLogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            router.push('/admin/login')
            router.refresh()
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    return (
        <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-colors"
        >
            Đăng xuất
        </button>
    )
}
