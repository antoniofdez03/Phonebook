const express = require('express')
const morganLogger = require('./middlewares/morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use(morganLogger)

let persons = [
    {
      name: "Arto Hellas",
      number: "041123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    response.send(
        `<p> Phonebook has info for ${persons.length} people </p>
         <p> ${new Date()} </p>`
        )
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    console.log({ id })
    console.log({ person: person })

    if(person)
        response.json(person)
    else
        response.status(404).end()
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    const randomId = Math.floor(Math.random() * 1000000)

    if(!person || !person.name || !person.number)
        return response.status(400).json({
            error: 'Person data are not correct'
        })
    
    const exists = persons.find(p => p.name === person.name)
    if(exists)
        return response.status(409).json({
            error: 'name must be unique'
        })

    const newPerson = {
        name: person.name,
        number: person.number,
        id: randomId
    }

    persons = [...persons, newPerson]

    response.status(201).json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id != id)

    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
