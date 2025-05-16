import React, { useState, useEffect, createContext } from 'react';
import { Sun, Moon, Laptop, Menu, X, Users, Target, BookOpen, Award, Image as ImageIcon, Linkedin, Briefcase } from 'lucide-react';
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

// HomePage, WorkshopsPage, GalleryPage, FeedbackPage, ContactPage (Kept for completeness)
const HomePage = () => (<PageSection title="Welcome" pageClass="home-page"><p>Home Page Content...</p></PageSection>);
const WorkshopsPage = () => (<PageSection title="Workshops" pageClass="workshops-page"><p>Workshops Page Content...</p></PageSection>);
const GalleryPage = () => (<PageSection title="Gallery" pageClass="gallery-page"><p>Gallery Page Content...</p></PageSection>);
const FeedbackPage = () => (<PageSection title="Feedback" pageClass="feedback-page"><p>Feedback Page Content...</p></PageSection>);
const ContactPage = () => (<PageSection title="Contact Us" pageClass="contact-page"><p>Contact Page Content...</p></PageSection>);

// AboutPage Component
const AboutPage = () => {
    const teamMembers = [
        { name: "Satyam Srivastava", role: "Founder & Lead Instructor", bio: "Priya is a passionate software engineer with 5+ years of experience in web development and AI. She founded TechWorkshops Patna to bridge the tech skills gap for students in her hometown.", image: "https://placehold.co/400x400/DBEAFE/1E40AF?text=Satyam", linkedin: "#" },
        { name: "Ayush Verma", role: "Full Stack Developer & AI Instructor", bio: "Rajesh brings his expertise in hardware programming and robotics to inspire young innovators. He believes in learning by doing and making tech fun.", image: "https://placehold.co/400x400/D1FAE5/065F46?text=Ayush", linkedin: "#" },
        { name: "Suraj Kumar", role: "Curriculum Developer & Mentor", bio: "Anjali has a background in computer science education and focuses on creating engaging and effective learning materials for all our workshops.", image: "https://placehold.co/400x400/FCE7F3/831843?text=Suraj", linkedin: "#" },
        { name: "Sameer Srivastava", role: "Curriculum Developer & Mentor", bio: "Anjali has a background in computer science education and focuses on creating engaging and effective learning materials for all our workshops.", image: "https://placehold.co/400x400/FCE7F3/831843?text=Sameer", linkedin: "#" },
        { name: "Smriti Richa", role: "Curriculum Developer & Mentor", bio: "Anjali has a background in computer science education and focuses on creating engaging and effective learning materials for all our workshops.", image: "https://placehold.co/400x400/FCE7F3/831843?text=Richa", linkedin: "#" },
        { name: "Shivam Srivastava", role: "Curriculum Developer & Mentor", bio: "Anjali has a background in computer science education and focuses on creating engaging and effective learning materials for all our workshops.", image: "https://placehold.co/400x400/FCE7F3/831843?text=Shivam", linkedin: "#" },
    ];

    const milestones = [
        { year: "Apr", event: "TechWorkshops Patna Founded", description: "Our journey began with a mission to empower local students with essential tech skills." },
        { year: "Apr", event: "First 5 Workshops Conducted", description: "Successfully trained over 100 students in Python, Web Dev, and Cybersecurity." },
        { year: "May", event: "Community Partnership", description: "Collaborated with local schools to expand our reach and impact." },
        { year: "May", event: "Launched Advanced AI & Robotics Programs", description: "Expanding our offerings to include cutting-edge technologies." }
    ];

    return (
        <PageSection title="About Us: Our Journey & Team" pageClass="about-page">
            <div className="about-section about-story">
                <div className="about-section-icon-container"><BookOpen size={40} className="about-section-icon" /></div>
                <h2 className="about-section-title">Our Story</h2>
                <p>TechWorkshops Patna was born from a simple idea: to make cutting-edge technology education accessible and engaging for +2 students in Patna, Bihar. We noticed a gap between traditional academic learning and the practical skills demanded by the rapidly evolving tech industry. Our founders, a group of passionate tech professionals and educators with roots in Patna, decided to create a platform that not only teaches coding and robotics but also fosters a mindset of innovation, problem-solving, and lifelong learning. We started with small, focused workshops and have grown into a vibrant community dedicated to igniting the tech future of our youth.</p>
            </div>

            <div className="about-section about-mission-values">
                <div className="about-section-icon-container"><Target size={40} className="about-section-icon" /></div>
                <h2 className="about-section-title">Our Mission & Values</h2>
                <p><strong>Mission:</strong> To empower the youth of Patna with practical, industry-relevant technology skills, fostering a generation of innovators and leaders prepared for the future.</p>
                <div className="about-values-grid">
                    <div className="about-value-item">
                        <h3>Accessibility</h3>
                        <p>Making quality tech education available to all students, regardless of their background.</p>
                    </div>
                    <div className="about-value-item">
                        <h3>Innovation</h3>
                        <p>Encouraging creative thinking and a hands-on approach to problem-solving.</p>
                    </div>
                    <div className="about-value-item">
                        <h3>Community</h3>
                        <p>Building a supportive network of learners, mentors, and tech enthusiasts.</p>
                    </div>
                    <div className="about-value-item">
                        <h3>Impact</h3>
                        <p>Creating tangible positive change in students' lives and future prospects.</p>
                    </div>
                </div>
            </div>

            <div className="about-section about-team">
                <div className="about-section-icon-container"><Users size={40} className="about-section-icon" /></div>
                <h2 className="about-section-title">Meet the Team</h2>
                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="team-member-card">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="team-member-image"
                                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x400/E0E0E0/B0B0B0?text=Team+Member"; }}
                            />
                            <h3 className="team-member-name">{member.name}</h3>
                            <p className="team-member-role">{member.role}</p>
                            <p className="team-member-bio">{member.bio}</p>
                            <div className="team-member-social">
                                {member.linkedin && <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn`}><Linkedin size={24} /></a>}
                                {/* Add other social links if available */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-section about-milestones">
                <div className="about-section-icon-container"><Award size={40} className="about-section-icon" /></div>
                <h2 className="about-section-title">Our Milestones</h2>
                <div className="milestones-timeline">
                    {milestones.map((milestone, index) => (
                        <div key={index} className="milestone-item">
                            <div className="milestone-year">{milestone.year}</div>
                            <div className="milestone-content">
                                <h3 className="milestone-event">{milestone.event}</h3>
                                <p className="milestone-description">{milestone.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-section about-visuals">
                <div className="about-section-icon-container"><ImageIcon size={40} className="about-section-icon" /></div>
                <h2 className="about-section-title">Glimpses of Our Journey</h2>
                <p className="about-visuals-intro">A picture is worth a thousand words. Here are some moments from our workshops and team events. (More visuals will be added to the Gallery page!)</p>
                <div className="about-visuals-grid">
                    {/* Placeholder for a few images */}
                    <img src="https://placehold.co/600x400/E2E8F0/4A5568?text=Team+Photo" alt="Team working together" className="about-visual-image" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/4A5568?text=Image+Error"; }} />
                    <img src="https://placehold.co/600x400/D1FAE5/065F46?text=Workshop+In+Action" alt="Students in a workshop" className="about-visual-image" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/4A5568?text=Image+Error"; }} />
                    <img src="https://placehold.co/600x400/FEF3C7/92400E?text=Event+Moment" alt="A moment from a tech event" className="about-visual-image" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/4A5568?text=Image+Error"; }} />
                </div>
            </div>

        </PageSection>
    );
};


// Main App Component
export default function About() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'system';
    });
    const [activePage, setActivePage] = useState('About'); // Set current page

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
            default:
                return <AboutPage />;
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
