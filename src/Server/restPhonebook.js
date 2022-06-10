import axios from 'axios'

const baseUrl = "http://localhost:3001/api/contacts"


let token = null
export const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

export const getPhonebook = async() => {
    return axios.get(baseUrl)
}

export const create = async(newObject) => {

    const config = {
        headers:{
            Authorization: token
        }
    }

    console.log(config)

    const request = axios.post(baseUrl, newObject, config)
    return request.then(response => response.data)
}

