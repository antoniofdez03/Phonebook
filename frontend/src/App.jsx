import { useEffect, useState } from 'react'
import { getAllNumbers, addNumber, deleteNumber, updateNumber } from './services'

const Filter = ({handleFilterChange}) => {
  return(
    <div>
      Filter shown with a <input type='text' onChange={handleFilterChange}/>
    </div>
  )
}

const PersonForm = ({values, handlers}) => {
  return (
    <form onSubmit={handlers.submit}>
      <div>
        name: <input type='text' onChange={handlers.nameChange} value={values.newName}/>
      </div>
      <div>
        number: <input type='number' onChange={handlers.numberChange} value={values.newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({deleteId, ...person}) => {
  
  const handleDelete = () => {
    if(window.confirm(`Delete ${person.name} ?`))
      deleteId(person.id)
  }

  return (
    <p> 
      {person.name} {person.number} 
      <button onClick={handleDelete}>delete</button> 
    </p>
  )
}

const Persons = ({persons, filter, deleteId}) => {
  return (
  <ul>
    {
      persons
        .filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))
        .map(person => <Person key={person.name} {...person} deleteId={deleteId}/>)
    }
  </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    getAllNumbers()
      .then((response) => {
          setPersons(response)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)
    
    if(existingPerson) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        updateNumber({ ...existingPerson, number: newNumber })
          .then(updatedPerson => {
            setPersons(prev => prev.map(p => p.id !== updatedPerson.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
        })
      return
    }

    const newPersonToAdd = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    addNumber(newPersonToAdd)
      .then(newPerson => {
        setPersons( prevPersons => prevPersons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error(error)
        setError('La API ha petado')
      })
  }

  const deleteId = (id) => {
    deleteNumber(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm 
        values={{newName: newName, newNumber: newNumber}}
        handlers={{submit: handleSubmit, nameChange: handleNameChange, numberChange: handleNumberChange}}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteId={deleteId}/>
    </div>
  )
}

export default App