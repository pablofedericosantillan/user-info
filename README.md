# User Manage Server

Full-stack user management project with a NestJS backend and a Next.js frontend.

## Project Structure

```text
backend/   NestJS API with MongoDB persistence
frontend/  Next.js app with login flow and user directory dashboard
```

## Requirements

- Node.js 20+
- npm 10+
- MongoDB running locally or a MongoDB Atlas connection string

## Environment Setup

Create the backend environment file:

```bash
cp backend/.env.example backend/.env
```

Backend variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-manage-server
CORS_ORIGIN=http://localhost:3001
```

Create the frontend environment file:

```bash
cp frontend/.env.example frontend/.env.local
```

Frontend variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

The frontend reads users from `NEXT_PUBLIC_API_URL`, so keep it pointing to the backend URL.

## Install Dependencies

From the repository root:

```bash
npm run install:all
```

Or install each app separately:

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Run The Servers

Run both servers from the repository root:

```bash
npm run dev
```

Run only the backend:

```bash
npm run dev:backend
```

Run only the frontend:

```bash
npm run dev:frontend
```

URLs:

- Backend API: `http://localhost:3000`
- Swagger docs: `http://localhost:3000/docs`
- Frontend app: `http://localhost:3001`

## How Frontend And Backend Sync

The frontend dashboard calls:

```text
GET http://localhost:3000/users?limit=50&offset=0
```

The backend allows requests from:

```text
http://localhost:3001
```

This is configured with:

- `frontend/.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:3000`
- `backend/.env`: `CORS_ORIGIN=http://localhost:3001`

If the backend has no users yet, the frontend shows demo users so the screen still renders.

## Login Flow

Open:

```text
http://localhost:3001/login
```

Use any valid email and any password to enter the dashboard. The session is stored in browser local storage for this demo flow.

## Build

From the repository root:

```bash
npm run build
```
