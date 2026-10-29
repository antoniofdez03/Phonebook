const bcrypt = require('bcrypt')
const personsRouter = require('express').Router()
const Person = require('../models/Person')

personsRouter.get('/', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })

})

personsRouter.get('/:id', (request, response, next) => {
    const {id} = request.params
   
    Person.findById(id).then(person => {
        if(person)
            response.json(person)
        else
            response.status(404).end()
    }).catch(error => next(error))
})

personsRouter.post('/', (request, response, next) => {
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

personsRouter.delete('/:id', (request, response, next) => {
    const {id} = request.params    
    Person.findByIdAndDelete(id).then(() => {
        response.status(204).end()
    }).catch(error => next(error))
})

personsRouter.put('/:id', (request, response, next) => {
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

module.exports = personsRouter