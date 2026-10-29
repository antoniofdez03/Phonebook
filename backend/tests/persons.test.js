const mongoose = require('mongoose')

const server = require('../index')
const Person = require('../models/Person')
const {api, initialPersons, getAllPersonsNames} = require('./helpers')


beforeEach(async () => {
    await Person.deleteMany({})

    for( let person of initialPersons) {
        const personObject = new Person(person)
        await personObject.save()
    }
})

describe('GET persons', () => {
    test('persons are returned as json', async () => {
    await api
        .get('/api/persons')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

test('there are two persons', async () => {
    const response = await api.get('/api/persons')
    expect(response.body).toHaveLength(initialPersons.length)
    })

test('there is a person called Antonio', async () => {
    const {names} = await getAllPersonsNames()

    expect(names).toContain('Antonio')
    })
})

describe('POST persons', () => {
    test('a valid person can be added', async () => {
        const newPerson = {
            name: 'Jose',
            number: '102-892171'
        }

        await api
            .post('/api/persons')
            .send(newPerson)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const {names, response} = await getAllPersonsNames()

        expect(names).toContain(newPerson.name)
        expect(response.body).toHaveLength(initialPersons.length + 1)
    })
    
    test('a person without name cant be added', async () => {
    const newPerson = {
        number: '021-1281271'
    }

    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/persons')
    expect(response.body).toHaveLength(initialPersons.length)
    })

    test('a person without number cant be added', async () => {
    const newPerson = {
        name: 'Alex'
    }

    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/persons')
    expect(response.body).toHaveLength(initialPersons.length)
    })

    test('a person with invalid number cant be added', async () => {
    const newPerson = {
        name: 'Alex',
        number: '12931012'
    }

    await api
        .post('/api/persons')
        .send(newPerson)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/persons')
    expect(response.body).toHaveLength(initialPersons.length)
    })
})

describe('DELETE persons', () => {

    test('a person can be deleted', async () => {
    const {response: firstResponse} = await getAllPersonsNames()
    const {body: persons} = firstResponse
    const personToDelete = persons[0]
    await api
        .delete(`/api/persons/${personToDelete.id}`)
        .expect(204)

    const {names, response: secondResponse} = await getAllPersonsNames()

    expect(secondResponse.body).toHaveLength(initialPersons.length - 1)
    expect(names).not.toContain(personToDelete.name)
    })

    test('a person that dont exist cant be deleted', async () => {
        await api
            .delete(`/api/persons/1234`)
            .expect(400)

        const {response} = await getAllPersonsNames()

        expect(response.body).toHaveLength(initialPersons.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
    server.close()
})
