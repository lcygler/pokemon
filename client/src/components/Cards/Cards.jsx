import { Card } from "../index";
import styles from "./Cards.module.css";

function Cards({ currentPokemons }) {
  return (
    <div className={styles.cardsContainer}>
      {currentPokemons?.map(({ id, name, types, image }) => (
        <Card key={id} id={id} name={name} types={types} image={image} />
      ))}
    </div>
  );
}

export default Cards;
