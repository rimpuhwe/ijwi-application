# Backend API

- Express.js + TypeScript + PostgreSQL + Prisma
- JWT authentication, admin-protected CRUD for services and portfolios
- Public read-only endpoints for services and portfolios

## Setup

1. Install dependencies:
   ```
   npm install
   ```
2. Set up your PostgreSQL database and update `.env`.
3. Run Prisma migrations:
   ```
   npx prisma migrate dev --name init
   ```
4. Seed the admin user:
   ```
   npm run seed
   ```
5. Start the dev server:
   ```
   npm run dev
   ```
