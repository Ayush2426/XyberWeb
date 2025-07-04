import React, { useState, useEffect } from 'react';
import { ShieldCheck, BookOpen, CheckCircle, Users, CalendarDays, Clock, Info, Camera, Video, UserCircle, X, Mail, User, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import satyamimg from '../Assets/Profiles/satyam.jpg'; 
// Import your CSS file here if your setup supports it (e.g., Create React App)
// import './WorkshopPageStyles.css'; 

// Helper: Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    // Add 'modal-open' class when isOpen is true for entry animation
    const overlayClass = `modal-overlay ${isOpen ? 'modal-open' : ''}`;

    if (!isOpen) return null;

    return (
        <div className={overlayClass}>
            <div className="modal-content">
                <button
                    onClick=""
                    className="modal-close-button"
                    aria-label="Close modal"
                >
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );
};

// Helper: Pre-Registration Form Component
const PreRegistrationForm = ({ workshopTitle, onSubmitSuccess }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!name.trim() || !email.trim()) {
            setError('Name and Email are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            console.log('Form Submitted:', { workshopTitle, name, email });
            setIsSubmitting(false);
            setName('');
            setEmail('');
            onSubmitSuccess(`Thank you, ${name}! Your pre-registration for "${workshopTitle}" is received.`);
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <div>
                <label htmlFor="name" className="form-label">Full Name</label>
                <div className="form-input-container">
                    <User size={18} className="form-input-icon" />
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Ada Lovelace"
                        className="form-input"
                        disabled={isSubmitting}
                    />
                </div>
            </div>
            <div>
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="form-input-container">
                    <Mail size={18} className="form-input-icon" />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g., ada@example.com"
                        className="form-input"
                        disabled={isSubmitting}
                    />
                </div>
            </div>
            {error && <p className="form-error">{error}</p>}
            <button
                type="submit"
                disabled={isSubmitting}
                className="form-submit-button"
            >
                {isSubmitting ? (
                    <>
                        <svg className="spinner button-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle opacity="0.25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path opacity="0.75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                    </>
                ) : (
                    <>
                        <Send size={18} className="button-icon" />
                        Submit Pre-Registration
                    </>
                )}
            </button>
        </form>
    );
};

