import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAll, getTypes } from "../../redux/actions";

import { Cards, SearchBar } from "../../components/index";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAll());
    dispatch(getTypes());
  }, [dispatch]);

  const startIndex = (page - 1) * 12;
  const endIndex = startIndex + 12;
  const currentPokemons = allPokemons.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  return (
    <div className={styles.home}>
      <div className={styles.nav}>
        <SearchBar />
      </div>

      <Cards currentPokemons={currentPokemons} />

      <div className={styles.pagination}>
        {page > 1 && (
          <button onClick={handlePrevPage} className={styles.prevButton}>
            Back
          </button>
        )}
        {allPokemons.length > endIndex && (
          // In the last page, endIndex = allPokemons.length so nextButton won't render
          <button onClick={handleNextPage} className={styles.nextButton}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
