import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

// Only initialize Prisma if DATABASE_URL is available (for Vercel builds)
const createPrismaClient = () => {
    if (!process.env.DATABASE_URL) {
        console.warn('DATABASE_URL not found. Database features will be unavailable.')
        return null as unknown as PrismaClient
    }

    // Prisma 7 requires adapter-based connection
    const pool = new Pool({ connectionString: process.env.DATABASE_URL })
    const adapter = new PrismaPg(pool)

    return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma
}

export default prisma
