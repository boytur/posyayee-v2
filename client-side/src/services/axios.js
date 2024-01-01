import axios from "axios"
const API = import.meta.env.VITE_API_KEY

const instance = axios.create({
    withCredentials: true,
    baseURL: API
})

export default instance