import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}></div>
      <Link to="/home" className={styles.link}>
        <button className={styles.button}>
          <div className={styles.go}></div>
        </button>
      </Link>
    </div>
  );
}

export default Landing;
