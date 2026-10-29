require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const middleware = require('./utils/middleware')
const personsRouter = require('./controllers/persons')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.morganLogger)

app.get('/info', (request, response) => {
    Person.countDocuments({}).then(count => {
        response.send(
        `<p> Phonebook has info for ${count} people </p>
         <p> ${new Date()} </p>`
        )
    })
})

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
