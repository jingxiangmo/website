import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Jingxiang Mo</title>
        <meta name="Jingxiang Mo" content="jingxiang mo's website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.title_block}>
            <div className={styles.heading}>
              <h1 className={styles.title}>
                <u>JINGX</u>IANG MO{" "}
              </h1>

              <p className={styles.description}>
                building <a>softwares</a>, <a>robots</a>, <a>communities</a>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          {/* projects */}

          <div className={styles.section_block}>
            <h1> projects </h1>

            <p> Robotics Research Project </p>

            <p> Streamline </p>

            <p> Endevr </p>

            <p> Better Me </p>

            <p> Art Portfolio Website </p>

            <p> McGill Students' Society Website </p>
          </div>

          {/* education */}

          <div className={styles.section_block}>
            <h1> education </h1>

            
          </div>


        </section>

        <section className={styles.section}>
          {/* work */}
          <h1> work </h1>

          {/* contact */}
          <h1> contact </h1>
        </section>

        <section className={styles.section}>
          {/* writings */}
          <h1> writings </h1>
        </section>
      </main>
    </div>
  );
}
