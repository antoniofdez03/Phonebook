# Phonebook

A phonebook app made for a [fullstack bootcamp](https://fullstackopen.com/es/).

## Tech stack

- Frontend: React + Vite
- Backend: Node.js + Express

## Run locally

### Backend

    cd backend
    npm install
    npm start

The API runs on http://localhost:3001

### Frontend

    cd frontend
    npm install
    npm run dev

The app runs on http://localhost:5173

## API

- `GET /api/persons`: list all persons
- `GET /api/persons/:id`: get one person
- `POST /api/persons`: add a person
- `PUT /api/persons/:id`: update a person
- `DELETE /api/persons/:id`: delete a person
