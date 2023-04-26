import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemons, getAll, getTypes } from "../../redux/actions";

import { Cards, FilterAndSort, SearchBar } from "../../components/index";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getAll());
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterPokemons());
  }, [allPokemons]);

  const startIndex = (page - 1) * 12;
  const endIndex = startIndex + 12;
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const resetPage = () => {
    setPage(1);
  };

  return (
    <div className={styles.home}>
      <div className={styles.search}>
        <SearchBar />
      </div>

      <FilterAndSort resetPage={resetPage} />

      <Cards currentPokemons={currentPokemons} />

      <div className={styles.pagination}>
        {page > 1 && (
          <button onClick={handlePrevPage} className={styles.prevButton}>
            Back
          </button>
        )}
        {filteredPokemons.length > endIndex && (
          // In the last page, endIndex = filteredPokemons.length so nextButton won't render
          <button onClick={handleNextPage} className={styles.nextButton}>
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
