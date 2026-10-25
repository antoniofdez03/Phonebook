const mongoose = require("mongoose")

const {Schema, model} = mongoose

const personSchema = new Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters long'],
    required: true
  },
  number: {
    type: String,
    minLength: [8, 'Number must be at least 8 characters long'],
    validate: {
      validator: (value) => /^\d{2,3}-\d+$/.test(value),
      message: props => `${props.value} is not a valid phone number (format: 09-1234556 or 040-22334455)`
    },
    required: true
  }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
const Person = model('Person', personSchema)

module.exports = Person