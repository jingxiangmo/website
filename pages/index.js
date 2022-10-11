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
        {/* ===========[ TITLE BLOCK ]===========  */}

        <column className={styles.column}>
          <div className={styles.title_column}>
            <div className={styles.heading}>
              <dt className={styles.title}> JINGXIANG MO </dt>

              <p className={styles.description}>
                building softwares, robots, communities
              </p>
            </div>
          </div>
        </column>

        {/* ===========[ COLUMN 1]===========  */}
        <column className={styles.column}>
          {/* projects */}

          <dl className={styles.block}>
            <dt> PROJECTS </dt>

            <dd>
              <a href="">Robotics Research Project</a>
              <br />
              Branding, identity, strategy, web and digital design
            </dd>


            

            {/* <dd> Streamline </dd>
            <dd> Endevr </dd>
            <dd> Better Me </dd>
            <dd> Art Portfolio Website </dd>

            <dd> McGill Students' Society Website </dd> */}
          </dl>
        </column>

        {/* ===========[ COLUMN 2]===========  */}

        <column className={styles.column}>
          {/* contact */}
          <dt> CONTACT </dt>

          {/* work */}
          <dl className={styles.column_block}>
            <dt> WORK </dt>
            <dd> Qubit (Coveo) </dd>
          </dl>

          {/* education */}
          <dl className={styles.column_block}>
            <dt> EDUCATION </dt>
          </dl>
        </column>

        {/* ===========[ COLUMN 3]===========  */}

        <column className={styles.column}>
          {/* writings */}
          <dl className={styles.column_block}>
            <dt> WRITINGS </dt>
          </dl>
        </column>
      </main>
    </div>
  );
}
