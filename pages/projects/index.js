import styles from "../../styles/Projects.module.scss";
import ProjectCard from "../../components/projcard";

export default function Projects() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/* <NavBar titleOne="writings" titleTwo="projects" titleThree="contacts" /> */}

        <div className={styles.cards_grid}>
          <ProjectCard name="Streamline POS" description="" link="" />
          <ProjectCard name="Endevr" description="" link="" />
          <ProjectCard name="Hover" description="" link="" />
          <ProjectCard name="Streamline POS" description="" link="" />
          <ProjectCard name="Endevr" description="" link="" />
          <ProjectCard name="Hover" description="" link="" />
        </div>
      </main>
    </div>
  );
}
