import axios from 'axios'

const baseUrl = "http://localhost:3001/api/contacts"


let token = null
export const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

export const getPhonebook = async() => {
    return axios.get(baseUrl)
}

export const deleteContact = async(id) =>{
    const config = {
        headers:{
            Authorization: token
        }
    }
    const request = axios.delete(baseUrl + '/' + id, config)
    return request.then(response => response.data)
}

export const createContact = async(newObject) => {

    const config = {
        headers:{
            Authorization: token
        }
    }

    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

