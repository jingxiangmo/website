import styles from './page.module.scss'
import NavBar from "../components/NavBar/NavBar";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}> Jingxiang Mo </h1>
      <NavBar/>
      <div className={styles.about}>
        <p> Hey, I'm a Senior Software Engineer at Company. I enjoy working with Next.js and sdfsdf beautiful front-end experiences. </p>
        <p> Hey, I'm a Senior Software Engineer at Company. I enjoy working with Next.js and sdfsdf beautiful front-end experiences. </p>
        <p> Hey, I'm a Senior Software Engineer at Company. I enjoy working with Next.js and crafting beautiful front-end experiences. </p>
        <p> Hey, I'm a Senior Software Engineer at Company. I enjoy working with Next.js and crafting beautiful front-end experiences. </p>
      </div>
    </main>
  )
}
