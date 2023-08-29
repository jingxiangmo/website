import NavBar from "../../components/NavBar/NavBar";
import styles from './page.module.scss'
import Image from "next/image";

const Photos = () => {

    return (
        <main className={styles.main}>
            <h1 className={styles.title}> Photos </h1>
            <NavBar />
            <div className={styles.images}>
                <Image className={styles.image} src="/images/paper_store.webp" alt="1" width={600} height={450} />
            </div>
        </main>

    );
};

export default Photos;
