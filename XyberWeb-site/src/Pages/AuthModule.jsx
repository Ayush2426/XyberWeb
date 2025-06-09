// App.js
import React, { useState, useEffect, createContext } from 'react';
import { Sun, Moon, Laptop, Menu, X, LogIn, UserPlus, Eye, EyeOff } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

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
    const navLinks = [
        { path: "/home/*", label: "Home" },
        { path: "/workshops", label: "Workshops" },
        { path: "/gallery", label: "Gallery" },
        { path: "/blog", label: "Blog" },
        { path: "/feedback", label: "Feedback" },
        { path: "/contact", label: "Contact" },
        { path: "/about", label: "About" },
        { path: "/authentication", label: "Register" }
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

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMobileMenuOpen]);

    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false);
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
                <div className="mobile-menu-button-container">
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
                    <div className="mobile-menu-items">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => isActive ? "mobile-navbar-link mobile-navbar-link-active" : "mobile-navbar-link"}
                                onClick={handleMobileLinkClick}
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
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [WorkshopInterested, setWorkshopInterested] = useState('');
    const [ContactNumber, setContactNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const workshopOptions = [
        "Cyber Security Essentials",
        "Power BI (Data Visualization)",
        "Generative AI & Agentic AI",
        "Machine Learning & Robotics",
        "Python Programming",
        "Google Dorking (Advanced Search)",
        "Prompt Engineering",
        "Web Development",
        "App Development",
    ];

    useEffect(() => {
        if (workshopOptions.length > 0) {
            setWorkshopInterested(workshopOptions[0]);
        }
    }, []);

    const handleRegisterSubmit = (e) => {
        // Validate fields before allowing submission
        if (!registerName || !registerEmail || !ContactNumber || !WorkshopInterested) {
            e.preventDefault(); // Stop the form from submitting if fields are empty
            toast.error("Please fill all the fields before submitting.");
            return;
        }
        // If validation passes, show success toast and set submitting state
        toast.success("Thanks for registering with us! We will get back to you soon.");
        setIsSubmitting(true);
    };

    const handleIframeLoad = () => {
        // This function is called when the iframe finishes loading the response from Google.
        if (isSubmitting) {
            // Wait for 2 seconds after submission completes before clearing the form
            // and re-enabling the button. This gives the user feedback.
            setTimeout(() => {
                // Clear the form fields
                setRegisterName('');
                setRegisterEmail('');
                setContactNumber('');
                if (workshopOptions.length > 0) {
                    setWorkshopInterested(workshopOptions[0]);
                }
                // Reset the submission flag to re-enable the button
                setIsSubmitting(false);
            }, 2000); // 2-second delay
        }
    };

    return (
        <PageSection title={"Register yourself to grab a slot !"} pageClass="register-login-page">
            <div className="auth-toggle-buttons">
                <button
                    onClick={() => setIsLoginView(false)}
                    className={`auth-toggle-button ${!isLoginView ? 'active' : ''}`}
                >
                    <UserPlus size={18} className="auth-toggle-icon" /> Register
                </button>
            </div>

            {/* The form now submits to a hidden iframe to prevent page reload */}
            <form
                method="post"
                action="https://script.google.com/macros/s/AKfycbxZRVilxS7EMZu6FeSj87Gm7OkxDSTX6x2LYmOqwKdQyXoOXIseIMf0A6ckHs52Tlk_/exec"
                className="auth-form"
                target="hidden_iframe"
                onSubmit={handleRegisterSubmit}
            >
                <p className="auth-form-intro">New here? Get yourself registered for workshops and to enhance your skill.</p>
                <div className="form-group">
                    <label htmlFor="registerName" className="form-label">Full Name</label>
                    <input name='candidateName' type="text" id="registerName" value={registerName} onChange={(e) => setRegisterName(e.target.value)} className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="registerEmail" className="form-label">Email Address</label>
                    <input name='candidateMail' type="email" id="registerEmail" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} className="form-input" required />
                </div>
                <div className="form-group">
                    <label htmlFor="ContactNumber" className="form-label">Contact Number</label>
                    <div className="password-input-container">
                        <input name='candidateContact' type='text' id="ContactNumber" value={ContactNumber} onChange={(e) => setContactNumber(e.target.value)} className="form-input" required />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="WorkshopInterested" className="form-label">Preferred Workshop</label>
                    <div className="Workshop-input-container">
                        <select
                            name='preferredWorkshop'
                            id="WorkshopInterested"
                            value={WorkshopInterested}
                            onChange={(e) => setWorkshopInterested(e.target.value)}
                            className="form-input"
                            required
                        >
                            {workshopOptions.map((workshop, index) => (
                                <option key={index} value={workshop}>
                                    {workshop}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="submit" className="submit-button auth-submit-button register-button-color" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : (
                        <>
                            <UserPlus size={18} style={{ marginRight: '8px' }} /> Register
                        </>
                    )}
                </button>
                <ToastContainer />
            </form>

            {/* Hidden iframe to catch the form submission */}
            <iframe
                name="hidden_iframe"
                onLoad={handleIframeLoad}
                style={{ display: 'none' }}
                title="Hidden iframe for form submission"
            />

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
    const [activePage, setActivePage] = useState('Register');

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
                        &copy; {new Date().getFullYear()} © XyberWeb-Patna@2025. All rights res erved.
                    </p>
                    <p className="footer-subtext">
                        Empowering Bihar's Future Tech Leaders.
                    </p>
                </footer>
            </div>
        </ThemeContext.Provider>
    );
}