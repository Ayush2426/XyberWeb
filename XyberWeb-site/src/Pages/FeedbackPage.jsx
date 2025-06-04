// App.js
import React, { useState, useEffect, createContext } from 'react';
import { Sun, Moon, Laptop, Menu, X, Star, Send } from 'lucide-react'; // Added new icons
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
        { path: "/authentication", label: "Register" } // Combined auth page
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

// HomePage, WorkshopsPage, GalleryPage (Kept for completeness, not rendered by default)
const HomePage = () => ( /* ... content as before ... */ <PageSection title="Welcome" pageClass="home-page"><p>Home Page Content...</p></PageSection>);
const WorkshopsPage = () => ( /* ... content as before ... */ <PageSection title="Workshops" pageClass="workshops-page"><p>Workshops Page Content...</p></PageSection>);
const GalleryPage = () => ( /* ... content as before ... */ <PageSection title="Gallery" pageClass="gallery-page"><p>Gallery Page Content...</p></PageSection>);


// FeedbackPage Component
const FeedbackPage = () => {
    const [formData, setFormData] = useState({
        workshopName: '',
        rating: '',
        likes: '',
        improvements: '',
        name: '', // Optional
        email: '' // Optional
    });
    const [submitted, setSubmitted] = useState(false);
    const [showAnonymousTip, setShowAnonymousTip] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (newRating) => {
        setFormData(prev => ({ ...prev, rating: newRating }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic validation (rating is good to have)
        if (!formData.rating) {
            // In a real app, use a more user-friendly notification
            alert('Please provide a rating for the workshop experience.');
            return;
        }
        console.log('Feedback Submitted:', formData);
        setSubmitted(true);
        // Optionally reset form after submission
        // setTimeout(() => {
        //   setFormData({ workshopName: '', rating: '', likes: '', improvements: '', name: '', email: '' });
        //   setSubmitted(false);
        // }, 5000);
    };

    if (submitted) {
        return (
            <PageSection title="Thank You!" pageClass="feedback-page">
                <div className="feedback-thankyou-message">
                    <Send size={48} className="feedback-thankyou-icon" />
                    <h2>Your Feedback is Valuable!</h2>
                    <p>Thank you for taking the time to share your thoughts. We'll use your feedback to improve our future workshops.</p>
                </div>
            </PageSection>
        );
    }

    return (
        <PageSection title="Share Your Feedback" pageClass="feedback-page">
            <p className="feedback-intro">
                We value your opinion! Your feedback helps us improve our workshops and create better learning experiences.
                This form is designed to be short and respects your privacy.
            </p>

            {showAnonymousTip && (
                <div className="feedback-anonymous-tip">
                    <p><strong>Tip:</strong> Filling out your name and email is optional if you wish to remain anonymous.</p>
                    <button onClick={() => setShowAnonymousTip(false)} className="feedback-anonymous-tip-dismiss">&times;</button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                    <label htmlFor="workshopName" className="form-label">Which workshop did you attend? (Optional)</label>
                    <input
                        type="text"
                        id="workshopName"
                        name="workshopName"
                        value={formData.workshopName}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., Python Programming, Cyber Security Essentials"
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Overall, how would you rate your workshop experience?</label>
                    <div className="rating-scale">
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <button
                                type="button"
                                key={rate}
                                className={`rating-star ${formData.rating >= rate ? 'selected' : ''}`}
                                onClick={() => handleRatingChange(rate)}
                                aria-label={`Rate ${rate} out of 5 stars`}
                            >
                                <Star size={28} />
                            </button>
                        ))}
                    </div>
                    {formData.rating && <p className="rating-feedback-text">You rated: {formData.rating} out of 5</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="likes" className="form-label">What did you like most about the workshop?</label>
                    <textarea
                        id="likes"
                        name="likes"
                        rows="4"
                        value={formData.likes}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Specific topics, teaching style, hands-on activities, etc."
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="improvements" className="form-label">What could be improved for future workshops?</label>
                    <textarea
                        id="improvements"
                        name="improvements"
                        rows="4"
                        value={formData.improvements}
                        onChange={handleChange}
                        className="form-textarea"
                        placeholder="Suggestions on content, pace, materials, duration, etc."
                    ></textarea>
                </div>

                <h3 className="form-section-title">Optional Information</h3>
                <p className="form-optional-intro">Providing your name and email is optional. This information helps us follow up if needed, but you can submit anonymously.</p>

                <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name (Optional)</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Your Email (Optional)</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="you@example.com"
                    />
                </div>

                <button type="submit" className="submit-button">
                    <Send size={18} style={{ marginRight: '8px' }} /> Submit Feedback
                </button>
            </form>
        </PageSection>
    );
};


// Main App Component
export default function Feedback() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'system';
    });
    const [activePage, setActivePage] = useState('Feedback'); // Set current page

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
            default:
                return <FeedbackPage />;
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
