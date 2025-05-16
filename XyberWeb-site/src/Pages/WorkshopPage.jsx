// App.js
import React, { useState, useEffect, createContext } from 'react';
import { Sun, Moon, Laptop, Menu, X, ShieldCheck, BarChart3, LayoutGrid, CodeXml, BrainCircuit, Bot, Code, SearchCheck, MessageSquareQuote } from 'lucide-react';
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

// Navbar Component (remains the same, non-clickable for navigation)
const Navbar = ({ currentTheme, setTheme }) => {
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

// HomePage Component: (Not rendered by default now, but kept for completeness)
const HomePage = () => (
    <PageSection title="Welcome to Student Tech Workshops (Patna, Bihar)" pageClass="home-page">
        {/* Hero Section */}
        <div className="hero-section">
            <h2 className="hero-title">Ignite Your Tech Future</h2>
            <p className="hero-subtitle">Empowering +2 students in Patna with cutting-edge tech skills for a brighter tomorrow.</p>
            <button className="hero-button">
                Explore Workshops
            </button>
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

// WorkshopsPage Component
const WorkshopsPage = () => {
    const workshops = [
        {
            icon: <ShieldCheck size={40} className="workshop-card-icon" />,
            title: "Cyber Security Essentials",
            description: "Learn how to be a digital detective! Explore online safety, ethical hacking basics, and how to protect your data.",
            colorClass: "workshop-card-blue"
        },
        {
            icon: <BarChart3 size={40} className="workshop-card-icon" />,
            title: "Power BI (Data Visualization)",
            description: "Turn data into colorful charts and dashboards. Work with real data to tell stories with graphs.",
            colorClass: "workshop-card-green"
        },
        {
            icon: <BrainCircuit size={40} className="workshop-card-icon" />,
            title: "Generative AI & Agentic AI",
            description: "Experiment with AI tools that create art and text. Understand how AI 'thinks'.",
            colorClass: "workshop-card-purple"
        },
        {
            icon: <Bot size={40} className="workshop-card-icon" />,
            title: "Machine Learning & Robotics",
            description: "Build and program smart robots. Learn simple AI and hardware programming.",
            colorClass: "workshop-card-red"
        },
        {
            icon: <Code size={40} className="workshop-card-icon" />,
            title: "Python Programming",
            description: "Learn Python by creating games and solving puzzles. Easy syntax and beginner-friendly.",
            colorClass: "workshop-card-yellow"
        },
        {
            icon: <SearchCheck size={40} className="workshop-card-icon" />,
            title: "Google Dorking (Advanced Search)",
            description: "Learn powerful Google search tricks to find public data ethically.",
            colorClass: "workshop-card-indigo"
        },
        {
            icon: <MessageSquareQuote size={40} className="workshop-card-icon" />,
            title: "Prompt Engineering",
            description: "Master the art of writing effective prompts to get better responses from AI tools.",
            colorClass: "workshop-card-pink"
        },
                {
            icon: <CodeXml size={40} className="workshop-card-icon" />,
            title: "Web Development",
            description: "Master the art of writing effective prompts to get better responses from AI tools.",
            colorClass: "workshop-card-brown"
        },
                {
            icon: <LayoutGrid size={40} className="workshop-card-icon" />,
            title: "App Development",
            description: "Master the art of writing effective prompts to get better responses from AI tools.",
            colorClass: "workshop-card-white"
        }
        
    ];

    return (
        <PageSection title="Our Workshops" pageClass="workshops-page">
            <br />
            <p className="workshops-intro">
                Dive into the world of technology with our hands-on workshops designed for +2 students.
                Explore diverse fields, gain practical skills, and ignite your passion for innovation.
            </p>
            <div className="workshops-grid">
                {workshops.map((workshop, index) => (
                    <div key={index} className={`workshop-card ${workshop.colorClass}`}>
                        <div className="workshop-card-icon-container">
                            {workshop.icon}
                        </div>
                        <h3 className="workshop-card-title">{workshop.title}</h3>
                        <p className="workshop-card-description">{workshop.description}</p>
                        <button className="workshop-card-button">Learn More</button>
                    </div>
                ))}
            </div>
        </PageSection>
    );
};


// Main App Component
export default function WorkshopPage() {
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
            if (localStorage.getItem('theme') === 'system') {
                applyTheme('system');
            }
        };
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    // For this request, we are directly rendering WorkshopsPage.
    // If routing is implemented later, this logic will change.
    const renderPage = () => {
        return <WorkshopsPage />;
        // return <HomePage />; // To render HomePage instead
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
