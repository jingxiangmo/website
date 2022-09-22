import styles from './NavBar.module.scss'
import Link from 'next/link'

function NavBar (props) {
  return (

    <div className={styles.grid}>
      <Link href={'/' + props.titleOne}>
        <a className={styles.card}>
          <h2>{props.titleOne} &rarr;</h2>
        </a>
      </Link>

      <Link href={'/' + props.titleTwo}>
        <a className={styles.card}>
          <h2>{props.titleTwo} &rarr;</h2>
        </a>
      </Link>

      <Link href={props.titleThree === 'homepage' ? '/' : props.titleThree}>
        <a className={styles.card}>
          <h2>{props.titleThree}  &rarr;</h2>
        </a>
      </Link>
    </div>
  )
}

export default NavBar
