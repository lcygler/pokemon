import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ id, name, types, image }) {
  const formattedName = name.toUpperCase();
  const formattedTypes = types?.map((element) => element.charAt(0).toUpperCase() + element.slice(1));
  const [type1, type2] = formattedTypes || [];

  return (
    <Link to={`/home/${id}`}>
      <div className={styles.container}>
        <h2>{formattedName}</h2>
        <img src={image} alt="" className={styles.image} />
        <div className={styles.typesContainer}>
          <p className={styles.types}>{type1}</p>
          {type2 && <p className={styles.types}>{type2}</p>}
        </div>
      </div>
    </Link>
  );
}

export default Card;
