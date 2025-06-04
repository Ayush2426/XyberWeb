// App.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Sun, Moon, Laptop, Menu, X } from 'lucide-react';
// BrowserRouter is typically placed in your main index.js file.
// This file uses Routes, Route, Link, and NavLink.
import { Routes, Route, Link, NavLink } from 'react-router-dom';

// --- Theme Context ---
const ThemeContext = createContext();

// Helper function to apply theme to the document
const applyThemeToDocument = (theme) => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark'); // Clear previous theme classes

    let effectiveTheme = theme;
    if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.classList.add(effectiveTheme);
    localStorage.setItem('theme', theme); // Store the user's preference (light, dark, or system)
};

// --- Navbar Component ---
const Navbar = () => {
    const { theme, setTheme } = useContext(ThemeContext); // Use theme from context
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

    // ThemeButton sub-component
    const ThemeButton = ({ mode, Icon, currentTheme }) => (
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
        <nav className="navbar"> {/* CSS: Ensure navbar is responsive, sticky/fixed if needed */}
            <div className="navbar-content"> {/* CSS: Max-width, padding, flex for alignment */}
                <div className="navbar-brand-container">
                    <Link to="/" className="navbar-brand" onClick={handleMobileLinkClick}>
                        XyberWeb
                    </Link>
                </div>

                {/* Desktop Navigation Links */}
                <div className="navbar-links"> {/* CSS: Hide on mobile, display as flex on desktop */}
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => isActive ? "navbar-link navbar-link-active" : "navbar-link"}
                            end={link.path === "/"} // 'end' prop for precise matching of root path
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <div className="theme-switcher"> {/* CSS: Style theme buttons layout */}
                        <ThemeButton mode="light" Icon={Sun} currentTheme={theme} />
                        <ThemeButton mode="dark" Icon={Moon} currentTheme={theme} />
                        <ThemeButton mode="system" Icon={Laptop} currentTheme={theme} />
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
                        <div className="mobile-theme-switcher"> {/* CSS: Layout within mobile menu */}
                            <ThemeButton mode="light" Icon={Sun} currentTheme={theme} />
                            <ThemeButton mode="dark" Icon={Moon} currentTheme={theme} />
                            <ThemeButton mode="system" Icon={Laptop} currentTheme={theme} />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

// --- PageSection Component (Wrapper for consistent page styling) ---
const PageSection = ({ title, children }) => (
    <section className="page-section"> {/* CSS: Padding, margin for sections */}
        <div className="page-section-container"> {/* CSS: Max-width, centering for content */}
            {title && <h1 className="page-title">{title}</h1>} {/* CSS: Styling for page titles */}
            <div className="page-content-wrapper"> {/* CSS: Layout for content within a section */}
                {children}
            </div>
        </div>
    </section>
);

// --- Page Components (Placeholders) ---
export const HomePage = () => (
    <PageSection title="Welcome to Student Tech Workshops - XyberWeb">
        <div className="hero-section"> {/* CSS: Full-width or contained, background, padding */}
            <h2 className="hero-title">Ignite Your Tech Future</h2>
            <h1 className="hero-title">• DEFEND • DEVELOP • DOMINATE • </h1>
            <p className="hero-subtitle">Empowering students in Patna with cutting-edge tech skills for a brighter tomorrow.</p>
            <Link to="/workshops" className="hero-button-link"> {/* Use Link for navigation buttons */}
                <button className="hero-button">Explore Workshops</button>
            </Link>
            <br />
        </div>
        <div className="mission-highlight"> {/* CSS: Styling for mission section */}
            <h3 className="mission-title">Our Mission</h3>
            <p className="mission-text">
                We are a passionate team dedicated to bridging the technology gap for students in Patna. Our mission is to provide accessible, high-quality tech workshops that equip students with practical skills in emerging fields, fostering innovation and preparing them for future academic and career success.
            </p>
        </div>
        <div className="offerings-section"> {/* CSS: Grid or flex layout for cards */}
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
        <div className="trust-signals-section"> {/* CSS: Flex layout for trust items */}
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

const WorkshopsPage = () => (<PageSection title="Our Workshops"><p className="placeholder-text">Detailed information about our workshops will be available here soon. Stay tuned!</p></PageSection>);
const GalleryPage = () => (<PageSection title="Gallery"><p className="placeholder-text">Gallery coming soon!</p></PageSection>);
const BlogPage = () => (<PageSection title="Blog"><p className="placeholder-text">Blog posts coming soon!</p></PageSection>);
const FeedbackPage = () => (<PageSection title="Feedback"><p className="placeholder-text">Feedback form coming soon!</p></PageSection>);
const ContactPage = () => (<PageSection title="Contact Us"><p className="placeholder-text">Contact information coming soon!</p></PageSection>);
const AboutPage = () => (<PageSection title="About XyberWeb"><p className="placeholder-text">More about us coming soon!</p></PageSection>);
const AuthenticationPage = () => (<PageSection title="Register"><p className="placeholder-text">Registration and Login functionality coming soon!</p></PageSection>);

// --- Main App Component (formerly LandingPage) ---
export default function App() { // Renamed to App for clarity, can be LandingPage too
    const [theme, setThemeState] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'system'; // Default to system preference
    });

    // Apply theme to document and listen for system changes
    useEffect(() => {
        applyThemeToDocument(theme);

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = () => {
            if (localStorage.getItem('theme') === 'system') { // Only re-apply if user preference is 'system'
                applyThemeToDocument('system');
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, [theme]); // Re-run when theme preference changes (light, dark, system)

    // Function to pass to ThemeContext to update theme state
    const setTheme = (newTheme) => {
        setThemeState(newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {/* Ensure BrowserRouter is wrapping this App component in your index.js or main entry file */}
            <div className="app-container"> {/* CSS: Basic app layout, min-height: 100vh */}
                <Navbar /> {/* Navbar now gets theme from context */}
                <main className="main-content"> {/* CSS: Flex-grow: 1 for footer pushing, padding */}
                    <Routes>
                        <Route path="/*" element={<HomePage />} />
                        <Route path="/workshops" element={<WorkshopsPage />} />
                        <Route path="/gallery" element={<GalleryPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="/feedback" element={<FeedbackPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/authentication" element={<AuthenticationPage />} />
                        {/* Fallback route for unmatched paths (optional) */}
                        {/* <Route path="*" element={<NotFoundPage />} /> */}
                    </Routes>
                </main>
                <footer className="footer"> {/* CSS: Basic footer styling, padding, text-align */}
                    <p className="footer-text">
                        © {new Date().getFullYear()} XyberWeb-Patna. All rights reserved.
                    </p>
                    <p className="footer-subtext">
                        Empowering Bihar's Future Tech Leaders.
                    </p>
                </footer>
            </div>
        </ThemeContext.Provider>
    );
}

// --- General advice for responsiveness ---
// 1. Viewport Meta Tag: Ensure your public/index.html has:
//    <meta name="viewport" content="width=device-width, initial-scale=1.0">
//
// 2. CSS Media Queries: Use CSS media queries extensively to adapt styles for different screen sizes.
//    Example:
//    /* Base styles (mobile-first) */
//    .navbar-links { display: none; }
//    .mobile-menu-button-container { display: block; }
//
//    /* Larger screens */
//    @media (min-width: 768px) {
//      .navbar-links { display: flex; }
//      .mobile-menu-button-container { display: none; }
//    }
//
// 3. Flexbox & Grid: Utilize CSS Flexbox and Grid for layout, as they are inherently more responsive.
//
// 4. Test Thoroughly: Use browser developer tools to test on various device sizes.
//
// 5. Mobile Menu CSS: Pay close attention to the CSS for `.mobile-menu`, `.mobile-menu-items`,
//    and their children to ensure they are styled correctly for an overlay or slide-in menu.
//    This includes position (fixed/absolute), z-index, width/height, overflow, and transitions.
