import axios from 'axios'

export const getAllNumbers = () => {
    return axios.get('http://localhost:3001/api/persons')
      .then((response) => {
          const {data} = response
          return data
      })
}

export const addNumber = ({name, number}) => {
    return axios.post('http://localhost:3001/api/persons', {name, number})
        .then(response => {
            const {data} = response
            return data
        })
}

export const deleteNumber = (id) => {
    return axios.delete(`http://localhost:3001/api/persons/${id}`)
}

export const updateNumber = (updatedPerson) =>
  axios.put(`http://localhost:3001/api/persons/${updatedPerson.id}`, updatedPerson)
    .then(response => response.data)