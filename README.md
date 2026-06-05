# User Manage Server
Full-stack user management project with a NestJS backend and a Next.js frontend.

## Project Structure
```text
backend/   NestJS API with MongoDB persistence
frontend/  Next.js app with login flow and user directory dashboard
```

## Architecture

### Backend — Layered Architecture

```text
backend/src/
├── main.ts
├── app.module.ts
│
├── config/                        # App-level configuration (CORS, etc.)
├── common/
│   ├── app-config/                # Env config module and service
│   └── dto/                       # Shared DTOs (pagination)
│
├── providers/
│   └── mongo/                     # Mongoose setup and base repository
│       └── repository/            # Generic model repository + transactions
│
├── features/
│   └── users/                     # Domain: users
│       ├── models/                # Mongoose schema
│       ├── dtos/                  # Create / get DTOs
│       ├── services/              # Business logic (create, get)
│       ├── types/
│       └── users.repository.ts    # Data access layer
│
└── controllers/
    ├── users/                     # HTTP entry point for users
    └── health/                    # Health check endpoint
```

> Flow: `Controller → Service → Repository → MongoDB`

---

### Frontend — Feature-based Architecture

```text
frontend/src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Dashboard page (/)
│   └── login/
│       └── page.tsx               # Login page (/login)
│
├── components/
│   ├── login-form.tsx             # Login UI
│   └── directory-dashboard.tsx    # User directory UI
│
└── lib/
    └── users.ts                   # API calls to backend
```

> Flow: `Page → Component → lib/users (fetch) → Backend API`

---

## Environment Setup
Create the backend environment file:

```bash
cp backend/.env.example backend/.env
```

Backend variables:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-manage-server
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

URLs default:

- Backend API: `http://localhost:3000`
- Swagger docs: `http://localhost:3000/docs`
- Frontend app: `http://localhost:3001`


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
