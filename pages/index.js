import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      {/*==========[ HEADER ]============*/}
      <Head>
        <title>Jingxiang Mo</title>
        <meta name="Jingxiang Mo" content="jingxiang mo's website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*==========[ MAIN ]============*/}
      <main className={styles.main}>
        <div className={styles.heading}>
          <h1 className={styles.title}>
            {" "}
            <u>JINGX</u>IANG MO{" "}
          </h1>

          <p className={styles.description}>
            building <a>softwares</a>, <a>robots</a>, <a>communities</a>
          </p>
        </div>

        <div className={styles.grid}>
          <Link href={"/writings"}>
            <a className={styles.card}>
              <h2>writings &rarr;</h2>
              <p> essays, book notes, and ideas </p>
            </a>
          </Link>

          <Link href={"/projects"}>
            <a className={styles.card}>
              <h2>projects &rarr;</h2>
              <p> softwares, designs, and robots </p>
            </a>
          </Link>

          <Link href={"/contacts"}>
            <a className={styles.card}>
              <h2>contacts &rarr;</h2>
              <p> email, resume, and github </p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
