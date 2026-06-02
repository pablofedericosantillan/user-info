# User Info

Full-stack user management project with a NestJS backend and a Next.js frontend.

## Structure

```text
backend/   NestJS API with MongoDB persistence
frontend/  Next.js app with login flow and user directory dashboard
```

## Backend

```bash
cd backend
npm install
npm run start:dev
```

The API runs on `http://localhost:3000` and exposes Swagger docs at `http://localhost:3000/docs`.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:3001` by default and reads users from `NEXT_PUBLIC_API_URL` when configured.

