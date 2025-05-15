import React, { useState, useEffect, createContext } from 'react';
import { Sun, Moon, Laptop, Menu, X, Phone, Mail, MapPin, Send, Instagram, Linkedin, ChevronDown, ChevronUp } from 'lucide-react'; 
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
        { path: "/", label: "Home" }, // Assuming Home is at the root
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
                        aria-label="Open main menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-items">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                className={`mobile-navbar-link ${activePage === item ? 'mobile-navbar-link-active' : ''}`}
                            >
                                {item}
                            </button>
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

// HomePage, WorkshopsPage, GalleryPage, FeedbackPage (Kept for completeness)
const HomePage = () => (<PageSection title="Welcome" pageClass="home-page"><p>Home Page Content...</p></PageSection>);
const WorkshopsPage = () => (<PageSection title="Workshops" pageClass="workshops-page"><p>Workshops Page Content...</p></PageSection>);
const GalleryPage = () => (<PageSection title="Gallery" pageClass="gallery-page"><p>Gallery Page Content...</p></PageSection>);
const FeedbackPage = () => (<PageSection title="Feedback" pageClass="feedback-page"><p>Feedback Page Content...</p></PageSection>);

// ContactPage Component
const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all fields of the contact form.'); // User-friendly notification needed
            return;
        }
        console.log('Contact Form Submitted:', formData);
        setFormSubmitted(true);
        // Optionally reset form
        // setTimeout(() => {
        //   setFormData({ name: '', email: '', message: '' });
        //   setFormSubmitted(false);
        // }, 5000);
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const faqs = [
        { q: "What kind of workshops do you offer?", a: "We offer a variety of tech workshops for +2 students, including Python Programming, Web Development, Cybersecurity Essentials, Data Visualization with Power BI, Robotics, and AI concepts." },
        { q: "Who can attend these workshops?", a: "Our workshops are primarily designed for students in classes 11 and 12 (+2 level). Some workshops may have specific prerequisites, which will be mentioned in the workshop details." },
        { q: "How can I register for a workshop?", a: "You can register for upcoming workshops through the 'Register' link in our navigation bar. Details for each workshop, including registration links, will be available on the 'Workshops' page." },
        { q: "Are the workshops online or offline?", a: "Currently, most of our workshops are conducted offline in Patna, Bihar, to provide a hands-on learning experience. We may offer online sessions in the future." },
        { q: "Is there a fee for attending workshops?", a: "Some workshops may have a nominal fee to cover materials and resources, while others might be free. Please check the specific workshop details for fee information." }
    ];

    return (
        <PageSection title="Get In Touch" pageClass="contact-page">
            <br />
            <p className="contact-intro">
                We're here to answer your questions, discuss collaborations, or just chat about tech! Reach out to us through any of the channels below, or use our contact form.
            </p>

            <div className="contact-grid">
                {/* Column 1: Contact Info & Social Media */}
                <div className="contact-info-column">
                    <div className="contact-details-section">
                        <h2 className="contact-section-title">Contact Information</h2>
                        <div className="contact-detail-item">
                            <MapPin size={24} className="contact-detail-icon" />
                            <div>
                                <strong>Address:</strong>
                                <p>Tech Hub - XyberWeb Patna, Boring Road<br />Patna, Bihar, 800001, India</p>
                            </div>
                        </div>
                        <div className="contact-detail-item">
                            <Mail size={24} className="contact-detail-icon" />
                            <div>
                                <strong>Email:</strong>
                                <p><a href="mailto:info@studenttechpatna.com" className="contact-link">contact@xyberweb.com</a></p>
                            </div>
                        </div>
                        <div className="contact-detail-item">
                            <Phone size={24} className="contact-detail-icon" />
                            <div>
                                <strong>Phone:</strong>
                                <p><a href="tel:+911234567890" className="contact-link">+91 9142315603</a></p>
                            </div>
                        </div>
                    </div>

                    <div className="contact-social-media-section">
                        <h2 className="contact-section-title">Connect With Us</h2>
                        <div className="social-media-links">
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-media-link instagram">
                                <Instagram size={28} /> <span>Instagram</span>
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-media-link linkedin">
                                <Linkedin size={28} /> <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Column 2: Contact Form */}
                <div className="contact-form-column">
                    <h2 className="contact-section-title">Send Us a Message</h2>
                    {formSubmitted ? (
                        <div className="contact-form-thankyou">
                            <Send size={40} />
                            <h3>Message Sent!</h3>
                            <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleFormSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="contactName" className="form-label">Your Name</label>
                                <input type="text" id="contactName" name="name" value={formData.name} onChange={handleFormChange} className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contactEmail" className="form-label">Your Email</label>
                                <input type="email" id="contactEmail" name="email" value={formData.email} onChange={handleFormChange} className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contactMessage" className="form-label">Your Message</label>
                                <textarea id="contactMessage" name="message" rows="5" value={formData.message} onChange={handleFormChange} className="form-textarea" required></textarea>
                            </div>
                            <button type="submit" className="submit-button contact-submit-button">
                                <Send size={18} style={{ marginRight: '8px' }} /> Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* FAQ Section */}
            <div className="faq-section">
                <h2 className="contact-section-title faq-main-title">Frequently Asked Questions</h2>
                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button className="faq-question" onClick={() => toggleFaq(index)} aria-expanded={openFaq === index}>
                                <span>{faq.q}</span>
                                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </button>
                            {openFaq === index && (
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </PageSection>
    );
};


// Main App Component
export default function Contact() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'system';
    });
    const [activePage, setActivePage] = useState('Contact'); // Set current page

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
            default:
                return <ContactPage />;
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
