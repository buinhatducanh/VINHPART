import { NextResponse } from 'next/server'
import { prisma } from '@/config'

export async function GET() {
    try {
        const banners = await prisma.banner.findMany({
            where: { active: true },
            orderBy: { order: 'asc' }
        })

        return NextResponse.json({
            success: true,
            data: banners
        })
    } catch (error) {
        console.error('Error fetching banners:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch banners'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const banner = await prisma.banner.create({
            data: {
                imageUrl: body.imageUrl,
                title: body.title,
                link: body.link,
                order: body.order || 0,
                active: body.active ?? true
            }
        })

        return NextResponse.json({
            success: true,
            data: banner
        })
    } catch (error) {
        console.error('Error creating banner:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to create banner'
        }, { status: 500 })
    }
}