// Helper: Image Gallery Component
const ImageGallery = ({ images, workshopTitle }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    if (!images || images.length === 0) {
        return null; // Don't render gallery if no images
    }

    return (
        <div className="gallery-section">
            <h3 className="gallery-title">
                <Camera size={28} className="gallery-title-icon" /> Gallery
            </h3>
            <div className="gallery-container">
                <div className="gallery-selected-image-wrapper">
                    <img
                        src={selectedImage.src}
                        alt={`${workshopTitle} - ${selectedImage.alt}`}
                        className="gallery-selected-image"
                        onError={(e) => e.target.src = 'https://placehold.co/800x600/e2e8f0/94a3b8?text=Image+Not+Found'}
                    />
                </div>
                <div className="gallery-thumbnails-grid">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedImage(image)}
                            className={`gallery-thumbnail-button ${selectedImage.src === image.src ? 'selected' : ''}`}
                            aria-label={`View image ${index + 1}: ${image.alt}`}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="gallery-thumbnail-image"
                                onError={(e) => e.target.src = 'https://placehold.co/150x150/e2e8f0/94a3b8?text=Thumb'}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Main Workshop Info Page Layout
const WorkshopInfoPageLayout = ({ workshopData }) => {
    const {
        title,
        Icon, // Lucide Icon component
        iconColorClass = "icon-color-blue", // Default CSS class for icon color
        intro,
        learningPoints = [],
        keyTakeaways = [],
        audience,
        prerequisites,
        duration,
        format,
        galleryImages = [],
        videoUrl,
        trainer,
        pageClass = "" // For any page-specific root class
    } = workshopData;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissionMessage, setSubmissionMessage] = useState('');

    const handleOpenModal = () => {
        setSubmissionMessage('');
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);

    const handleFormSubmitSuccess = (message) => {
        setSubmissionMessage(message);
        setTimeout(() => {
            handleCloseModal();
        }, 3000);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    return (
        <div className={`workshop-page-container ${pageClass}`}>
            <div className="workshop-max-width-wrapper">
                <header className="workshop-header">
                    <div className="workshop-header-icon-wrapper">
                        {Icon && <Icon size={48} className={`workshop-header-icon ${iconColorClass}`} />}
                    </div>
                    <h1 className="workshop-title">{title}</h1>
                    <p className="workshop-intro">{intro}</p>
                </header>

                <div className="workshop-content-grid">
                    <div className="workshop-details-column">
                        {learningPoints.length > 0 && (
                            <div className="content-card">
                                <h3 className="card-title">
                                    <BookOpen size={28} className="card-title-icon learn-icon" /> What You'll Learn
                                </h3>
                                <ul className="card-list">
                                    {learningPoints.map((point, index) => <li key={index}>{point}</li>)}
                                </ul>
                            </div>
                        )}

                        {keyTakeaways.length > 0 && (
                            <div className="content-card">
                                <h3 className="card-title">
                                    <CheckCircle size={28} className="card-title-icon takeaway-icon" /> Key Takeaways
                                </h3>
                                <ul className="card-list">
                                    {keyTakeaways.map((point, index) => <li key={index}>{point}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="workshop-meta-column">
                        <div className="content-card">
                            <h3 className="meta-card-title">Workshop Details</h3>
                            <div className="meta-info-list">
                                <p className="meta-item"><Users size={18} className="meta-item-icon" /> <strong>Audience:&nbsp;&nbsp;&nbsp;</strong> {audience}</p>
                                <p className="meta-item"><CalendarDays size={18} className="meta-item-icon" /> <strong>Prerequisites:&nbsp;&nbsp;&nbsp;</strong> {prerequisites}</p>
                                <p className="meta-item"><Clock size={18} className="meta-item-icon" /> <strong>Duration:&nbsp;&nbsp;&nbsp;</strong> {duration}</p>
                                <p className="meta-item"><Info size={18} className="meta-item-icon" /> <strong>Format:&nbsp;&nbsp;&nbsp;</strong> {format}</p>
                            </div>
                        </div>
                        <Link to="/authentication" ><button
                            onClick={handleOpenModal}
                            className="primary-action-button"
                        >
                            Pre-Register for this Workshop
                        </button></Link>
                    </div>
                </div>

                {galleryImages.length > 0 && <ImageGallery images={galleryImages} workshopTitle={title} />}

                {videoUrl && (
                    <div className="video-section">
                        <h3 className="card-title"> {/* Reusing card-title style for consistency */}
                            <Video size={28} className="card-title-icon video-icon" /> Workshop Preview
                        </h3>
                        <div className="video-wrapper">
                            <iframe
                                src={videoUrl}
                                title={`${title} - Workshop Preview`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="video-iframe"
                            ></iframe>
                        </div>
                    </div>
                )}

                {trainer && (
                    <div className="content-card trainer-section-card">
                        <h3 className="card-title trainer-card-title">
                            <UserCircle size={28} className="card-title-icon trainer-icon" /> Meet Your Trainer
                        </h3>
                        <div className="trainer-info-flex">
                            <img
                                src={trainer.imageUrl}
                                alt={`Trainer ${trainer.name}`}
                                className="trainer-image"
                                onError={(e) => e.target.src = 'https://placehold.co/128x128/e2e8f0/94a3b8?text=Trainer'}
                            />
                            <div className="trainer-details">
                                <h4 className="trainer-name">{trainer.name}</h4>
                                <p className="trainer-role">{trainer.title}</p>
                                <p className="trainer-bio">{trainer.bio}</p>
                            </div>
                        </div>
                    </div>
                )}

                 <div className="final-cta-container">
                    <Link to="/authentication" ><button
                        onClick=""
                        className="final-cta-button"
                    >
                        Secure Your Spot - Pre-Register Now!
                    </button></Link>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {submissionMessage ? (
                    <div className="modal-success-content">
                        <CheckCircle size={48} className="modal-success-icon" />
                        <h3 className="modal-success-title">Success!</h3>
                        <p className="modal-success-message">{submissionMessage}</p>
                        <button
                            onClick={handleCloseModal}
                            className="modal-success-close-button"
                        >
                            Close
                        </button>
                    </div>
                ) : (
                    <>
                        <h2 className="modal-prereg-title">Pre-Register for</h2>
                        <p className="modal-workshop-name">{title}</p>
                        <PreRegistrationForm workshopTitle={title} onSubmitSuccess={handleFormSubmitSuccess} />
                    </>
                )}
            </Modal>
        </div>
    );
};

// Specific Data for Cyber Security Workshop
const cyberSecurityWorkshopData = {
    slug: "cyber-security-essentials",
    title: "Cyber Security Essentials",
    Icon: ShieldCheck,
    iconColorClass: "icon-color-blue", // CSS class for the icon color
    intro: "Dive deep into digital defense. Understand cybersecurity fundamentals, common threats, and how to protect your information in an increasingly connected world.",
    learningPoints: [
        "Fundamentals of cybersecurity and its importance.",
        "Common types of cyber threats (malware, phishing, social engineering).",
        "Basic principles of online safety, privacy, and data protection.",
        "Introduction to ethical hacking concepts (responsibly and ethically).",
        "Strong password creation, management, and multi-factor authentication.",
        "Secure browsing habits and identifying malicious websites/emails.",
        "Understanding digital footprints and managing online reputation.",
    ],
    keyTakeaways: [
        "Practical skills to enhance personal digital security.",
        "Increased awareness of the cybersecurity landscape.",
        "Ability to identify and mitigate common online risks.",
        "Foundational understanding for tech or cybersecurity careers."
    ],
    audience: "  (All streams with an interest in technology)",
    prerequisites: "Basic computer literacy and internet usage skills.",
    duration: "2 days (e.g., 3 hours per day, total 6 hours)",
    format: "Interactive sessions, live demos, case studies, Q&A, hands-on activities.",
    galleryImages: [
        { src: "https://placehold.co/800x600/3b82f6/ffffff?text=Cyber+Security+Concept", alt: "Cyber Security Concept" },
        { src: "https://placehold.co/800x600/10b981/ffffff?text=Data+Protection", alt: "Data Protection" },
        { src: "https://placehold.co/800x600/ef4444/ffffff?text=Network+Security", alt: "Network Security" },
        { src: "https://placehold.co/800x600/f97316/ffffff?text=Ethical+Hacking+Idea", alt: "Ethical Hacking Idea" },
        { src: "https://placehold.co/800x600/6366f1/ffffff?text=Students+Learning", alt: "Students Learning Cybersecurity" },
    ],
    videoUrl: "https://www.youtube.com/embed/NF5SGj7iGV0?si=fvdYMufZWqhF5Tmm", 
    trainer: {
        name: "Mr. Satyam Srivastava",
        title: "Certified Ethical Hacker & Security Analyst",
        bio: "Satyam is a passionate cybersecurity professional with over 5 years of experience in network security, ethical hacking, and cyber forensics. He is dedicated to educating young minds about the importance of digital safety and empowering them with the skills to navigate the online world securely.",
        imageUrl: satyamimg
    },
    pageClass: "cyber-security-details-page"
};

// The component to be rendered
export default function CyberSecurityWorkshopPage() {
    // To enable dark mode, you would typically have a theme context or a global state.
    // For this example, you can manually add/remove 'dark' class to the <body> or a root div.
    useEffect(() => {
        // Example: Toggle dark mode based on a condition or saved preference
        // const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        // if (prefersDark) {
        //    document.body.classList.add('dark');
        // }
        // return () => document.body.classList.remove('dark'); // Cleanup
    }, []);

    return <WorkshopInfoPageLayout workshopData={cyberSecurityWorkshopData} />;
}
