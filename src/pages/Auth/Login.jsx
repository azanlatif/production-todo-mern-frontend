import { React, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import './AuthStyle.css'
import AuthServices from '../../Services/AuthServices';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/ErrorMessage';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //its a hook so need to be stored in variable
    const navigate = useNavigate()

    //Login function
    const loginHandler = async (e) => {
        try {
            e.preventDefault()
            const data = { email, password }
            const res = await AuthServices.loginUser(data)
            toast.success(res.data.message)
            navigate('/home');
            //Set LocalStorage so when backed after login it automatically goes to home
            //use stringify because it accept string
            localStorage.setItem('todo_token', JSON.stringify(res.data))
        } catch (err) {
            //toast notification to show user
            toast.error(getErrorMessage(err))
            console.log(err);
        }
    }

    return (
        <div className="form-container">
            <div className="form">
                <div className="login-icon">
                    <FaUserCircle />
                </div>
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='input' placeholder='Enter Email' />
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input' placeholder='Enter Password' />
                </div>

                <div className="form-bottom">
                    <p className='link-register'>Not a User? Please <Link to='/register'> <span>Register</span></Link></p>
                    <button type='submit' onClick={loginHandler} className='login-btn'>LOGIN</button>
                </div>
            </div>
        </div>
    )
}

export default Login
