# Reno Notice Backend

Simple notice board backend built with Express, TypeScript, Prisma, and PostgreSQL.

## Features

- Create, read, update, and delete notices
- Notice categories: `EXAM`, `EVENT`, `GENERAL`
- Notice priorities: `NORMAL`, `URGENT`
- PostgreSQL database access through Prisma
- Basic health check endpoint

## Tech Stack

- Node.js
- Express 5
- TypeScript
- Prisma 7
- PostgreSQL

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/reno?schema=public"
PORT=8000
NODE_ENV=development
```

Replace the database URL with your own PostgreSQL connection string.

### 3. Run database migrations

```bash
npx prisma migrate dev
```

### 4. Start the development server

```bash
npm run dev
```

The server runs at:

```text
http://localhost:8000
```

## Scripts

```bash
npm run dev
```

Starts the development server with file watching.

```bash
npm run build
```

Generates the Prisma client and compiles TypeScript.

```bash
npm start
```

Runs the compiled server from `dist/src/server.js`.

## API Endpoints

### Health

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Confirms the backend is running |
| `GET` | `/health` | Returns health status |

### Notices

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/notices` | Get all notices |
| `GET` | `/notices/:id` | Get one notice by ID |
| `POST` | `/notices` | Create a notice |
| `PUT` | `/notices/:id` | Update a notice |
| `DELETE` | `/notices/:id` | Delete a notice |

## Notice Request Body

Use this JSON body for `POST /notices` and `PUT /notices/:id`:

```json
{
  "title": "Exam Schedule Released",
  "body": "The final exam schedule has been published.",
  "category": "EXAM",
  "priority": "URGENT",
  "publishDate": "2026-07-09T10:00:00.000Z",
  "imageUrl": "https://example.com/image.jpg"
}
```

Required fields:

- `title`
- `body`
- `publishDate`

Optional fields:

- `category`, defaults to `GENERAL`
- `priority`, defaults to `NORMAL`
- `imageUrl`

## Response Examples

Successful list response:

```json
{
  "data": [
    {
      "id": 1,
      "title": "Exam Schedule Released",
      "body": "The final exam schedule has been published.",
      "category": "EXAM",
      "priority": "URGENT",
      "publishDate": "2026-07-09T10:00:00.000Z",
      "imageUrl": "https://example.com/image.jpg",
      "createdAt": "2026-07-09T10:00:00.000Z",
      "updatedAt": "2026-07-09T10:00:00.000Z"
    }
  ]
}
```

Validation error response:

```json
{
  "errors": {
    "title": "Title is required",
    "publishDate": "Valid publish date is required"
  }
}
```

## Project Structure

```text
prisma/
  migrations/              Database migrations
  schema.prisma            Prisma schema
src/
  config/config.ts         Environment configuration
  controllers/             Request handlers
  lib/                     Prisma client and validation helpers
  routes/                  Express route definitions
  server.ts                Application entry point
generated/
  prisma/                  Generated Prisma client
```

## Database Model

The main model is `Notice`:

- `id`
- `title`
- `body`
- `category`
- `priority`
- `publishDate`
- `imageUrl`
- `createdAt`
- `updatedAt`

