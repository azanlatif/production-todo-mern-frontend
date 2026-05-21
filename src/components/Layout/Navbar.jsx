import { FaUserTie, FaBars, FaTimes } from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import './Navbar.css'; // Add this style sheet import line assignment

const Navbar = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [menuOpen, setMenuOpen] = useState(false)

    //get username
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('todo_token'))
        console.log('username data:', userData?.user?.username);
        setUsername(userData && userData.user.username)
    }, [])

    //logout Function
    const logoutHandler = () => {
        localStorage.removeItem('todo_token')
        navigate('/login')
        toast.success('Logout Successfully')
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <nav className="navbar">
            <div className="nav-left">
                <FaUserTie />
                <span>Welcome {username}!</span>
            </div>

            <button className="hamburger-btn" onClick={toggleMenu} aria-label="Toggle menu">
                {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>

            <div className={`nav-right ${menuOpen ? 'open' : ''}`}>
                <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link> {/* <-- ADD THIS LINK */}
                <Link to="/todolist" onClick={() => setMenuOpen(false)}>My Todo List</Link>
                <button onClick={logoutHandler} title="Logout" className="nav-logout-btn">
                    <RiLogoutCircleRLine color="red" size={26} />
                </button>
            </div>
        </nav>
    )
}

export default Navbar
