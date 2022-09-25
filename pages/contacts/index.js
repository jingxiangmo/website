import styles from '../../styles/Contacts.module.scss'

export default function Contacts () {
  return (
    <div className={styles.overflow_container}>
      <main className={styles.main}>
        <h1>contact me</h1>
        <p> email: jingxiangmo@gmail.com </p>
        <p> github: <a href='https://github.com/jingxiangmo'> https://github.com/jingxiangmo </a> </p>
        <p>linkedin:  <a href='https://www.linkedin.com/in/jingxiangmo'> https://www.linkedin.com/in/jingxiangmo </a>  </p>
        <p>facebook:  <a href='https://www.facebook.com/jingxiang.mo.3/'> https://www.facebook.com/jingxiang.mo.3/ </a></p>
      </main>
    </div>
  )
}
