import styles from "./navbar.module.scss";

const NavBar = () => {

    return (
        <div className={styles.navbar}>
            <a className={styles.links}> About </a>
            <a className={styles.links}> Projects </a>
            <a className={styles.links}> Photos </a>
        </div>
    );
};

export default NavBar;
