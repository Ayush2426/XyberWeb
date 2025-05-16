import React, { useState, useEffect, createContext, useContext } from 'react';
// Icons for various components
import { Sun, Moon, Laptop, Menu, X, Users, Target, BookOpen, Award, Image as ImageIcon, Linkedin, Rss, UserCircle, CalendarDays, ArrowRight } from 'lucide-react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';

// Theme Context for managing light/dark/system mode
const ThemeContext = createContext();

// Helper function to apply the selected theme to the document
const applyTheme = (theme) => {
  const root = window.document.documentElement;
  root.classList.remove('light', 'dark'); // Remove previous theme classes
  let newTheme = theme;
  // If theme is 'system', determine actual theme based on OS preference
  if (theme === 'system') {
    newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.classList.add(newTheme); // Add the new theme class
  localStorage.setItem('theme', theme); // Store the user's preference
};

// Navbar Component (uses custom class names for styling via external CSS)
const Navbar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/home/*", label: "Home" },
    { path: "/workshops", label: "Workshops" },
    { path: "/gallery", label: "Gallery" },
    { path: "/blog", label: "Blog" },
    { path: "/feedback", label: "Feedback" },
    { path: "/contact", label: "Contact" },
    { path: "/about", label: "About" },
    { path: "/auth", label: "Register/Login" }
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const ThemeButton = ({ mode, Icon }) => (
    <button
      onClick={() => setTheme(mode)}
      className={`theme-button ${theme === mode ? 'active' : ''}`}
      aria-label={`Switch to ${mode} mode`}
    >
      <Icon size={20} />
    </button>
  );

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand-container">
          <Link to="/" className="navbar-brand" onClick={closeMobileMenu}>
            XyberWeb
          </Link>
        </div>
        <div className="navbar-links">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `navbar-link ${isActive ? 'navbar-link-active' : ''}`
              }
              end={link.path === "/"}
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
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `mobile-navbar-link ${isActive ? 'mobile-navbar-link-active' : ''}`
                }
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

// PageSection Component: Wrapper for consistent page styling via external CSS
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

// Placeholder Page Components (using custom classes for styling)
const HomePage = () => (<PageSection title="Welcome to XyberWeb" pageClass="home-page"><p className="page-intro-text">Empowering the next generation of tech innovators in Patna. Explore our workshops and join our community!</p></PageSection>);
const WorkshopsPage = () => (<PageSection title="Our Workshops" pageClass="workshops-page"><p className="page-intro-text">Discover a variety of workshops designed to equip you with in-demand tech skills. From coding basics to advanced AI, we have something for everyone.</p></PageSection>);
const GalleryPage = () => (<PageSection title="Gallery" pageClass="gallery-page"><p className="page-intro-text">See moments from our past workshops, events, and student projects. Get inspired by the creativity and collaboration in our community.</p></PageSection>);
const FeedbackPage = () => (<PageSection title="Feedback" pageClass="feedback-page"><p className="page-intro-text">We value your input! Share your thoughts, suggestions, or testimonials to help us improve and grow.</p></PageSection>);
const ContactPage = () => (<PageSection title="Contact Us" pageClass="contact-page"><p className="page-intro-text">Have questions or want to get in touch? Reach out to us through our contact form, email, or social media channels.</p></PageSection>);
const AuthPage = () => (<PageSection title="Register / Login" pageClass="auth-page"><p className="page-intro-text">Join our community or access your account. New users can register for upcoming workshops and events.</p></PageSection>);


// AboutPage Component (using custom classes for styling via external CSS)
const AboutPage = () => {
  const teamMembers = [
    { name: "Satyam Srivastava", role: "Founder & Lead Instructor", bio: "Satyam is a passionate software engineer...", image: "https://placehold.co/400x400/DBEAFE/1E40AF?text=Satyam", linkedin: "#" },
    { name: "Ayush Verma", role: "Full Stack Developer & AI Instructor", bio: "Ayush brings his expertise...", image: "https://placehold.co/400x400/D1FAE5/065F46?text=Ayush", linkedin: "#" },
    { name: "Suraj Kumar", role: "Curriculum Developer & Mentor", bio: "Suraj has a background...", image: "https://placehold.co/400x400/FCE7F3/831843?text=Suraj", linkedin: "#" },
    { name: "Sameer Srivastava", role: "Marketing & Outreach Lead", bio: "Sameer connects XyberWeb...", image: "https://placehold.co/400x400/FEF3C7/92400E?text=Sameer", linkedin: "#" },
    { name: "Smriti Richa", role: "Student Success Coordinator", bio: "Smriti ensures a smooth learning...", image: "https://placehold.co/400x400/E0E7FF/3730A3?text=Richa", linkedin: "#" },
    { name: "Shivam Srivastava", role: "Technical Support & Operations", bio: "Shivam manages the technical...", image: "https://placehold.co/400x400/F3E8FF/5B21B6?text=Shivam", linkedin: "#" },
  ];

  const milestones = [
    { year: "Apr 2024", event: "XyberWeb Founded", description: "Our journey began..." },
    { year: "May 2024", event: "First 5 Workshops Conducted", description: "Successfully trained over 100 students..." },
    { year: "Jun 2024", event: "Community Partnership", description: "Collaborated with local schools..." },
    { year: "Jul 2024", event: "Launched Advanced AI & Robotics Programs", description: "Expanding our offerings..." }
  ];

  return (
    <PageSection title="About Us: Our Journey & Team" pageClass="about-page">
      <div className="about-section about-story">
        <div className="about-section-icon-container"><BookOpen size={40} className="about-section-icon" /></div>
        <h2 className="about-section-title">Our Story</h2>
        <p>XyberWeb was born from a simple idea: to make cutting-edge technology education accessible and engaging for +2 students in Patna, Bihar...</p>
      </div>

      <div className="about-section about-mission-values">
        <div className="about-section-icon-container"><Target size={40} className="about-section-icon" /></div>
        <h2 className="about-section-title">Our Mission & Values</h2>
        <p><strong>Mission:</strong> To empower the youth of Patna with practical, industry-relevant technology skills...</p>
        <div className="about-values-grid">
          {['Accessibility', 'Innovation', 'Community', 'Impact'].map(value => (
            <div key={value} className="about-value-item">
              <h3>{value}</h3>
              <p>
                {value === 'Accessibility' && 'Making quality tech education available to all.'}
                {value === 'Innovation' && 'Encouraging creative thinking and problem-solving.'}
                {value === 'Community' && 'Building a supportive network of learners and mentors.'}
                {value === 'Impact' && 'Creating positive change in students\' lives.'}
              </p>
            </div>
          ))}
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
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/200x200/E0E0E0/B0B0B0?text=Team"; }}
              />
              <h3 className="team-member-name">{member.name}</h3>
              <p className="team-member-role">{member.role}</p>
              <p className="team-member-bio">{member.bio}</p>
              <div className="team-member-social">
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name}'s LinkedIn`}>
                    <Linkedin size={24} />
                  </a>
                )}
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
        <p className="about-visuals-intro">A picture is worth a thousand words...</p>
        <div className="about-visuals-grid">
          {[
            { src: "https://placehold.co/600x400/E2E8F0/4A5568?text=Team+Working", alt: "Team working together" },
            { src: "https://placehold.co/600x400/D1FAE5/065F46?text=Workshop+In+Action", alt: "Students in a workshop" },
            { src: "https://placehold.co/600x400/FEF3C7/92400E?text=Event+Moment", alt: "A moment from a tech event" }
          ].map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              className="about-visual-image"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/CCCCCC/4A5568?text=Error"; }}
            />
          ))}
        </div>
      </div>
    </PageSection>
  );
};

// BlogPage Component (using custom classes for styling via external CSS)
const BlogPage = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with React: A Beginner's Guide",
      date: "May 10, 2025",
      author: "Satyam Srivastava",
      excerpt: "Learn the fundamentals of React, including components, props, and state, to start building interactive user interfaces.",
      image: "https://placehold.co/600x400/BFDBFE/1D4ED8?text=React+Basics",
      slug: "/blog/getting-started-with-react"
    },
    {
      id: 2,
      title: "The Future of AI in Web Development",
      date: "May 05, 2025",
      author: "Ayush Verma",
      excerpt: "Explore how Artificial Intelligence is shaping the future of web development, from automated coding to personalized user experiences.",
      image: "https://placehold.co/600x400/A5B4FC/312E81?text=AI+in+Web+Dev",
      slug: "/blog/future-of-ai-web-dev"
    },
    {
      id: 3,
      title: "Top 5 Cybersecurity Tips for Students",
      date: "April 28, 2025",
      author: "Suraj Kumar",
      excerpt: "Protect yourself online with these essential cybersecurity tips tailored for students navigating the digital world.",
      image: "https://placehold.co/600x400/FBCFE8/831843?text=Cybersecurity+Tips",
      slug: "/blog/cybersecurity-tips-for-students"
    },
    {
      id: 4,
      title: "Why Project-Based Learning is Key in Tech Education",
      date: "April 15, 2025",
      author: "Priya Sharma (Guest Author)",
      excerpt: "Discover the benefits of project-based learning and how it helps in developing practical skills for the tech industry.",
      image: "https://placehold.co/600x400/D1FAE5/065F46?text=Project+Learning",
      slug: "/blog/project-based-learning"
    }
  ];

  return (
    <PageSection title="XyberWeb Tech Blog" pageClass="blog-page">
      <div className="blog-intro">
        <Rss size={32} className="blog-intro-icon" />
        <p>Stay updated with the latest articles, tutorials, and insights from the XyberWeb team and guest authors. We cover topics ranging from web development and AI to cybersecurity and career advice in the tech industry.</p>
      </div>
      <div className="blog-posts-grid">
        {blogPosts.map(post => (
          <div key={post.id} className="blog-post-card">
            <img
              src={post.image}
              alt={post.title}
              className="blog-post-image"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/E0E0E0/B0B0B0?text=Blog+Image"; }}
            />
            <div className="blog-post-content">
              <h2 className="blog-post-title">{post.title}</h2>
              <div className="blog-post-meta">
                <span className="blog-post-author">
                  <UserCircle size={16} /> {post.author}
                </span>
                <span className="blog-post-date">
                  <CalendarDays size={16} /> {post.date}
                </span>
              </div>
              <p className="blog-post-excerpt">{post.excerpt}</p>
              <Link to={post.slug} className="blog-post-read-more">
                Read More <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

// ScrollToTop component: Scrolls to the top of the page on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null; // This component does not render anything
};

// Main App Component (using custom classes for layout)
export default function Blog() {
  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'system';
  });

  const updateTheme = (newTheme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(theme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (localStorage.getItem('theme') === 'system') {
        applyTheme('system');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      <ScrollToTop />
      {/* Main application container with custom class for styling */}
      <div className="app-shell"> {/* Replaced Tailwind classes */}
        <Navbar />
        {/* Main content area with custom class */}
        <main className="app-main-content"> {/* Replaced Tailwind classes */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workshops" element={<WorkshopsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            {/* Blog route allows for nested routes like individual post pages */}
            <Route path="/blog" element={<Blog/>} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Fallback 404 Page */}
            <Route path="*" element={<PageSection title="404 - Page Not Found"><p className="page-intro-text">Oops! The page you're looking for doesn't exist.</p></PageSection>} />
          </Routes>
        </main>
        {/* Footer with custom class */}
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
