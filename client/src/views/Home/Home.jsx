import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterPokemons, getPokemons, getTypes } from "../../redux/actions";

import { Cards, FilterAndSort, Pagination, SearchBar } from "../../components/index";
import styles from "./Home.module.css";

function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.allPokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterPokemons());
  }, [allPokemons]); //eslint-disable-line

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredPokemons.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className={styles.home}>
      <div className={styles.search}>
        <SearchBar />
      </div>

      <FilterAndSort changePage={changePage} />

      {filteredPokemons.length ? (
        <>
          <Cards currentPokemons={currentPokemons} />
          <Pagination totalPages={totalPages} currentPage={page} changePage={changePage} />
        </>
      ) : (
        <div className={styles.loaderContainer}>
          <span className={styles.loader}></span>
        </div>
      )}
    </div>
  );
}

export default Home;
