// App.js
import React, { useState, useEffect, createContext } from 'react';
import { Sun, Moon, Laptop, Menu, X, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';

// Theme Context
const ThemeContext = createContext();

// Helper function to apply theme
const applyTheme = (theme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
        localStorage.setItem('theme', 'system');
    } else {
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }
};

// Navbar Component
const Navbar = ({ currentTheme, setTheme, activePage }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // const navItems = ['Home', 'Workshops', 'Gallery', 'Blog', 'Feedback', 'Contact', 'About', 'Register'];
    const navLinks = [
        { path: "/home/*", label: "Home" }, // Assuming Home is at the root
        { path: "/workshops", label: "Workshops" },
        { path: "/gallery", label: "Gallery" },
        { path: "/blog", label: "Blog" },
        { path: "/feedback", label: "Feedback" },
        { path: "/contact", label: "Contact" },
        { path: "/about", label: "About" },
        { path: "/authentication", label: "Register/Login" } // Combined auth page
    ];
    const ThemeButton = ({ mode, Icon }) => (
        <button
            onClick={() => setTheme(mode)}
            className={`theme-button ${currentTheme === mode ? 'active' : ''}`}
            aria-label={`Switch to ${mode} mode`}
        >
            <Icon size={20} />
        </button>
    );

        // Effect to handle body scroll when mobile menu is open/closed
        useEffect(() => {
            if (isMobileMenuOpen) {
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                document.body.style.overflow = 'unset'; // Allow scrolling when menu is closed
            }
            // Cleanup function to reset overflow if the component unmounts while menu is open
            return () => {
                document.body.style.overflow = 'unset';
            };
        }, [isMobileMenuOpen]);
    
        const handleMobileLinkClick = () => {
            setIsMobileMenuOpen(false); // Close mobile menu on link click
        };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-brand-container">
                    <Link to="/" className="navbar-brand" onClick={""}>XyberWeb</Link>
                </div>
                <div className="navbar-links">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}
                            end // Use 'end' for the Home link if it's at the root path "/"
                        >
                            {link.label}
                        </NavLink>
                    ))} 
                    <div className="theme-switcher">
                        <ThemeButton mode="light" Icon={Sun} />
                        <ThemeButton mode="dark" Icon={Moon} />
                        <ThemeButton mode="system" Icon={Laptop} />
                    </div>
                </div>
                {/* Mobile Menu Button */}
                <div className="mobile-menu-button-container"> {/* CSS: Hide on desktop, display on mobile */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="mobile-menu-button"
                        aria-label="Toggle main menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-items"> {/* CSS: Padding, alignment for items */}
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => isActive ? "mobile-navbar-link mobile-navbar-link-active" : "mobile-navbar-link"}
                                onClick={handleMobileLinkClick} // Ensures menu closes on navigation
                                end={link.path === "/"}
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <div className="mobile-theme-switcher">
                            <ThemeButton mode="light" Icon={Sun} />
                            <ThemeButton mode="dark" Icon={Moon} />
                            <ThemeButton mode="system" Icon={Laptop} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

// PageSection Component: Wrapper for consistent page styling
const PageSection = ({ title, children, pageClass = "" }) => (
    <section className={`page-section ${pageClass}`}>
        <div className="page-section-container">
            {title && <h1 className="page-title">{title}</h1>}
            <div className={`page-content-wrapper ${pageClass ? pageClass + "-content-wrapper" : ""}`}>
                {children}
            </div>
        </div>
    </section>
);

// Other Page Components (Kept for completeness)
const HomePage = () => (<PageSection title="Welcome" pageClass="home-page"><p>Home Page Content...</p></PageSection>);
const WorkshopsPage = () => (<PageSection title="Workshops" pageClass="workshops-page"><p>Workshops Page Content...</p></PageSection>);
const GalleryPage = () => (<PageSection title="Gallery" pageClass="gallery-page"><p>Gallery Page Content...</p></PageSection>);
const FeedbackPage = () => (<PageSection title="Feedback" pageClass="feedback-page"><p>Feedback Page Content...</p></PageSection>);
const ContactPage = () => (<PageSection title="Contact Us" pageClass="contact-page"><p>Contact Page Content...</p></PageSection>);
const AboutPage = () => (<PageSection title="About Us" pageClass="about-page"><p>About Page Content...</p></PageSection>);

