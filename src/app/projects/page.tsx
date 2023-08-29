import NavBar from "../../components/NavBar";
import styles from './page.module.scss'

const Projects = () => {

    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.title}> Projects </h1>
                <NavBar />
            </main>
        </>
    );
};

export default Projects;
