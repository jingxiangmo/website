import NavBar from "../../components/NavBar/NavBar";
import ProjectCard from "../../components/ProjectCard/ProjectCard"
import styles from './page.module.scss'

const Projects: React.FC = () => {
    const projects = [
        {
            "imageUrl": "/images/alphascript.png",
            "title": "AlphaScript",
            "date": "August 2023",
            "headline": "Automating medical transcription with AI.",
            "description": "Built to assist doctors in record-keeping and decision-making by employing local LLM and AI for transcription and summarization.",
            "links": {
                "github": "#",
                "website": "#"
            },
            "tech": []
        },
        {
            "imageUrl": "/path/to/VizArt.jpg",
            "title": "VizArt",
            "date": "August 2023",
            "headline": "Air drawing for the digital artist.",
            "description": "Conceived to democratize artistic expression, this platform lets users draw in the air and share their creations.",
            "links": {
                "github": "#",
                "website": "#"
            },
            "tech": []
        },
        {
            "imageUrl": "/path/to/Qubit.jpg",
            "title": "Qubit (Coveo)",
            "date": "August 2023",
            "headline": "Securing and automating databases.",
            "description": "Designed to reduce human error and downtime by automating processes and implementing IP address whitelisting.",
            "links": {
                "github": "#",
                "website": "#"
            },
            "tech": []
        },
        {
            "imageUrl": "/path/to/HoverRobot.jpg",
            "title": "Hover Robot",
            "date": "August 2023",
            "headline": "Rover robot for automated retrieval.",
            "description": "Developed to navigate and collect items autonomously using computer vision and sensor technologies.",
            "links": {
                "github": "#",
                "website": "#"
            },
            "tech": []
        },
        {
            "imageUrl": "/path/to/Pharmascience.jpg",
            "title": "Pharmascience",
            "date": "August 2023",
            "headline": "Intelligence dashboard for pharma market.",
            "description": "Created to visualize competitor data and automate reporting, thereby aiding project managers in strategy formulation.",
            "links": {
                "github": "#",
                "website": "#"
            },
            "tech": []
        },
        {
            "imageUrl": "/path/to/Streamline.jpg",
            "title": "Streamline",
            "date": "August 2023",
            "headline": "QR-based point of sale for restaurants.",
            "description": "Built to simplify and speed up the ordering process across multiple dining establishments.",
            "links": {
                "github": "#",
                "website": "#"
            },
            "tech": []
        },
        {
            "imageUrl": "/path/to/BetterMe.jpg",
            "title": "Better Me",
            "date": "August 2023",
            "headline": "Tech-enabled solutions for mental well-being.",
            "description": "Developed as a platform to offer personalized mental health interventions and resources.",
            "links": {
                "github": "#",
                "website": "#"
            },
            "tech": []
        },
        {
            "imageUrl": "/path/to/McGillProjects.jpg",
            "title": "McGill Projects",
            "date": "August 2023",
            "headline": "A collaborative hub for tech innovators.",
            "description": "Founded to foster innovation and collaboration among a community of over 450 technology enthusiasts.",
            "links": {
                "github": "#",
                "website": "#"
            },
            "tech": []
        },
        {
            "imageUrl": "/path/to/EmailSecretary.jpg",
            "title": "Email Secretary",
            "date": "August 2023",
            "headline": "Intelligent email sorting and prioritization.",
            "description": "Conceived to declutter inboxes by intelligently sorting and prioritizing emails, focusing on what truly matters.",
            "links": {
                "github": "#",
                "website": "#"
            },
            "tech": []
        }
    ]


    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.title}> Projects </h1>
                <NavBar />

                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} /> // Use the new component
                ))}

            </main>
        </>
    );
};


export default Projects;
