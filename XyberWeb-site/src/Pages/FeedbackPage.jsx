// App.js
import React, { useState, useEffect, createContext } from 'react';
import { Sun, Moon, Laptop, Menu, X, Star, Send } from 'lucide-react'; // Added new icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

// Navbar Component (remains as provided by user)
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
        { path: "/authentication", label: "Register/Login" }
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
                            className={({ isActive }) => {
                                // Retaining user's logic for activePage if they intend to use it alongside NavLink's isActive
                                const isActuallyActive = activePage === link.label || isActive;
                                return isActuallyActive ? "navbar-link navbar-link-active" : "navbar-link";
                            }}
                            end={link.path === "/home/*" || link.path === "/"}
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
                                className={({ isActive }) => {
                                    const isActuallyActive = activePage === link.label || isActive;
                                    return isActuallyActive ? "mobile-navbar-link mobile-navbar-link-active" : "mobile-navbar-link";
                                }}
                                onClick={handleMobileLinkClick}
                                end={link.path === "/home/*" || link.path === "/"}
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

// PageSection Component (remains as provided by user)
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

// HomePage, WorkshopsPage, GalleryPage, etc. (remains as provided by user)
const HomePage = () => (<PageSection title="Welcome" pageClass="home-page"><p>Home Page Content...</p></PageSection>);
const WorkshopsPage = () => (<PageSection title="Workshops" pageClass="workshops-page"><p>Workshops Page Content...</p></PageSection>);
const GalleryPage = () => (<PageSection title="Gallery" pageClass="gallery-page"><p>Gallery Page Content...</p></PageSection>);
const BlogPage = () => (<PageSection title="Blog" pageClass="blog-page"><p>Our latest articles and insights. (Content coming soon!)</p></PageSection>);
const ContactPage = () => (<PageSection title="Contact Us" pageClass="contact-page"><p>Contact Page Content...</p></PageSection>);
const AboutPage = () => (<PageSection title="About Us" pageClass="about-page"><p>About Page Content...</p></PageSection>);
const RegisterPage = () => (<PageSection title="Register" pageClass="register-page"><p>Registration form will be here.</p></PageSection>);


