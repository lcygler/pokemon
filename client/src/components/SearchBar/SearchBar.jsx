import { Link } from "react-router-dom";
import styles from "./SearchBar.module.css";

function SearchBar() {
  return (
    <div className={styles.container}>
      <form>
        <input className={styles.input} placeholder="Search for a pokemon..." />
        <button className={styles.button}>Search</button>
      </form>
      <Link to="/create" className={styles.link}>
        <span>Create</span>
      </Link>
    </div>
  );
}

export default SearchBar;
