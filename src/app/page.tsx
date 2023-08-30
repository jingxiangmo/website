import styles from './page.module.scss'
import NavBar from "../components/NavBar/NavBar";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}> Jingxiang Mo </h1>
        <NavBar />
        <div className={styles.about}>
          <p> Currently exploring different ideas and industries to find the most important problems in the world.</p>
          <p> My ambition is to make good gifts for people around me and the world. </p>
          <p> I'm currently at McGill University learning Computer Science and Math. My interests of knowledge include robotics, AI, AI alignment, biology, physics, and philosophy. </p>
          <p> I love travelling, and I've travelled around the our tiny planet backpacking. </p>
        </div>
      </main>
    </>

  )
}
