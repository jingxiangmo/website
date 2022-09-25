import styles from '../../styles/Projects.module.scss'
import ProjectCard from '../../components/projcard'

export default function Projects () {
  return (
    <div className={styles.overflow_container}>
      <main className={styles.main}>
        <div className={styles.cards_grid}>
          <ProjectCard img='' name='Streamline POS' description='restaurant menu and payment solution' link='' />
          <ProjectCard img='' name='Endevr' description='' link='' />
          <ProjectCard img='' name='Hover Robot' description='' link='' />
          <ProjectCard img='' name='Better Me' description='' link='' />
          <ProjectCard img='' name='MUS Website' description='' link='' />
          <ProjectCard img='' name='Art Portfolio' description='' link='' />

       
        </div>
      </main>
    </div>
  )
}
