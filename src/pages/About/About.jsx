import React from 'react';
import Navbar from '../../components/Layout/Navbar';
import { FaCheckCircle, FaRegLightbulb, FaShieldAlt } from 'react-icons/fa';
import './About.css';

const About = () => {
    return (
        <>
            <Navbar />
            <div className="about-container">
                <header className="about-header">
                    <h1>About TodoList</h1>
                    <p className="lead-text">
                        A modern, minimalist workspace designed to help you organize your life, clear your mind, and achieve your daily goals.
                    </p>
                </header>

                <section className="about-grid">
                    <div className="about-card">
                        <div className="about-icon blue">
                            <FaRegLightbulb />
                        </div>
                        <h3>Intelligent Design</h3>
                        <p>
                            Effortlessly manage your daily tasks through a streamlined user interface engineered to focus entirely on productivity.
                        </p>
                    </div>

                    <div className="about-card">
                        <div className="about-icon green">
                            <FaCheckCircle />
                        </div>
                        <h3>Stay Organised</h3>
                        <p>
                            Filter and track your completed or pending tasks with instantly updating metrics to monitor your productivity trends.
                        </p>
                    </div>

                    <div className="about-card">
                        <div className="about-icon dark">
                            <FaShieldAlt />
                        </div>
                        <h3>Secure Workspace</h3>
                        <p>
                            Your security is paramount. Your tasks, notes, and profile metrics are heavily protected with authenticated encryption.
                        </p>
                    </div>
                </section>

                <footer className="about-footer">
                    <p>Version 1.0.0 &bull; Developed with React</p>
                </footer>
            </div>
        </>
    );
};

export default About;