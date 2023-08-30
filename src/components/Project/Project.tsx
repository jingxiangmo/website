import styles from "./project.module.scss";

interface ProjectProps {
  imageUrl: string;
  title: string;
  date: string;
  description: string;
  links: {
    github: string;
    website: string;
  };
  tech: string[];
  reverse?: boolean;
}

const Project: React.FC<ProjectProps> = ({ imageUrl, title, date, description, links, tech, reverse }) => {
  return (
    <div className={`${styles.block} ${reverse ? styles.reverse : ''}`}>
      <div className={styles.image}>
        <img src={imageUrl} alt={title} />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>
          {title} <span className={styles.date}>{date}</span>
        </div>
        <div className={styles.description}>
          {description}
        </div>
        <div className={styles.links}>
          <span>Links:</span> 
          <a href={links.github}> GitHub</a>, 
          <a href={links.website}> Website</a>
        </div>
        <div className={styles.tech}>
          {tech.map((t, i) => (
            <span key={i} className={styles.techItem}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
