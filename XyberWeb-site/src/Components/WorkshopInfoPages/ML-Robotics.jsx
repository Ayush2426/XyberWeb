import React, { useState, useEffect } from 'react';
import { Bot, BookOpen, CheckCircle, Users, CalendarDays, Clock, Info, Camera, Video, UserCircle, X, Mail, User, Send, Link } from 'lucide-react';
import satyamimg from '../Assets/Profiles/satyam.jpg'; 

// Import the specific CSS for this page.
// Ensure BaseWorkshopStyles.css is also linked/imported in your project.
// import './MlRoboticsWorkshopStyles.css'; 
// import './BaseWorkshopStyles.css'; // Or link BaseWorkshopStyles.css in HTML

// Helper: Modal Component (Assumed to be styled by BaseWorkshopStyles.css)
const Modal = ({ isOpen, onClose, children }) => {
    const overlayClass = `modal-overlay ${isOpen ? 'modal-open' : ''}`;
    if (!isOpen) return null;

    return (
        <div className={overlayClass}>
            <div className="modal-content">
                <button
                    onClick={onClose}
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

// Helper: Pre-Registration Form Component (Assumed to be styled by BaseWorkshopStyles.css)
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
                        placeholder="e.g., Grace Hopper"
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
                        placeholder="e.g., grace@example.com"
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

// Helper: Image Gallery Component (Assumed to be styled by BaseWorkshopStyles.css)
const ImageGallery = ({ images, workshopTitle }) => {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    if (!images || images.length === 0) {
        return (
            <div className="gallery-section">
                <h3 className="gallery-title">
                    <Camera size={28} className="gallery-title-icon" /> Gallery
                </h3>
                <div className="gallery-container">
                    <p style={{ textAlign: 'center', padding: '1rem' }}>No images available for this gallery.</p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (images && images.length > 0 && (!selectedImage || !images.find(img => img.src === selectedImage.src))) {
            setSelectedImage(images[0]);
        }
    }, [images, selectedImage]);

    if (!selectedImage && images && images.length > 0) {
        setSelectedImage(images[0]);
    }

    if (!selectedImage) {
        return (
            <div className="gallery-section">
                <h3 className="gallery-title">
                    <Camera size={28} className="gallery-title-icon" /> Gallery
                </h3>
                <div className="gallery-container">
                    <p style={{ textAlign: 'center', padding: '1rem' }}>Gallery is loading or no images to display.</p>
                </div>
            </div>
        );
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

// Main Workshop Info Page Layout (Assumed to be styled by BaseWorkshopStyles.css and page-specific CSS)
const WorkshopInfoPageLayout = ({ workshopData }) => {
    const {
        title,
        Icon,
        iconColorClass = "icon-color-blue",
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
        pageClass = ""
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
                                <p className="meta-item"><Users size={18} className="meta-item-icon" /> <strong>Audience:</strong> {audience}</p>
                                <p className="meta-item"><CalendarDays size={18} className="meta-item-icon" /> <strong>Prerequisites:</strong> {prerequisites}</p>
                                <p className="meta-item"><Clock size={18} className="meta-item-icon" /> <strong>Duration:</strong> {duration}</p>
                                <p className="meta-item"><Info size={18} className="meta-item-icon" /> <strong>Format:</strong> {format}</p>
                            </div>
                        </div>
                        <Link to="/authentication" ><button
                            onClick=""
                            className="primary-action-button"
                        >
                            Pre-Register for this Workshop
                        </button></Link>
                    </div>
                </div>

                {galleryImages.length > 0 && <ImageGallery images={galleryImages} workshopTitle={title} />}

                {videoUrl && (
                    <div className="video-section">
                        <h3 className="card-title">
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

// Specific Data for Machine Learning & Robotics Workshop
const mlRoboticsWorkshopData = {
    slug: "ml-robotics",
    title: "Machine Learning & Robotics",
    Icon: Bot,
    iconColorClass: "icon-color-red", // Defined in MlRoboticsWorkshopStyles.css
    intro: "Combine the intelligence of Machine Learning with the physicality of Robotics. This workshop helps students understand how robots can learn and perform tasks, with hands-on activities.",
    learningPoints: [
        "Introduction to Robotics: components, types, and applications.",
        "Basics of programming for robotics (e.g., block-based or simplified Python).",
        "What is Machine Learning? Supervised, Unsupervised, Reinforcement Learning.",
        "Simple ML concepts applicable to robotics (e.g., line following, object detection basics).",
        "Building or simulating simple robotic systems.",
        "Integrating sensors and actuators.",
        "Challenges and future of intelligent robotics."
    ],
    keyTakeaways: [
        "Basic understanding of robotic components and programming.",
        "Introduction to how Machine Learning can make robots 'smarter'.",
        "Experience with building or simulating a robot and making it perform tasks.",
        "A glimpse into the interdisciplinary field of AI and Robotics."
    ],
    audience: "  (Especially those with an interest in science, engineering, and AI)",
    prerequisites: "Basic computer skills. Interest in hands-on building and problem-solving.",
    duration: "3-4 days (e.g., 3 hours per day, total 9-12 hours, depends on kit complexity)",
    format: "Hands-on robot building/simulation, programming sessions, mini-projects, demonstrations.",
    galleryImages: [
        { src: "https://placehold.co/800x600/ef4444/ffffff?text=Robotics+Arm", alt: "Robotics Arm" },
        { src: "https://placehold.co/800x600/f87171/ffffff?text=Machine+Learning+Flowchart", alt: "Machine Learning Flowchart" },
        { src: "https://placehold.co/800x600/fca5a5/ffffff?text=Students+Building+Robots", alt: "Students Building Robots" },
        { src: "https://placehold.co/800x600/b91c1c/ffffff?text=Autonomous+Robot", alt: "Autonomous Robot" },
        { src: "https://placehold.co/800x600/fecaca/ffffff?text=AI+Chip+on+Robot", alt: "AI Chip on Robot" },
    ],
    videoUrl: "https://www.youtube.com/embed/yADlxGz6nGE?si=SiYzci6-4bRLfsFB",
    trainer: {
        name: "Mr. Satyam Srivastava",
        title: "Robotics Engineer & AI Developer",
        bio: "Satyam is an experienced robotics engineer with a passion for integrating machine learning into physical systems. He has worked on various autonomous robotics projects and enjoys mentoring students in hands-on tech projects.",
        imageUrl: satyamimg
    },
    pageClass: "ml-robotics-details-page"
};

// The component to be rendered
export default function MlRoboticsWorkshopPage() {
    // useEffect(() => {
    //    document.body.classList.add('dark'); // Or 'light'
    //    return () => document.body.classList.remove('dark');
    // }, []);

    return <WorkshopInfoPageLayout workshopData={mlRoboticsWorkshopData} />;
}
