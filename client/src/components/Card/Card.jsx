import { Link } from "react-router-dom";
import styles from "./Card.module.css";

function Card({ id, name, types, image }) {
  const formattedName = name.toUpperCase();
  const formattedTypes = types.map((element) => element.charAt(0).toUpperCase() + element.slice(1)).join(", ");

  return (
    <Link to={`/home/${id}`}>
      <div className={styles.container}>
        <h2>{formattedName}</h2>
        <img src={image} alt="" className={styles.image} />
        {formattedTypes && <p className={styles.types}>{formattedTypes}</p>}
      </div>
    </Link>
  );
}

export default Card;
