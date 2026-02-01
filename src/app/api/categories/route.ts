import { NextResponse } from 'next/server'
import { prisma } from '@/config'

export async function GET() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        })

        return NextResponse.json({
            success: true,
            data: categories
        })
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch categories'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const category = await prisma.category.create({
            data: {
                name: body.name,
                slug: body.slug,
                image: body.image
            }
        })

        return NextResponse.json({
            success: true,
            data: category
        })
    } catch (error) {
        console.error('Error creating category:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to create category'
        }, { status: 500 })
    }
}
