import React, { useState, useEffect, createContext } from 'react';
import { Sun, Moon, Laptop, Menu, X, Image as ImageIcon, Video as VideoIcon, PlayCircle } from 'lucide-react';
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

// HomePage Component: (Not rendered by default now, but kept for completeness)
const HomePage = () => (
    <PageSection title="Welcome to Student Tech Workshops (Patna, Bihar)" pageClass="home-page">
        <div className="hero-section">
            <h2 className="hero-title">Ignite Your Tech Future</h2>
            <p className="hero-subtitle">Empowering +2 students in Patna with cutting-edge tech skills for a brighter tomorrow.</p>
            <button className="hero-button">
                Explore Workshops
            </button>
        </div>
        <div className="mission-highlight">
            <h3 className="mission-title">Our Mission</h3>
            <p className="mission-text">
                We are a passionate team dedicated to bridging the technology gap for students in Patna. Our mission is to provide accessible, high-quality tech workshops that equip +2 students with practical skills in emerging fields, fostering innovation and preparing them for future academic and career success.
            </p>
        </div>
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

// WorkshopsPage Component (Kept for completeness)


// GalleryPage Component
const GalleryPage = () => {
    const galleryItems = [
        { type: 'image', src: 'https://placehold.co/600x400/E2E8F0/4A5568?text=Workshop+Moment+1', alt: 'Students collaborating in a workshop', caption: 'Teamwork makes the dream work! Students deep in discussion during our Python workshop.' },
        { type: 'image', src: 'https://placehold.co/600x400/D1FAE5/065F46?text=Robotics+Project', alt: 'A student showcasing a robotics project', caption: 'Innovation in action: A student presents their line-following robot built with Arduino.' },
        { type: 'video', videoId: 'dQw4w9WgXcQ', thumbnailSrc: 'https://placehold.co/600x400/FEF3C7/92400E?text=Workshop+Highlights+Video', title: 'Workshop Highlights Reel', caption: 'Catch the excitement! A quick look at the engaging moments from our recent tech fest.' },
        { type: 'image', src: 'https://placehold.co/600x400/DBEAFE/1E40AF?text=Cybersecurity+Talk', alt: 'An instructor giving a talk on cybersecurity', caption: 'Expert insights: Our guest speaker shares crucial tips on navigating the digital world safely.' },
        { type: 'image', src: 'https://placehold.co/600x400/FCE7F3/831843?text=AI+Art+Creation', alt: 'Students working with generative AI tools', caption: 'Creativity unleashed! Exploring the fascinating world of AI-generated art.' },
        { type: 'video', videoId: 'rokGy0huYEA', thumbnailSrc: 'https://placehold.co/600x400/E0E7FF/3730A3?text=Student+Testimonial+Video', title: 'Student Testimonial', caption: 'Hear from our students! What they loved about our Data Visualization workshop.' },
    ];

    return (
        <PageSection title="Gallery & Media" pageClass="gallery-page">
            <br />
            <p className="gallery-intro">
                Step into our world of learning and innovation. Browse through moments from our workshops, student projects, and special events.
            </p>
            <div className="gallery-section">
                <h2 className="gallery-section-title">
                    <ImageIcon className="gallery-section-title-icon" /> Screenshot Gallery
                </h2>
                <div className="gallery-grid">
                    {galleryItems.filter(item => item.type === 'image').map((item, index) => (
                        <div key={`img-${index}`} className="gallery-item gallery-item-image">
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="gallery-image"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/4A5568?text=Image+Not+Found"; }}
                            />
                            <div className="gallery-caption-overlay">
                                <p className="gallery-caption">{item.caption}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="gallery-section">
                <h2 className="gallery-section-title">
                    <VideoIcon className="gallery-section-title-icon" /> Embedded Videos
                </h2>
                <div className="gallery-grid gallery-grid-video">
                    {galleryItems.filter(item => item.type === 'video').map((item, index) => (
                        <div key={`vid-${index}`} className="gallery-item gallery-item-video">
                            {/* Basic placeholder for video. For actual embedding, you'd use an iframe or a video player library. */}
                            <a
                                href={`https://www.youtube.com/watch?v=${item.videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="gallery-video-link"
                                aria-label={`Watch video: ${item.title}`}
                            >
                                <img
                                    src={item.thumbnailSrc}
                                    alt={item.title}
                                    className="gallery-video-thumbnail"
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/4A5568?text=Video+Thumb+Error"; }}
                                />
                                <div className="gallery-video-play-icon">
                                    <PlayCircle size={64} />
                                </div>
                                <div className="gallery-caption-overlay gallery-caption-overlay-video">
                                    <h3 className="gallery-video-title">{item.title}</h3>
                                    <p className="gallery-caption">{item.caption}</p>
                                </div>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </PageSection>
    );
};


// Main App Component
export default function Gallery() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'system';
    });
    const [activePage, setActivePage] = useState('Gallery'); // Set current page

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
        // This simple switch can be replaced with a routing library for more complex apps
        switch (activePage) {
            case 'Home':
                return <HomePage />;
            case 'Workshops':
                return <WorkshopsPage />;
            case 'Gallery':
                return <GalleryPage />;
            // Add cases for other pages here
            default:
                return <GalleryPage />; // Default to Gallery for this setup
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
