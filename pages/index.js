import Head from 'next/head'
import styles from '../styles/Home.module.scss'

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
          <h1 className={styles.title}> <u>JINGX</u>IANG MO </h1>

          <p className={styles.description}> 
          building <a>softwares</a>, <a>robots</a>, <a>communities</a>
          </p>
        </div>


        <div className={styles.grid}>
          <a href="" className={styles.card}>
            <h2>posts &rarr;</h2>
            <p> essays, book notes, and ideas </p>
          </a>

          <a href="" className={styles.card}>
            <h2>projects &rarr;</h2>
            <p> softwares, designs, and robots </p>
          </a>

          <a
            href=""
            className={styles.card}
          >
            <h2>contact &rarr;</h2>
            <p> email, resume, and github </p>
          </a>

        </div>
      </main>
    </div>
  )
}