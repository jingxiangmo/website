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
        // more project stuff here
    ];

    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.title}> Projects </h1>
                <NavBar />

                <div className={styles.proj_card}>
                    <img className={styles.proj_img} src="/path/to/image.jpg" alt="Description" />

                    <div >
                        <div>
                            <h1 className={styles.proj_title}> AlphaScript </h1>
                            <p className={styles.proj_date}> Aug 2023 </p>
                        </div>

                        <p className={styles.proj_headline}> Local transcription blah blah blah</p>

                        <p className={styles.proj_description}> Hello world my name is Jacob, I love dogs. </p>

                        <div className={styles.prof_links}>
                            <p> Links: </p>
                            <a href=""> Website </a>
                            <a href=""> Github </a>
                        </div>
                    </div>
                </div>



            </main>
        </>
    );
};

export default Projects;
