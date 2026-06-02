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

## Layered Architecture

The backend is organized by layers. Each layer has a specific responsibility, so the code stays easier to read, test, and extend.

```text
HTTP request
  -> Controller layer
  -> DTO validation layer
  -> Service layer
  -> Repository layer
  -> Database model layer
  -> MongoDB
```

### Controller Layer

Location:

```text
src/controllers/
```

Controllers expose the HTTP API. They receive requests, read params/query/body data, and delegate the business action to a service.

Example:

```text
src/controllers/users/users.controller.ts
```

This controller exposes:

- `POST /users`
- `GET /users`

Controllers should stay thin. They should not contain database logic.

### DTO And Validation Layer

Location:

```text
src/features/users/dtos/
src/common/dto/
```

DTOs define the shape of incoming and outgoing data. They use `class-validator` decorators to validate requests before the data reaches the service layer.

Examples:

- `CreateUserRequest` validates user creation payloads
- `GetAllUsersRequest` validates pagination and filters
- `PaginationQuery` centralizes pagination params

### Service Layer

Location:

```text
src/features/users/services/
```

Services contain the use cases of the application. They coordinate the work needed to complete an action.

Examples:

- `UserCreateService` handles the create-user use case
- `UserGetService` handles the list-users use case

Services should contain business decisions and call repositories when they need data persistence.

### Repository Layer

Location:

```text
src/features/users/users.repository.ts
src/common/repository/
```

Repositories isolate database access. The feature repository extends a shared base repository, so common database operations like create and paginated reads are reused.

This keeps MongoDB/Mongoose details away from controllers and services.

### Model Layer

Location:

```text
src/features/users/models/
```

Models define how data is stored in MongoDB with Mongoose schemas.

Example:

```text
src/features/users/models/user.model.ts
```

### Config Layer

Location:

```text
src/config/
src/common/app-config/
```

Configuration is centralized here. This includes MongoDB connection setup, CORS setup, environment validation, and app-level config access.

## User Request Flow

Creating a user follows this flow:

```text
POST /users
  -> UsersController.create()
  -> CreateUserRequest validation
  -> UserCreateService.create()
  -> UsersRepository.create()
  -> User Mongoose model
  -> MongoDB users collection
```

Listing users follows this flow:

```text
GET /users?limit=50&offset=0
  -> UsersController.getAll()
  -> GetAllUsersRequest validation
  -> UserGetService.getAll()
  -> UsersRepository.getPaginated()
  -> User Mongoose model
  -> MongoDB users collection
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
