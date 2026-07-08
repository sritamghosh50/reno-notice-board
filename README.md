# Reno Notice Board

A responsive Notice Board CRUD application built for the Reno Platforms web development assignment.

## Tech Stack

- Next.js Pages Router
- Prisma ORM
- MySQL-compatible hosted database, for example TiDB Cloud
- Plain CSS
- Vercel deployment

## Features

- Create notice
- Read/list notices as responsive cards
- Edit notice using the same form component
- Delete notice with confirmation
- Server-side validation inside API routes
- Prisma database persistence
- Urgent notices are ordered first using Prisma `orderBy`
- Visible red `Urgent` badge
- Optional image URL field

## Notice Fields

- title: required short text
- body: required long text
- category: Exam, Event, General
- priority: Normal, Urgent
- publishDate: valid date
- imageUrl: optional URL

## API Routes

| Method | Route | Use |
|---|---|---|
| GET | `/api/notices` | Get all notices ordered with Urgent first |
| POST | `/api/notices` | Create a notice |
| GET | `/api/notices/[id]` | Get one notice |
| PUT/PATCH | `/api/notices/[id]` | Update a notice |
| DELETE | `/api/notices/[id]` | Delete a notice |

## How to Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Copy `.env.example` to `.env`:

```bash
copy .env.example .env
```

On Mac/Linux:

```bash
cp .env.example .env
```

Open `.env` and paste your hosted database connection string:

```env
DATABASE_URL="mysql://username:password@host:4000/reno_notice_board?sslaccept=strict"
```

### 3. Push Prisma schema to database

```bash
npx prisma db push
```

### 4. Run the app

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Deployment on Vercel

1. Push this project to a public GitHub repository.
2. Import the repository in Vercel.
3. Add the same `DATABASE_URL` in Vercel Environment Variables.
4. Deploy the project.
5. Open the public Vercel URL and test create, edit and delete.

## One Thing I Would Improve With More Time

I would add real image upload support using a free cloud image storage service, instead of only using an optional image URL field.

## Where and How AI Was Used

AI was used to understand the assignment requirements, plan the project folder structure, generate the initial CRUD/API code, and review whether the required stack and validation rules were covered. I manually reviewed the code and tested the CRUD flow before submission.
