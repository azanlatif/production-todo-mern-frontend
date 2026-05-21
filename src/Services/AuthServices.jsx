import axios from 'axios'

const BaseUrl = process.env.VITE_BASEURL;

const registerUser = (data) => {
    return axios.post(`${BaseUrl}/api/v1/user/register`, data)
}
const loginUser = (data) => {
    return axios.post(`${BaseUrl}/api/v1/user/login`, data)
}


const AuthServices = { registerUser, loginUser }

export default AuthServices;