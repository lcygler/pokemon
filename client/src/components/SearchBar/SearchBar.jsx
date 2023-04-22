import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { uuidRegex } from "../../utils/consts";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const history = useHistory();
  const [idOrName, setIdOrName] = useState("");

  const handleChange = (e) => {
    setIdOrName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchPokemon(idOrName);
      setIdOrName("");
    }
  };

  const searchPokemon = (idOrName) => {
    if (!uuidRegex.test(idOrName) && isNaN(idOrName) && typeof idOrName !== "string") {
      return window.alert("Invalid name or ID");
    }

    history.push(`/home/${idOrName}`);
  };

  return (
    <div className={styles.container}>
      <input
        type="search"
        value={idOrName}
        className={styles.input}
        placeholder="Search for a pokemon..."
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button
        className={styles.searchButton}
        onClick={() => {
          searchPokemon(idOrName);
          setIdOrName("");
        }}
      >
        Search
      </button>
      <Link to="/create" className={styles.link}>
        <span>Create</span>
      </Link>
    </div>
  );
}

export default SearchBar;
