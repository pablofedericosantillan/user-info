# User Manage Server API

NestJS API for creating and listing users with MongoDB persistence, request validation, pagination, and Swagger documentation.

This project is a clean backend service focused on user information management and a modular NestJS structure.

## Features

- Create users
- List users with pagination
- Optional user filtering by email
- Healthcheck endpoint
- MongoDB persistence with Mongoose
- Soft delete plugin configuration
- Request validation with `class-validator`
- Swagger/OpenAPI documentation
- Modular feature-based structure

## Tech Stack

- Node.js 20+
- TypeScript
- NestJS
- MongoDB
- Mongoose
- Swagger/OpenAPI
- Jest
- ESLint + Prettier

## Project Structure

```text
src/
  common/       Shared config, DTOs, repositories, and utilities
  config/       Mongo and CORS configuration
  controllers/  HTTP controllers and modules
  features/     Feature modules, services, DTOs, models, and repositories
```

## API Overview

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/healthcheck` | Service healthcheck |
| `POST` | `/users` | Create a user |
| `GET` | `/users` | List users with pagination and optional email filter |
| `GET` | `/docs` | Swagger documentation |

## Requirements

- Node.js `>=20`
- npm `>=10`
- MongoDB instance

## Environment Variables

Create a `.env` file in the project root:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/user-manage-server
NODE_ENV=development
```

## Installation

```bash
npm install
```

## Run Locally

```bash
npm run start:dev
```

The API runs on:

```text
http://localhost:3000
```

Swagger docs are available at:

```text
http://localhost:3000/docs
```

## Useful Commands

```bash
npm run build
npm run lint
npm run test
npm run test:e2e
```

## Example Request

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"email":"email@email.com","pwd":"secret"}'
```

## Portfolio Notes

This project is useful as a portfolio backend because it shows:

- NestJS feature-module organization
- DTO validation
- MongoDB repository usage
- Pagination patterns
- Swagger API documentation
- Test and lint scripts

## Next Improvements

- Add authentication
- Hash passwords before persistence
- Add Docker Compose for MongoDB
- Add GitHub Actions for lint, build, and tests
- Add more tests around user creation and filtering
