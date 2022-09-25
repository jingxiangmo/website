import styles from './layout.module.scss'

import Sidebar from '../components/sidebar'

export default function Layout ({ children }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>{children}</main>
      <Sidebar />
    </div>
  )
}
