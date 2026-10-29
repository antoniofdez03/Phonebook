const app = require('../app')
const supertest = require('supertest')

const api = supertest(app)

const initialPersons = [
    {
        name: 'Antonio',
        number: '040-123456'
    },
    {
        name: 'Ricardo',
        number: '031-123456'

    }
]

const getAllPersonsNames = async () => {
    const response = await api.get('/api/persons')
    return {
        names: response.body.map(person => person.name),
        response
    }
}

module.exports = {
    api,
    initialPersons,
    getAllPersonsNames
}
