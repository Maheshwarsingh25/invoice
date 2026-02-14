Invoice Management App

A simple full-stack invoice management system with dashboard, create invoice, and invoice details pages.
This version does not include payments yet (can be added later).

Tech Stack

Frontend: React, Axios, React Router

Backend: Node.js, Express

Database: PostgreSQL with Prisma ORM

Styling: Minimal CSS (or Tailwind if you add later)


## Frontend Setup

Go to the frontend folder:

cd frontend


Install dependencies:

npm install


Start frontend development server:

npm run dev


Frontend will run on:

http://localhost:5173


##Backend Setup

Go to the backend folder:

cd backend


Install dependencies:

npm install


Configure PostgreSQL database:

Create a PostgreSQL database (e.g., invoice_db)

Create .env file:

DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/invoice_db?schema=public"


Generate Prisma client and run migration:

npx prisma generate
npx prisma migrate dev --name init


Start backend server:

node server.js


Server will run on:

http://localhost:5000