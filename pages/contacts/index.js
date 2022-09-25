import styles from '../../styles/Contacts.module.scss'

export default function Contacts () {
  return (
    <div className={styles.overflow_container}>
      <main className={styles.main}>
        <h1>contact me</h1>
        <p> email: jingxiangmo@gmail.com </p>
        <p> github: https://github.com/jingxiangmo </p>
        <p>linkedin: https://www.linkedin.com/in/jingxiangmo </p>
        <p>facebook: https://www.facebook.com/jingxiang.mo.3/ </p>
      </main>
    </div>
  )
}
