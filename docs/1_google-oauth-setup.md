# Google OAuth Setup

## Overview

Authentication uses Google OAuth 2.0. The backend handles the OAuth flow and issues a JWT. The frontend stores the JWT in `localStorage` and sends it as a Bearer token on every API request.

```
User → /auth/google → Google → /auth/google/callback → JWT → /auth/callback → Dashboard
```

---

## 1. Create a Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select an existing one)
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Set application type to **Web application**
6. Add the following **Authorized redirect URI**:
   ```
   http://localhost:3000/auth/google/callback
   ```
7. Copy the **Client ID** and **Client Secret**

---

## 2. Configure the Backend

Edit `backend/.env`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-manage-server

GOOGLE_CLIENT_ID=your-client-id-here
GOOGLE_CLIENT_SECRET=your-client-secret-here

JWT_SECRET=a-long-random-secret-string

BACKEND_URL=http://localhost:3000
FRONTEND_URL=http://localhost:3001
```

Generate a strong `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 3. Configure the Frontend

`frontend/.env.local` only needs one variable (already set by default):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

## 4. Run

```bash
# Start MongoDB
cd docker && ./setup.sh

# Start both servers
npm run dev
```

Open `http://localhost:3001/login` and click **Sign in with Google**.

---

## Flow details

| Step | Who | What |
|------|-----|------|
| 1 | Frontend | Redirects browser to `GET /auth/google/login` |
| 2 | Backend | Passport redirects to Google consent screen |
| 3 | Google | Redirects to `GET /auth/google/callback?code=...` |
| 4 | Backend | Exchanges code for profile, finds or creates user in MongoDB |
| 5 | Backend | Signs JWT (`{ sub: userId, email }`, 7 day expiry) |
| 6 | Backend | Redirects to `FRONTEND_URL/auth/callback?token=JWT` |
| 7 | Frontend | Stores JWT in `localStorage`, redirects to `/` |
| 8 | Frontend | Sends `Authorization: Bearer JWT` on every `/users` request |
