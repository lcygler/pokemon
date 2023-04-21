import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.container}>
      <form>
        <input className={styles.input} placeholder="Search for a pokemon..." />
        <button className={styles.button}>Search</button>
      </form>
      <Link to="/home" className={styles.link}>
        <span>Home</span>
      </Link>
      <Link to="/create" className={styles.link}>
        <span>Create</span>
      </Link>
    </div>
  );
}

export default Navbar;
