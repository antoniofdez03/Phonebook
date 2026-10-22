import axios from 'axios'

const baseUrl = '/api/persons'

export const getAllNumbers = () => {
    return axios.get(baseUrl)
      .then((response) => {
          const {data} = response
          return data
      })
}

export const addNumber = ({name, number}) => {
    return axios.post(baseUrl, {name, number})
        .then(response => {
            const {data} = response
            return data
        })
}

export const deleteNumber = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export const updateNumber = (updatedPerson) =>
  axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    .then(response => response.data)