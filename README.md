# Auto Parts Webapp

Webapp bán phụ tùng ô tô được xây dựng với Next.js 15, React 19, TailwindCSS, Prisma, và Zustand.

## 🚀 Quick Start

### 1. Cài đặt dependencies

```bash
npm install
```

### 2. Cấu hình môi trường

Copy file `.env.example` thành `.env` và cập nhật DATABASE_URL:

```bash
cp .env.example .env
```

Cập nhật DATABASE_URL với connection string của Neon PostgreSQL:

```
DATABASE_URL="postgresql://user:password@host:5432/auto_parts?sslmode=require"
```

### 3. Setup Database

```bash
# Push schema to database
npm run prisma:push

# Seed sample data
npm run prisma:seed

# (Optional) Open Prisma Studio
npm run prisma:studio
```

### 4. Chạy Development Server

```bash
npm run dev
```

Truy cập [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── products/
│   │   ├── categories/
│   │   ├── banners/
│   │   └── orders/
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/
│   ├── layout/            # Header, Footer
│   └── shop/              # Shop UI components
├── lib/                   # Utilities
├── store/                 # Zustand state
└── types/                 # TypeScript types
```

## 🛠 Tech Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **UI**: React 19 + TailwindCSS 4
- **State**: Zustand
- **Database**: Prisma + PostgreSQL
- **Forms**: React Hook Form + Zod

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run prisma:push` | Push schema to DB |
| `npm run prisma:seed` | Seed sample data |
| `npm run prisma:studio` | Open Prisma Studio |

## 🚀 Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `DATABASE_URL`: Neon PostgreSQL connection string
4. Deploy!
