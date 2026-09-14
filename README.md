## How to run

docker compose up --build

or manually:

> cd frontend, pnpm dev
> cd backend, pnpm dev

Frontend:
http://localhost:3000

Backend:
http://localhost:4000

DB:
http://localhost:5432

## Technologies

Frontend:

- React
- TypeScript
- Vite

Backend:

- Node.js
- Express
- TypeScript
- Prisma

Database:

- PostgreSQL

Other:

- Docker
- Docker Compose

## API

GET /tickets
POST /tickets
PATCH /tickets/:id
DELETE /tickets/:id
POST /tickets/:ticketId/comments

## Database

Ticket:

- id
- title
- description
- status
- priority
- createdAt

Comment:

- id
- ticketId
- message
- createdAt

One Ticket can have many Comments.

## Docker

The application uses Docker Compose.

Services:

- frontend
- backend
- PostgreSQL database

## Completed

- Ticket list
- Create ticket
- Edit ticket status
- Edit ticket priority
- Delete ticket
- Add comments
- Display comments
- Loading/error states
- PostgreSQL persistence
- Docker Compose

## Not completed

- Nothing

## AI Usage Report

- AI tool used: ChatGPT

I used AI mainly for repetitive boilerplate code and to speed up the initial implementation.

For the backend, I provided the Prisma model and asked AI to generate common CRUD operations and separate the code into routes and services. After receiving the result, I reviewed the generated code, checked that it matched my project structure and requirements, and only then integrated it into the project.

For the frontend, I provided the existing API functions, TypeScript types, component structure, and expected responsibilities of each component. This gave AI enough project context to generate components that matched the existing backend and data structure without requiring significant manual rewriting.

- Example Prompts

1. I have already configured Prisma, created a new model. Create for me the most common CRUD operations for GET, POST, PATCH, DELETE. And separate the code into /routes, /services. And provide model for context.

2. I am building a very simple frontend for Vite, React and TypeScript.
   I already have async functions for getTickets, createTicket, updateTicket,
   deleteTicket and createComment.
   Create the following components:

- TicketList.tsx
- TicketCard.tsx
- TicketForm.tsx
- EditTicket.tsx
- TicketDetails.tsx

I also provided the Ticket, Comment, TicketStatus and TicketPriority types

### What I changed manually

- Reviewed and adapted the AI-generated code before adding it to the project.
- Added the relation between Ticket and Comment models manually.
- Implemented the frontend API request logic manually.
- Connected the frontend components with the backend API.
- Configured Docker and Docker Compose manually.

### What was difficult

The most difficult part was configuring Docker and Docker Compose correctly, especially making sure that the backend could connect to PostgreSQL inside Docker and that all services started correctly together.
