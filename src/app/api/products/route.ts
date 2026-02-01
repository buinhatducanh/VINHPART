import { NextResponse } from 'next/server'
import { prisma } from '@/config'

export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            },
            orderBy: [
                { featured: 'desc' },
                { createdAt: 'desc' }
            ]
        })

        return NextResponse.json({
            success: true,
            data: products
        })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch products'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const product = await prisma.product.create({
            data: {
                name: body.name,
                slug: body.slug,
                description: body.description,
                price: body.price,
                priceNote: body.priceNote,
                images: body.images || [],
                stock: body.stock || 0,
                featured: body.featured || false,
                categoryId: body.categoryId
            },
            include: {
                category: true
            }
        })

        return NextResponse.json({
            success: true,
            data: product
        })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to create product'
        }, { status: 500 })
    }
}
