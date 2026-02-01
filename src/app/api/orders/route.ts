import { NextResponse } from 'next/server'
import { prisma } from '@/config'
import { generateOrderNumber } from '@/shared/utils'

export async function GET() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({
            success: true,
            data: orders
        })
    } catch (error) {
        console.error('Error fetching orders:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to fetch orders'
        }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json()

        // Validate required fields
        if (!body.name || !body.phone || !body.address) {
            return NextResponse.json({
                success: false,
                error: 'Vui lòng điền đầy đủ thông tin'
            }, { status: 400 })
        }

        if (!body.items || body.items.length === 0) {
            return NextResponse.json({
                success: false,
                error: 'Giỏ hàng trống'
            }, { status: 400 })
        }

        const order = await prisma.order.create({
            data: {
                orderNumber: generateOrderNumber(),
                name: body.name,
                phone: body.phone,
                address: body.address,
                note: body.note,
                total: body.total,
                items: {
                    create: body.items.map((item: { productId: number; quantity: number; price: number }) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        return NextResponse.json({
            success: true,
            data: order
        })
    } catch (error) {
        console.error('Error creating order:', error)
        return NextResponse.json({
            success: false,
            error: 'Failed to create order'
        }, { status: 500 })
    }
}
