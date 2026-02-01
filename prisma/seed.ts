import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import 'dotenv/config'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
    console.log('🌱 Seeding database...')

    // Clear existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()
    await prisma.banner.deleteMany()
    await prisma.user.deleteMany()

    // Create categories
    const categories = await Promise.all([
        prisma.category.create({
            data: { name: 'Động cơ', slug: 'dong-co' }
        }),
        prisma.category.create({
            data: { name: 'Hệ thống phanh', slug: 'he-thong-phanh' }
        }),
        prisma.category.create({
            data: { name: 'Hệ thống điện', slug: 'he-thong-dien' }
        }),
        prisma.category.create({
            data: { name: 'Lọc & Dầu', slug: 'loc-dau' }
        }),
        prisma.category.create({
            data: { name: 'Phụ tùng khác', slug: 'phu-tung-khac' }
        })
    ])

    console.log(`✅ Created ${categories.length} categories`)

    // Create products
    const products = await Promise.all([
        // Động cơ
        prisma.product.create({
            data: {
                name: 'Bộ lọc gió động cơ Toyota',
                slug: 'bo-loc-gio-dong-co-toyota',
                description: 'Bộ lọc gió chính hãng Toyota, phù hợp nhiều dòng xe',
                price: 350000,
                images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400'],
                stock: 50,
                featured: true,
                categoryId: categories[0].id
            }
        }),
        prisma.product.create({
            data: {
                name: 'Bugi NGK Iridium',
                slug: 'bugi-ngk-iridium',
                description: 'Bugi cao cấp NGK Iridium, tuổi thọ cao, khởi động dễ dàng',
                price: 180000,
                images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
                stock: 100,
                featured: true,
                categoryId: categories[0].id
            }
        }),
        // Phanh
        prisma.product.create({
            data: {
                name: 'Má phanh trước Honda Civic',
                slug: 'ma-phanh-truoc-honda-civic',
                description: 'Bộ má phanh trước chính hãng cho Honda Civic 2018-2024',
                price: 850000,
                images: ['https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'],
                stock: 30,
                featured: true,
                categoryId: categories[1].id
            }
        }),
        prisma.product.create({
            data: {
                name: 'Đĩa phanh sau Toyota Camry',
                slug: 'dia-phanh-sau-toyota-camry',
                description: 'Đĩa phanh sau OEM Toyota Camry, chất lượng cao',
                price: 1200000,
                images: ['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400'],
                stock: 20,
                categoryId: categories[1].id
            }
        }),
        // Điện
        prisma.product.create({
            data: {
                name: 'Ắc quy GS 12V 45Ah',
                slug: 'ac-quy-gs-12v-45ah',
                description: 'Ắc quy GS chính hãng, phù hợp xe sedan 4 chỗ',
                price: 1500000,
                images: ['https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=400'],
                stock: 25,
                featured: true,
                categoryId: categories[2].id
            }
        }),
        prisma.product.create({
            data: {
                name: 'Bóng đèn LED H4 Philips',
                slug: 'bong-den-led-h4-philips',
                description: 'Bóng đèn LED H4 Philips siêu sáng, tiết kiệm điện',
                price: 450000,
                images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400'],
                stock: 60,
                categoryId: categories[2].id
            }
        }),
        // Lọc & Dầu
        prisma.product.create({
            data: {
                name: 'Dầu nhớt Castrol 5W-30 4L',
                slug: 'dau-nhot-castrol-5w30-4l',
                description: 'Dầu nhớt tổng hợp Castrol EDGE 5W-30, 4 lít',
                price: 890000,
                images: ['https://images.unsplash.com/photo-1635769173056-aa9f6d98a32c?w=400'],
                stock: 40,
                featured: true,
                categoryId: categories[3].id
            }
        }),
        prisma.product.create({
            data: {
                name: 'Lọc dầu Toyota Genuine',
                slug: 'loc-dau-toyota-genuine',
                description: 'Lọc dầu chính hãng Toyota, phù hợp nhiều dòng xe',
                price: 120000,
                images: ['https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400'],
                stock: 80,
                categoryId: categories[3].id
            }
        })
    ])

    console.log(`✅ Created ${products.length} products`)

    // Create banners
    const banners = await Promise.all([
        prisma.banner.create({
            data: {
                imageUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200',
                title: 'Phụ tùng chính hãng - Giá tốt nhất',
                link: '/#products',
                order: 1,
                active: true
            }
        }),
        prisma.banner.create({
            data: {
                imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200',
                title: 'Khuyến mãi tháng này - Giảm đến 30%',
                link: '/#products',
                order: 2,
                active: true
            }
        }),
        prisma.banner.create({
            data: {
                imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200',
                title: 'Giao hàng toàn quốc',
                link: '/#contact',
                order: 3,
                active: true
            }
        })
    ])

    console.log(`✅ Created ${banners.length} banners`)

    // Create admin user
    const hashedPassword = await bcrypt.hash('123456789@a', 12)
    const adminUser = await prisma.user.create({
        data: {
            email: 'admin@gmail.com',
            password: hashedPassword,
            name: 'Admin',
            role: 'ADMIN'
        }
    })
    console.log(`✅ Created admin user: ${adminUser.email}`)

    console.log('🎉 Seeding completed!')
}

main()
    .catch((e) => {
        console.error('❌ Seeding failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
