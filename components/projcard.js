import styles from './projcard.module.scss'

export default function ProjectCard (props) {
  return (
    <card className={styles.card}>
      <img src={props.img} />
      <h1> {props.name} </h1>
      <p> {props.description}</p>
      <a href={props.link}> </a>
    </card>
  )
}

