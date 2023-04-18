import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.container}>
      <form>
        <input className={styles.input} placeholder="Enter a pokemon name or ID..." />
        <button className={styles.button}>Search</button>
      </form>
    </div>
  );
}

export default Navbar;
