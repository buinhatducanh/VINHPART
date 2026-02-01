import { NextResponse } from 'next/server'
import { prisma } from '@/config'
import { verifyPassword, generateToken, setAuthCookie } from '@/lib/auth'

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email và mật khẩu là bắt buộc' },
                { status: 400 }
            )
        }

        // Find user by email
        const user = await prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            return NextResponse.json(
                { error: 'Email hoặc mật khẩu không đúng' },
                { status: 401 }
            )
        }

        // Verify password
        const isValid = await verifyPassword(password, user.password)
        if (!isValid) {
            return NextResponse.json(
                { error: 'Email hoặc mật khẩu không đúng' },
                { status: 401 }
            )
        }

        // Check if user is admin
        if (user.role !== 'ADMIN') {
            return NextResponse.json(
                { error: 'Bạn không có quyền truy cập trang quản trị' },
                { status: 403 }
            )
        }

        // Generate JWT token
        const token = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        })

        // Set auth cookie
        await setAuthCookie(token)

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Đã xảy ra lỗi khi đăng nhập' },
            { status: 500 }
        )
    }
}
