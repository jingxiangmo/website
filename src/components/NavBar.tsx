"use client";

import styles from "./navbar.module.scss";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {

    const currentRoute = usePathname();
    
    return (
        <div className={styles.navbar}>
            <Link href="/" className={
                currentRoute === "/" ? styles.active_link : styles.non_active_link}>About
            </Link>
            <Link href="/projects" className={
                currentRoute === "/projects" ? styles.active_link : styles.non_active_link}>Projects
            </Link>
            <Link href="/photos" className={
                currentRoute === "/photos" ? styles.active_link : styles.non_active_link}>Photos
            </Link>
        </div>
    );
};

export default NavBar;
