# User Manage Server
Full-stack user management project with a NestJS backend and a Next.js frontend.

## Tech Stack

### Backend

| Component    | Library                          |
|--------------|----------------------------------|
| Runtime      | Node.js (>= 20.x)                |
| Framework    | NestJS 11                        |
| Language     | TypeScript                       |
| Auth         | Passport.js (JWT + Google OAuth 2.0) |
| API Docs     | Swagger UI (@nestjs/swagger)     |
| Database     | MongoDB (Mongoose)               |

### Frontend

| Component    | Library        |
|--------------|----------------|
| Framework    | Next.js 15     |
| Language     | TypeScript     |

## Project Structure
```text
backend/   NestJS API with MongoDB persistence
frontend/  Next.js app with login flow and user directory dashboard
docker/    Docker Compose setup for local infrastructure
```

### Docker

`docker/docker-compose.yml` spins up a single-node MongoDB 6.0 replica set (`testMongo1`) on port `27017`. A replica set is required because NestJS + Mongoose uses transactions, which MongoDB only supports in replica set mode.

```bash
docker compose -f docker/docker-compose.yml up -d
```

## Architecture

### Backend

The backend is organized in three layers: **Controller**, **Service** (business logic), and **Data** (persistence). Each layer only communicates with the one below it.

> Flow: `Controller → Service → Repository → DB`

---

### Frontend

The frontend is organized by type: pages in `app/`, UI in `components/`, and data fetching in `lib/`.

> Flow: `Page → Component → lib (fetch) → Backend API`

---

## Environment Setup
Create the backend environment file:

```bash
cp backend/.env.example backend/.env
```

Backend variables:

```env
PORT=8000
MONGO_URI=mongodb://localhost:27017/user-manage-server

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

JWT_SECRET=change-me-in-production

BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3001
```

Create the frontend environment file:

```bash
cp frontend/.env.example frontend/.env.local
```

Frontend variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
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

URLs default:

- Backend API: `http://localhost:8000`
- Swagger docs: `http://localhost:8000/docs`
- Frontend app: `http://localhost:3001`
