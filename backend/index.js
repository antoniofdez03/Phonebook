require('dotenv').config()
require('./mongo')

const express = require('express')
const morganLogger = require('./middlewares/morgan')
const cors = require('cors')
const notFound = require('./middlewares/notFound')
const handleError = require('./middlewares/handleError')
const Person = require('./models/Person')

const app = express()

app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

app.use(morganLogger)

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        response.send(
        `<p> Phonebook has info for ${count} people </p>
         <p> ${new Date()} </p>`
        )
    })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
    const {id} = request.params
   
    Person.findById(id).then(person => {
        if(person)
            response.json(person)
        else
            response.status(404).end()
    }).catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    const person = request.body

    if(!person || !person.name || !person.number){
        return response.status(400).json({
        error: 'Person data is missing'
        })
    }

  const newPerson = new Person({
    name: person.name,
    number: person.number
  })
  
  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => {next(error)})
})

app.delete('/api/persons/:id', (request, response, next) => {
    const {id} = request.params    
    Person.findByIdAndDelete(id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const {id} = request.params   
    const person = request.body

    const newPersonInfo = {
        name: person.name,
        number: person.number
    } 
    Person.findByIdAndUpdate(id, newPersonInfo, { new: true }).then( savedPerson => {
        response.json(savedPerson)
    }).catch(error => next(error))
})

app.use(notFound)
app.use(handleError)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
