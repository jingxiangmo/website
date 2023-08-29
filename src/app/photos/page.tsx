import NavBar from "../../components/NavBar/NavBar";
import styles from './page.module.scss'


const Photos = () => {

    return (
        <main className={styles.main}>
            <h1 className={styles.title}> Photos </h1>
            <NavBar />
        </main>

    );
};

export default Photos;
