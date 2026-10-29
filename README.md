# Phonebook

A phonebook app made for a [fullstack bootcamp](https://fullstackopen.com/es/).

## Tech stack

- Frontend: React + Vite
- Backend: Node.js + Express + MongoDB (Mongoose)
- Tests: Jest + Supertest

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

## Tests

The backend has integration tests written with [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest).

### Run

    cd backend
    npm test

### What is covered

- `GET /api/persons`: returns JSON and the expected number of persons
- `POST /api/persons`: adds valid persons, rejects missing name, missing number or invalid number
- `DELETE /api/persons/:id`: deletes an existing person, rejects a malformed id