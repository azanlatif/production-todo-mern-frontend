import axios from 'axios'


const BaseUrl = process.env.VITE_BASEURL;

//get user token 
const user = JSON.parse(localStorage.getItem('todo_token'))

// Add an interceptor to dynamically inject the authorization header on every request
axios.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('todo_token'));
        if (user && user.token) {
            config.headers["Authorization"] = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
//Create TODO
const createTodo = (data) => {
    return axios.post(`${BaseUrl}/api/v1/todo/create`, data)

}

//Get All TODO
const getAllTodo = (id) => {
    return axios.post(`${BaseUrl}/api/v1/todo/getAll/${id}`)

}

//UPDATE TODO
const updateTodo = (id, data) => {
    return axios.patch(`${BaseUrl}/api/v1/todo/update/${id}`, data)
}

//Delete ToDO
const deleteTodo = (id) => {
    return axios.delete(`${BaseUrl}/api/v1/todo/delete/${id}`)
}
const TodoServices = { createTodo, getAllTodo, updateTodo, deleteTodo }

export default TodoServices;