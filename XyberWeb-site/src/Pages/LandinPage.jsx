// App.js
import React, { useState, useEffect, createContext } from 'react';
import { Sun, Moon, Laptop, Menu, X } from 'lucide-react';
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
const Navbar = ({ currentTheme, setTheme }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    // Navigation items are for display only
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
            // The 'active' class will be handled by CSS based on currentTheme
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
            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="mobile-menu">
                    <div className="mobile-menu-items">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                className="mobile-navbar-link"
                            // onClick is removed
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
const PageSection = ({ title, children }) => (
    <section className="page-section">
        <div className="page-section-container">
            <h1 className="page-title">{title}</h1>
            <div className="page-content-wrapper">
                {children}
            </div>
        </div>
    </section>
);

// HomePage Component: Remains detailed
const HomePage = () => (
    <PageSection title="Welcome to Student Tech Workshops - XyberWeb">
        {/* Hero Section */}
        <div className="hero-section">
            <h2 className="hero-title">Ignite Your Tech Future</h2>
            <p className="hero-subtitle">Empowering +2 students in Patna with cutting-edge tech skills for a brighter tomorrow.</p>
            <Link to="/workshops" >
                <button
                    className="hero-button"
                // onClick functionality for navigation can be added later if needed
                >
                    Explore Workshops
                </button>
            </Link>
        </div>

        {/* Mission Highlight */}
        <div className="mission-highlight">
            <h3 className="mission-title">Our Mission</h3>
            <p className="mission-text">
                We are a passionate team dedicated to bridging the technology gap for students in Patna. Our mission is to provide accessible, high-quality tech workshops that equip +2 students with practical skills in emerging fields, fostering innovation and preparing them for future academic and career success.
            </p>
        </div>

        {/* Key Offerings */}
        <div className="offerings-section">
            <h3 className="offerings-title">Key Offerings</h3>
            <div className="offerings-grid">
                <div className="offering-card">
                    <h4 className="offering-card-title offering-card-title-blue">Coding & Robotics</h4>
                    <p className="offering-card-text">Dive into the world of programming and build your own robots. Learn Python, C++, and more.</p>
                </div>
                <div className="offering-card">
                    <h4 className="offering-card-title offering-card-title-green">Data & Analytics</h4>
                    <p className="offering-card-text">Understand the power of data. Explore data science, machine learning, and visualization.</p>
                </div>
                <div className="offering-card">
                    <h4 className="offering-card-title offering-card-title-purple">Cyber Safety</h4>
                    <p className="offering-card-text">Navigate the digital world securely. Learn about cybersecurity essentials and ethical hacking.</p>
                </div>
            </div>
        </div>

        {/* Trust Signals */}
        <div className="trust-signals-section">
            <h3 className="trust-signals-title">Building Trust</h3>
            <div className="trust-signals-flex">
                <div className="trust-signal-item trust-signal-item-blue">
                    <p className="trust-signal-stat trust-signal-stat-blue">100+</p>
                    <p className="trust-signal-label">Students Trained</p>
                </div>
                <div className="trust-signal-item trust-signal-item-green">
                    <p className="trust-signal-stat trust-signal-stat-green">5+</p>
                    <p className="trust-signal-label">Workshops Conducted</p>
                </div>
            </div>
        </div>
    </PageSection>
);

// Simplified Page Components (Placeholders - not navigable via navbar)
const WorkshopsPage = () => (
    <PageSection title="Our Workshops">
        <p className="placeholder-text">
            Detailed information about our workshops will be available here soon. Stay tuned!
        </p>
    </PageSection>
);

// ... other simplified page components would go here if needed for routing,
// but since navbar is not clickable, only HomePage is effectively rendered.

// Main App Component
export default function LandingPage() {
    // const [currentPage, setCurrentPage] = useState('Home'); // No longer needed for page switching via navbar
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'system';
    });

    useEffect(() => {
        applyTheme(theme);
    }, [theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (localStorage.getItem('theme') === 'system') { // Check if user still prefers system
                applyTheme('system');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []); // Empty dependency array, runs once

    // Since navbar items are not clickable for navigation, we always render HomePage.
    // If routing is added later, this section will change.
    const renderPage = () => {
        return <HomePage />;
        // Example for future routing:
        // switch (currentPage) {
        //   case 'Home': return <HomePage />;
        //   case 'Workshops': return <WorkshopsPage />;
        //   default: return <HomePage />;
        // }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className="app-container">
                <Navbar currentTheme={theme} setTheme={setTheme} />
                <main className="main-content">
                    {renderPage()}
                </main>
                <footer className="footer">
                    <p className="footer-text">
                        &copy; {new Date().getFullYear()}  © XyberWeb-Patna@2025. All rights reserved.
                    </p>
                    <p className="footer-subtext">
                        Empowering Bihar's Future Tech Leaders.
                    </p>
                </footer>
            </div>
        </ThemeContext.Provider>
    );
}
