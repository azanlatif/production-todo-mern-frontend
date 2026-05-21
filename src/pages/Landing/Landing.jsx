import React from 'react'
import { Link } from 'react-router-dom'
import Hero from '../../assets/images/hero.jpg'
import './Landing.css'

const Landing = () => {
    return (
        <div className='hero'>
            <div className="intro-text">
                <h1>
                    <span className='tagline1'>Organize work and life</span> <br />
                    <span className='tagline2'>Finally</span>
                </h1>
                <p>
                    Type just anything into the task field and TodoList's <br />
                    one-of-its-kind natural language recognition will instantly fill your to-do list.
                </p>
                <div className="hero-actions">
                    <Link className='btn red' to="/register">Register Now</Link>
                    <Link className='btn blue' to="/login">Login</Link>
                </div>
            </div>
            <div className='hero-image-wrapper'>
                <img src={Hero} alt="hero-image" />
            </div>
        </div>
    )
}

export default Landing