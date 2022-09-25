import styles from './sidebar.module.scss'
import Link from 'next/link'

export default function sidebar (props) {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Link href='/writings'>
          <a className={styles.card}>
            <h2>writings &rarr;</h2>
            <p> essays, book notes, and ideas </p>
          </a>
        </Link>

        <Link href='/projects'>
          <a className={styles.card}>
            <h2>projects &rarr;</h2>
            <p> softwares, designs, and robots </p>
          </a>
        </Link>

        <Link href='/contacts'>
          <a className={styles.card}>
            <h2>contacts &rarr;</h2>
            <p> email, resume, and github </p>
          </a>
        </Link>
      </div>
    </div>
  )
}
