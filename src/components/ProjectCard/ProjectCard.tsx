import styles from './ProjectCard.module.scss'

interface ProjectCardProps {
  project: {
    imageUrl: string;
    title: string;
    date: string;
    headline: string;
    description: string;
    links: { github: string; website: string };
    tech: string[];
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={styles.proj_card}>
      <img className={styles.proj_img} src={project.imageUrl} alt="Description" />
      <div className={styles.proj_info}>
        <div className={styles.proj_title_bar}>
          <h1 className={styles.proj_title}> {project.title} </h1>
          <p className={styles.proj_date}> {project.date} </p>
        </div>
        <p className={styles.proj_headline}> {project.headline} </p>
        <p className={styles.proj_description}> {project.description} </p>
        <div className={styles.proj_links}>
          <p>Links:</p>
          <a className={styles.link} href={project.links.website}>Website</a>
          <a className={styles.link} href={project.links.github}>Github</a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;