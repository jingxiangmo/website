import NavBar from "../../components/NavBar/NavBar";
import styles from './page.module.scss'
import Image from "next/image";
import { urlForImage } from '../../../sanity/lib/image'


interface PhotosProps {
    photos: any[];
  }
  
  export default function Photos ({ photos }: PhotosProps) {
    return (
        <main className={styles.main}>
            <h1 className={styles.title}> Photos </h1>
            <NavBar />
            <div className={styles.images}>
                {photos.map(photo => (
                    <Image 
                        key={photo._id}
                        className={styles.image} 
                        src={urlForImage(photo.mainImage).url()} 
                        alt={photo.alt} 
                        width={600} 
                        height={450} 
                    />
                ))}
            </div>
        </main>
    );
}
