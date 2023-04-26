import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { uuidRegex } from "../../utils/consts";
import styles from "./SearchBar.module.css";

function SearchBar() {
  const history = useHistory();
  const [idOrName, setIdOrName] = useState("");

  const searchPokemon = (idOrName) => {
    if (!uuidRegex.test(idOrName) && isNaN(idOrName) && typeof idOrName !== "string") {
      return window.alert("Invalid name or ID");
    }

    history.push(`/home/${idOrName}`);
  };

  const handleChange = (e) => {
    setIdOrName(e.target.value);
  };

  const handleSearch = () => {
    searchPokemon(idOrName);
    setIdOrName("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="search"
        value={idOrName}
        className={styles.input}
        placeholder="Search for a pokémon..."
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
      <Link to="/create" className={styles.link}>
        <span>Create a Pokémon</span>
      </Link>
    </div>
  );
}

export default SearchBar;
