import styles from "./footer.module.scss";

const Footer = () => {
    
    return (
        <div className={styles.footer}>
            <a> Message </a>
            <span>-</span>
            <a> Github </a>
            <span>-</span>
            <a> Email </a>
        </div>
    );
};

export default Footer;
