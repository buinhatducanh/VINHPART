import { NextResponse } from 'next/server'
import { clearAuthCookie } from '@/lib/auth'

export async function POST() {
    try {
        await clearAuthCookie()
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { error: 'Đã xảy ra lỗi khi đăng xuất' },
            { status: 500 }
        )
    }
}
