import NavBar from "../../components/NavBar/NavBar";
import Project from "../../components/Project/Project"
import styles from './page.module.scss'

const Projects: React.FC = () => {
    const projects = [
        {
            imageUrl: "/path/to/image1.jpg",
            title: "Composing Studio",
            date: "September 2021",
            description: "Your description here...",
            links: {
                github: "#",
                website: "#"
            },
            tech: ["TypeScript", "Rust", "Music", "React"]
        },
        // Add more projects here
    ];
    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.title}> Projects </h1>
                <NavBar />

                <div>
                    {projects.map((project, index) => (
                        <Project
                            key={index}
                            {...project}
                            reverse={index % 2 !== 0}
                        />
                    ))}
                </div>
            </main>
        </>
    );
};

export default Projects;
