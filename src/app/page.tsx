import styles from './page.module.scss'
import NavBar from '../components/NavBar'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1> Jingxiang Mo </h1>
      <NavBar/>
      <div>
        <p> Hey, I'm a Senior Software Engineer at Company. I enjoy working with Next.js and sdfsdf beautiful front-end experiences. </p>
        <p> Hey, I'm a Senior Software Engineer at Company. I enjoy working with Next.js and crafting beautiful front-end experiences. </p>
        <p> Hey, I'm a Senior Software Engineer at Company. I enjoy working with Next.js and crafting beautiful front-end experiences. </p>
      </div>
    </main>
  )
}
