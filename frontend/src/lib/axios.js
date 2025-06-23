import axios from "axios"

// in production there's no such thing as localhost. DYNAMIC is the way to go.
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api"
const api = axios.create({
    baseURL: BASE_URL,
})

export default api