import styles from "./Card.module.css";

function Card() {
  return (
    <div className={styles.cardContainer}>
      <h2>Nombre</h2>
      <p>Tipo 1</p>
      <p>Tipo 2</p>
      <img src="" alt="" />
    </div>
  );
}

export default Card;
