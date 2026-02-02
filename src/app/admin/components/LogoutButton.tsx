'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function AdminLogoutButton() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' })
            toast.success('Đã đăng xuất thành công')
            router.push('/admin/login')
            router.refresh()
        } catch (error) {
            console.error('Logout error:', error)
            toast.error('Có lỗi xảy ra khi đăng xuất')
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

