import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'

export default function Home () {
  return (
    <div className={styles.container}>

      <Head>
        <title>Jingxiang Mo</title>
        <meta name='Jingxiang Mo' content="jingxiang mo's website" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <div className={styles.heading}>
          <h1 className={styles.title}>
            <u>JINGX</u>IANG MO{' '}
          </h1>

          <p className={styles.description}>
            building <a>softwares</a>, <a>robots</a>, <a>communities</a>
          </p>
        </div>
      </main>
    </div>
  )
}
