import styles from './page.module.scss'
import NavBar from "../components/NavBar/NavBar";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}> Jingxiang Mo </h1>
        <NavBar />
        <div className={styles.about}>
          <p> I currently work on ___. </p>
          <p> My ambition is to make good gifts for people around me and the world. </p>
          <p> I'm currently at McGill University learning Computer Science and Math. My interests of knowledge include robotics, AI, AI alignment, biology, physics, and philosophy. </p>
        </div>
      </main>
    </>

  )
}
