import axios from 'axios'
import { Navigate } from 'react-router-dom'

const API_URL = 'http://localhost:8080/api/auth/'
async function register(nickname, email, password) {
    const response = await axios.post(API_URL + 'signup', {
        nickname,
        email,
        password,
    })
    return response.data
}
async function login(email, password) {
    const response = await axios.post(API_URL + 'signin', {
        email,
        password,
    })
    if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
function logout() {
    localStorage.removeItem('user')
    Navigate('/')
}
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'))
}
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
}
export default AuthService
