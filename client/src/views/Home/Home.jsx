import { Cards, Navbar } from "../../components/index";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <h1>Home</h1>
      <Navbar />
      <Cards />
    </div>
  );
}

export default Home;
