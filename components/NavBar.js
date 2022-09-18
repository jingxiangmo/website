import styles from './NavBar.module.scss';
import Link from "next/link";

function NavBar(props) {
  return (
    <div className={styles.grid}>
      <Link href={"/writings"}>
        <a className={styles.card}>
          <h2>writings &rarr;</h2>
        </a>
      </Link>

      <Link href={"/projects"}>
        <a className={styles.card}>
          <h2>projects &rarr;</h2>
        </a>
      </Link>

      <Link href={"/contacts"}>
        <a className={styles.card}>
          <h2>contacts &rarr;</h2>
        </a>
      </Link>
    </div>
  );
}

export default NavBar;