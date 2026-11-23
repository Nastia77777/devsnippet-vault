# DevSnippet Vault

A full-stack web application for storing and organizing code snippets.

## Tech Stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS v4, shadcn/ui
- **Backend:** Node.js, Express 5, TypeScript
- **Database:** PostgreSQL (via Prisma 8)
- **Monorepo:** npm workspaces

## Project Structure

- `/client` — React frontend
- `/server` — Express backend
- `/` — root `package.json` with npm workspaces

## Setup & Running

### Prerequisites

- Node.js (v20.19+ or v22+)
- npm (v10+)

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd devsnippet-vault
```

### 2. Install dependencies

From the root directory:

```bash
npm install
```

### 3. Set up the database

Create a `.env` file in the `/server` directory with your PostgreSQL connection string:

```text
DATABASE_URL="postgresql://..."
```

Generate the Prisma contract and create the database table:

```bash
cd server
npx prisma contract emit
npx prisma db init
```

### 4. Run the application

From the root directory:

```bash
npm run dev
```

This will start both the client (on `http://localhost:5173`) and the server (on `http://localhost:3001`).

## Available Scripts

- `npm run dev` — start both frontend and backend in development mode
- `npm run build` — build the frontend for production (not yet configured for server)

## Features

- Create, read, and delete code snippets
- Snippet tags with automatic processing (trim, lowercase, dedupe)
- Copy snippet code to clipboard
- Modal form for creating new snippets
- Responsive grid layout
- Loading, error, and empty states

## Notes

- This project was built as a pre-internship task.
- The database is hosted on Prisma's free cloud service (will expire on 15.11.2026 unless claimed).