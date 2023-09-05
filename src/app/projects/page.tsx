import NavBar from "../../components/NavBar/NavBar";
import ProjectCard from "../../components/ProjectCard/ProjectCard"
import styles from './page.module.scss'

const Projects: React.FC = () => {
    const projects = [
        {
            imageUrl: "/path/to/image1.jpg",
            title: "Composing Studio",
            date: "September 2021",
            headline: "headline",
            description: "Your description here...",
            links: {
                github: "#",
                website: "#"
            },
            tech: ["TypeScript", "Rust", "Music", "React"]
        },
        {
            imageUrl: "/path/to/image1.jpg",
            title: "Composing Studio",
            date: "September 2021",
            headline: "headline",
            description: "Your description here...",
            links: {
                github: "#",
                website: "#"
            },
            tech: ["TypeScript", "Rust", "Music", "React"]
        },
        {
            imageUrl: "/path/to/image1.jpg",
            title: "Composing Studio",
            date: "September 2021",
            headline: "headline",
            description: "Your description here...",
            links: {
                github: "#",
                website: "#"
            },
            tech: ["TypeScript", "Rust", "Music", "React"]
        },
        {
            imageUrl: "/path/to/image1.jpg",
            title: "Composing Studio",
            date: "September 2021",
            headline: "headline",
            description: "Your description here...",
            links: {
                github: "#",
                website: "#"
            },
            tech: ["TypeScript", "Rust", "Music", "React"]
        },
        {
            imageUrl: "/path/to/image1.jpg",
            title: "Composing Studio",
            date: "September 2021",
            headline: "headline",
            description: "Your description here...",
            links: {
                github: "#",
                website: "#"
            },
            tech: ["TypeScript", "Rust", "Music", "React"]
        },
    ];

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