// FeedbackPage Component (MODIFIED)
const FeedbackPage = () => {
    const [formData, setFormData] = useState({
        workshopName: '',
        rating: '',      // Will store the number of stars
        likes: '',
        improvements: '',
        name: '',
        email: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [showAnonymousTip, setShowAnonymousTip] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false); // Added for loading state

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (newRating) => {
        setFormData(prev => ({ ...prev, rating: newRating.toString() })); // Store rating as string for FormData
    };

    // MODIFIED handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default HTML form submission

        // Validation
        if (!formData.rating && !formData.likes.trim() && !formData.improvements.trim()) {
            toast.error('Please provide a rating or some feedback details to submit.');
            return;
        }
        if (!formData.workshopName.trim()) { // Making workshop name required for this example
            toast.error('Please specify which workshop you attended.');
            return;
        }
        if (!formData.rating) { // Ensure rating is given
            toast.error('Please provide a rating for the workshop experience.');
            return;
        }


        setIsSubmitting(true);
        const scriptURL = "https://script.google.com/macros/s/AKfycbxWtOzhmXrduF2diYcMtcGsUD7loVJqYLxhqlI0t6988-ViX5_EnQoPDgyNBquOxMW7/exec"; // User's provided URL
        const dataToSubmit = new FormData();
        dataToSubmit.append('workshopName', formData.workshopName);
        dataToSubmit.append('rating', formData.rating);
        dataToSubmit.append('likes', formData.likes);
        dataToSubmit.append('improvements', formData.improvements);
        dataToSubmit.append('name', formData.name);
        dataToSubmit.append('email', formData.email);

        try {
            const response = await fetch(scriptURL, { method: 'POST', body: dataToSubmit });
            // Google Apps Script with ContentService often returns text/plain for simple string responses,
            // or application/json if explicitly set. We need to handle both.
            const contentType = response.headers.get("content-type");
            let result;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await response.json();
            } else {
                const textResult = await response.text();
                // Try to parse as JSON, if it fails, use the text as a generic success/error.
                try {
                    result = JSON.parse(textResult);
                } catch (parseError) {
                    // If it's not JSON, and response was ok, assume success. Otherwise, it's an error.
                    if (response.ok) {
                        result = { status: "success", message: "Feedback submitted! (Non-JSON response)" };
                    } else {
                        result = { status: "error", message: textResult || "An unknown error occurred." };
                    }
                }
            }


            if (result.status === "success") {
                toast.success(result.message || "Feedback sent successfully! Thank you.");
                setSubmitted(true); // Show the thank you message/UI
                // Clear form
                setFormData({ workshopName: '', rating: '', likes: '', improvements: '', name: '', email: '' });
                setShowAnonymousTip(true);
            } else {
                toast.error(result.message || "Failed to send feedback. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("An error occurred while sending feedback. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <PageSection title="Thank You!" pageClass="feedback-page">
                <div className="feedback-thankyou-message">
                    <Send size={48} className="feedback-thankyou-icon" />
                    <h2>Your Feedback is Valuable!</h2>
                    <p>Thank you for taking the time to share your thoughts. We'll use your feedback to improve our future workshops.</p>
                    <button onClick={() => setSubmitted(false)} className="submit-button" style={{ marginTop: '20px' }}>Submit Another Feedback</button>
                </div>
            </PageSection>
        );
    }

    // Removed unused checkFeedbackValidation function

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

            {/* MODIFIED: Removed action/method attributes, form onSubmit now calls the new handleSubmit */}
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                    <label htmlFor="workshopName" className="form-label">Which workshop did you attend?</label> {/* Made it required for this example */}
                    <input
                        type="text"
                        id="workshopName"
                        name="workshopName"
                        value={formData.workshopName}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., Python Programming, Cyber Security Essentials"
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Overall, how would you rate your workshop experience?</label>
                    <div className="rating-scale">
                        {[1, 2, 3, 4, 5].map((rate) => (
                            <button
                                type="button" // Important: type="button" to prevent form submission on click
                                key={rate}
                                className={`rating-star ${parseInt(formData.rating) >= rate ? 'selected' : ''}`}
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
                    // Removed 'required' to allow submission if only rating is given, based on validation logic
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
                    // Removed 'required'
                    ></textarea>
                </div>

                <h3 className="form-section-title">Optional Information</h3>
                <p className="form-optional-intro">Providing your name and email is optional. This information helps us follow up if needed, but you can submit anonymously.</p>

                <div className="form-group">
                    <label htmlFor="name" className="form-label">Your Name</label>
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

                {/* MODIFIED: Button type is submit, disabled state added, removed its own onSubmit */}
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : (
                        <>
                            <Send size={18} style={{ marginRight: '8px' }} /> Submit Feedback
                        </>
                    )}
                </button>
                {/* ToastContainer moved to main Feedback component */}
            </form>
        </PageSection>
    );
};


// Main App Component (as provided by user, renamed to Feedback for export default)
export default function Feedback() { // Renamed from AuthModule to Feedback to match user's file structure
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'system';
    });
    const [activePage, setActivePage] = useState('Feedback');

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
            case 'Home': return <HomePage />;
            case 'Workshops': return <WorkshopsPage />;
            case 'Gallery': return <GalleryPage />;
            case 'Blog': return <BlogPage />;
            case 'Feedback': return <FeedbackPage />;
            case 'Contact': return <ContactPage />;
            case 'About': return <AboutPage />;
            case 'Register': return <RegisterPage />;
            default: return <FeedbackPage />;
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
                {/* MODIFIED: ToastContainer moved here */}
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme={theme === 'dark' ? 'dark' : 'light'}
                />
                <div className="app-container">
                    <Navbar currentTheme={theme} setTheme={setTheme} activePage={activePage} />
                    <main className="main-content">
                        {renderPage()}
                    </main>
                    <footer className="footer">
                        <p className="footer-text">
                            &copy; {new Date().getFullYear()} © XyberWeb-Patna@2025. All rights reserved.
                        </p>
                        <p className="footer-subtext">
                            Empowering Bihar's Future Tech Leaders.
                        </p>
                    </footer>
                </div>
        </ThemeContext.Provider>
    );
}
