import axios from 'axios'

const baseUrl = "https://serene-ravine-17618.herokuapp.com/api/persons"

export const getPhonebook = async() => {
    return axios.get(baseUrl)
}

export const create = async(newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

