import { React, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa';
import './AuthStyle.css'
import AuthServices from '../../Services/AuthServices';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../utils/ErrorMessage';

const Register = () => {

    //its a hook so need to be stored in variable
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    //Login function
    const loginHandler = async (e) => {
        try {
            e.preventDefault()
            const data = { email, password, username }
            const res = await AuthServices.registerUser(data)
            toast.success(res.data.message)
            console.log(res.data);

            //After successfuly registering, redirect user to Login page
            navigate('/login');
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
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='input' placeholder='Enter Username' />
                </div>
                <div>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='input' placeholder='Enter Email' />
                </div>
                <div>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='input' placeholder='Enter Password' />
                </div>

                <div className="form-bottom">
                    <p className='link-register'>Already Reister? <Link to='/login'> <span>Login</span></Link></p>
                    <button type='submit' onClick={loginHandler} className='login-btn'>REGISTER</button>
                </div>
            </div>
        </div>
    )
}

export default Register
