import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Login from './pages/Auth/Login'
import About from './pages/About/About'
import TodoList from './pages/Todos/TodoList'
import Register from './pages/Auth/Register'
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/Home/HomePage'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/about' element={<About />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/todolist' element={<TodoList />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
