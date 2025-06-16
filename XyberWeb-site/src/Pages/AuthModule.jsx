// App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Sun, Moon, Laptop, Menu, X, UserPlus } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link, NavLink, Navigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// --- Theme Context ---
const ThemeContext = createContext();

// Helper function to apply theme
const applyTheme = (theme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        root.classList.add(systemTheme);
    } else {
        root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
};

// --- Navbar Component (MODIFIED to use corrected paths) ---
const Navbar = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Using paths for NavLink 'to' prop
    const navLinks = [
        { path: "/", label: "Home" },
        { path: "/workshops", label: "Workshops" },
        { path: "/gallery", label: "Gallery" },
        { path: "/blog", label: "Blog" },
        { path: "/feedback", label: "Feedback" },
        { path: "/contact", label: "Contact" },
        { path: "/about", label: "About" },
        { path: "/authentication", label: "Register" } // Corrected path
    ];

    const ThemeButton = ({ mode, Icon }) => (
        <button
            onClick={() => setTheme(mode)}
            className={`theme-button ${theme === mode ? 'active' : ''}`}
            aria-label={`Switch to ${mode} mode`}
        >
            <Icon size={20} />
        </button>
    );

    useEffect(() => {
        document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMobileMenuOpen]);

    const handleMobileLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-brand-container">
                    <Link to="/" className="navbar-brand" onClick={handleMobileLinkClick}>XyberWeb</Link>
                </div>
                <div className="navbar-links">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.label}
                            to={link.path}
                            className={({ isActive }) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}
                            end={link.path === "/"} // 'end' prop for precise matching of root path
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
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="mobile-menu-button">
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-items">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.label}
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

// --- PageSection Component ---
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

// --- Page Components (Placeholders for routing) ---
const HomePage = () => (<PageSection title="Welcome to XyberWeb"><p>This is the Home Page. Content will be added here.</p></PageSection>);
const WorkshopsPage = () => (<PageSection title="Our Workshops"><p>Detailed information about our workshops will be available here soon. Stay tuned!</p></PageSection>);
const GalleryPage = () => (<PageSection title="Gallery"><p>Gallery coming soon!</p></PageSection>);
const BlogPage = () => (<PageSection title="Blog"><p>Blog posts coming soon!</p></PageSection>);
const FeedbackPage = () => (<PageSection title="Feedback"><p>Feedback form coming soon!</p></PageSection>);
const ContactPage = () => (<PageSection title="Contact Us"><p>Contact information coming soon!</p></PageSection>);
const AboutPage = () => (<PageSection title="About XyberWeb"><p>More about us coming soon!</p></PageSection>);


// --- RegisterPage Component ---
// --- RegisterPage Component ---
const RegisterPage = () => {
    const [registerName, setRegisterName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [workshopInterested, setWorkshopInterested] = useState([]);
    const [contactNumber, setContactNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const workshopOptions = [
        "Cyber Security Essentials", "Power BI (Data Visualization)", "Generative AI & Agentic AI",
        "Machine Learning & Robotics", "Python Programming", "Google Dorking (Advanced Search)",
        "Prompt Engineering", "Web Development", "App Development",
    ];

    const handleWorkshopChange = (workshop) => {
        setWorkshopInterested(prevSelected =>
            prevSelected.includes(workshop)
                ? prevSelected.filter(item => item !== workshop)
                : [...prevSelected, workshop]
        );
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        // VALIDATION: Check all fields, including if at least one workshop is selected.
        if (!registerName || !registerEmail || !contactNumber || workshopInterested.length === 0) {
            toast.error("Please fill all fields and select at least one workshop.");
            return; // Stop the submission if validation fails
        }

        setIsSubmitting(true);

        const submissionPromise = new Promise(resolve => setTimeout(resolve, 2000));

        toast.promise(
            submissionPromise,
            {
                pending: 'Submitting your registration...',
                success: 'Thanks for registering! We will get back to you soon.',
                error: 'Something went wrong, please try again.'
            }
        );

        e.target.submit();
    };

    const handleIframeLoad = () => {
        if (isSubmitting) {
            setTimeout(() => {
                setRegisterName('');
                setRegisterEmail('');
                setContactNumber('');
                setWorkshopInterested([]);
                setIsSubmitting(false);
            }, 500);
        }
    };

    return (
        <PageSection title="Register yourself to grab a slot!" pageClass="register-login-page">
            <div className="auth-form-container">
                <form
                    method="post"
                    action="https://script.google.com/macros/s/AKfycbxZRVilxS7EMZu6FeSj87Gm7OkxDSTX6x2LYmOqwKdQyXoOXIseIMf0A6ckHs52Tlk_/exec"
                    className="auth-form"
                    target="hidden_iframe"
                    onSubmit={handleRegisterSubmit}
                >
                    <p className="auth-form-intro">New here? Register for workshops to enhance your skills.</p>
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
                        <input name='candidateContact' type='text' id="ContactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Preferred Workshops</label>
                        <div className="checkbox-group">
                            {workshopOptions.map((workshop, index) => (
                                <label key={index} className="checkbox-container">
                                    {workshop}
                                    <input
                                        type="checkbox"
                                        checked={workshopInterested.includes(workshop)}
                                        onChange={() => handleWorkshopChange(workshop)}
                                    />
                                    <span className="custom-checkbox"></span>
                                </label>
                            ))}
                        </div>
                        <input type="hidden" name="preferredWorkshop" value={workshopInterested.join(', ')} />
                    </div>
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : <><UserPlus size={18} /> Register</>}
                    </button>
                </form>
                <iframe name="hidden_iframe" onLoad={handleIframeLoad} style={{ display: 'none' }} title="Hidden iframe for form submission" />
            </div>
            <div className="auth-info-section">
                <h3 className="auth-info-title">Workshop Registration Information</h3>
                <p>Registering allows you to sign up for workshops, view history, and receive updates.</p>
                <p>For offline registration, please use the details on our Contact page.</p>
                <p><strong>Schedules & Fees:</strong> Please visit the 'Workshops' page.</p>
            </div>
        </PageSection>
    );
};


// --- Main App Component (MODIFIED to use correct routes) ---
export default function AuthModule() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
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

    // Dynamically inject the react-toastify CSS to avoid build errors.
    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.min.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Cleanup function to remove the link when the component unmounts
        return () => {
            document.head.removeChild(link);
        };
    }, []); // The empty dependency array ensures this effect runs only once.

    const renderPage = () => {
        switch (activePage) {
            case 'Home': return <HomePage />;
            case 'Workshops': return <WorkshopsPage />;
            case 'Gallery': return <GalleryPage />;
            case 'Feedback': return <FeedbackPage />;
            case 'Contact': return <ContactPage />;
            case 'About': return <AboutPage />;
            case 'Register': return <RegisterPage />;
            default: return <RegisterPage />;
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className="app-container">
                <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} />
                <Navbar currentTheme={theme} setTheme={setTheme} activePage={activePage} setActivePage={setActivePage} />
                <main className="main-content">
                    {renderPage()}
                </main>
                <footer className="footer">
                    <p className="footer-text">&copy; {new Date().getFullYear()} XyberWeb-Patna. All rights reserved.</p>
                    <p className="footer-subtext">Empowering Bihar's Future Tech Leaders.</p>
                </footer>
            </div>
        </ThemeContext.Provider>
    );
}