// RegisterPage Component (Login & Register)
const RegisterPage = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    // Login State
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [showLoginPassword, setShowLoginPassword] = useState(false);

    // Register State
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!loginEmail || !loginPassword) {
            alert('Please enter both email and password to login.');
            return;
        }
        console.log('Login attempt:', { email: loginEmail, password: loginPassword });
        // Add actual login logic here
        alert(`Login attempt with email: ${loginEmail}. Check console for details.`);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        setPasswordMatchError(false);
        if (registerPassword !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }
        // Basic validation
        if (!registerName || !registerEmail || !registerPassword) {
            alert('Please fill in all required fields for registration.');
            return;
        }
        console.log('Register attempt:', { name: registerName, email: registerEmail, password: registerPassword });
        // Add actual registration logic here
        alert(`Registration attempt for ${registerName}. Check console for details.`);
    };

    const PasswordToggle = ({ show, setShow }) => (
        <button type="button" onClick={() => setShow(!show)} className="password-toggle-button" aria-label={show ? "Hide password" : "Show password"}>
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
    );

    return (
        <PageSection title={isLoginView ? "Login to Your Account" : "Create an Account"} pageClass="register-login-page">
            <div className="auth-toggle-buttons">
                <button
                    onClick={() => setIsLoginView(true)}
                    className={`auth-toggle-button ${isLoginView ? 'active' : ''}`}
                >
                    <LogIn size={18} className="auth-toggle-icon" /> Login
                </button>
                <button
                    onClick={() => setIsLoginView(false)}
                    className={`auth-toggle-button ${!isLoginView ? 'active' : ''}`}
                >
                    <UserPlus size={18} className="auth-toggle-icon" /> Register
                </button>
            </div>

            {isLoginView ? (
                // Login Form
                <form onSubmit={handleLoginSubmit} className="auth-form">
                    <p className="auth-form-intro">Welcome back! Access your workshop details and history.</p>
                    <div className="form-group">
                        <label htmlFor="loginEmail" className="form-label">Email Address</label>
                        <input type="email" id="loginEmail" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <div className="password-input-container">
                            <input type={showLoginPassword ? "text" : "password"} id="loginPassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="form-input" required />
                            <PasswordToggle show={showLoginPassword} setShow={setShowLoginPassword} />
                        </div>
                    </div>
                    <button type="submit" className="submit-button auth-submit-button">
                        <LogIn size={18} style={{ marginRight: '8px' }} /> Login
                    </button>
                </form>
            ) : (
                // Register Form
                <form onSubmit={handleRegisterSubmit} className="auth-form">
                    <p className="auth-form-intro">New here? Create an account to register for workshops and manage your profile.</p>
                    <div className="form-group">
                        <label htmlFor="registerName" className="form-label">Full Name</label>
                        <input type="text" id="registerName" value={registerName} onChange={(e) => setRegisterName(e.target.value)} className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerEmail" className="form-label">Email Address</label>
                        <input type="email" id="registerEmail" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="registerPassword" className="form-label">Password</label>
                        <div className="password-input-container">
                            <input type={showRegisterPassword ? "text" : "password"} id="registerPassword" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} className="form-input" required />
                            <PasswordToggle show={showRegisterPassword} setShow={setShowRegisterPassword} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <div className="password-input-container">
                            <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-input" required />
                            <PasswordToggle show={showConfirmPassword} setShow={setShowConfirmPassword} />
                        </div>
                        {passwordMatchError && <p className="form-error-message">Passwords do not match!</p>}
                    </div>
                    <button type="submit" className="submit-button auth-submit-button register-button-color">
                        <UserPlus size={18} style={{ marginRight: '8px' }} /> Register
                    </button>
                </form>
            )}
            <div className="auth-info-section">
                <h3 className="auth-info-title">Workshop Registration Information</h3>
                <p>Registering an account will allow you to sign up for upcoming workshops, view your registration history, and receive updates. </p>
                <p>For offline registration or immediate assistance, please contact us via phone or email available on our Contact page.</p>
                <p><strong>Current Workshop Schedules & Fees:</strong> Please visit the 'Workshops' page for the latest information.</p>
            </div>
        </PageSection>
    );
};


// Main App Component
export default function AuthModule() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'system';
    });
    const [activePage, setActivePage] = useState('Register'); // Set current page

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (localStorage.getItem('theme') === 'system') {
                applyTheme('system');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const renderPage = () => {
        switch (activePage) {
            case 'Home':
                return <HomePage />;
            case 'Workshops':
                return <WorkshopsPage />;
            case 'Gallery':
                return <GalleryPage />;
            case 'Feedback':
                return <FeedbackPage />;
            case 'Contact':
                return <ContactPage />;
            case 'About':
                return <AboutPage />;
            case 'Register':
                return <RegisterPage />;
            default:
                return <RegisterPage />;
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className="app-container">
                <Navbar currentTheme={theme} setTheme={setTheme} activePage={activePage} />
                <main className="main-content">
                    {renderPage()}
                </main>
                <footer className="footer">
                    <p className="footer-text">
                        © {new Date().getFullYear()} © XyberWeb-Patna@2025. All rights reserved.
                    </p>
                    <p className="footer-subtext">
                        Empowering Bihar's Future Tech Leaders.
                    </p>
                </footer>
            </div>
        </ThemeContext.Provider>
    );
}
