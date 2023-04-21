import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

function Landing() {
  return (
    <div>
      <h1>Landing</h1>
      <Link to="/home" className={styles.link}>
        <button className={styles.homeButton}>Home</button>
      </Link>
    </div>
  );
}

export default Landing;
