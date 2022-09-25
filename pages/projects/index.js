import styles from '../../styles/Projects.module.scss'
import ProjectCard from '../../components/projcard'

export default function Projects () {
  return (
    <div className={styles.overflow_container}>
      <main className={styles.main}>
        <div className={styles.cards_grid}>
          <ProjectCard name='Streamline POS' description='' link='' />
          <ProjectCard name='Endevr' description='' link='' />
          <ProjectCard name='Hover' description='' link='' />
          <ProjectCard name='Streamline POS' description='' link='' />
          <ProjectCard name='Endevr' description='' link='' />
          <ProjectCard name='Hover' description='' link='' />
        </div>
      </main>
    </div>
  )
}
