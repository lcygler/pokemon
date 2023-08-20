import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterPokemons, getPokemons, getTypes, setCurrentPage } from '../../redux/actions';

import { Cards, FilterAndSort, Pagination, SearchBar } from '../../components/index';
import styles from './Home.module.css';

function Home() {
  const dispatch = useDispatch();

  const allPokemons = useSelector((state) => state.allPokemons);
  const filteredPokemons = useSelector((state) => state.filteredPokemons);
  const currentPage = useSelector((state) => state.currentPage);

  const [pokemonsPerPage] = useState(12);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      await dispatch(getPokemons());
      dispatch(filterPokemons());
    };
    fetchPokemons();
    dispatch(getTypes());
  }, [dispatch]);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowError(true);
  //   }, 30000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  const totalPages = Math.ceil(filteredPokemons.length / pokemonsPerPage);
  const startIndex = (currentPage - 1) * pokemonsPerPage;
  const endIndex = startIndex + pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(startIndex, endIndex);

  const changePage = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };

  return (
    <div className={styles.home}>
      <div className={styles.search}>
        <SearchBar />
      </div>

      <FilterAndSort changePage={changePage} />

      {!allPokemons.length ? (
        <>
          {showError ? (
            <div className={styles.refreshContainer}>
              <p className={styles.error}>Error loading data. Please try again</p>
              <button
                onClick={() => window.location.reload()}
                className={styles.refreshButton}
              ></button>
            </div>
          ) : (
            <div className={styles.loaderContainer}>
              <span className={styles.loader}></span>
            </div>
          )}
        </>
      ) : !filteredPokemons.length ? (
        <div className={styles.errorContainer}>
          <p className={styles.error}>No results found for the selected filters</p>
        </div>
      ) : (
        <>
          <Cards currentPokemons={currentPokemons} />
          <Pagination totalPages={totalPages} currentPage={currentPage} changePage={changePage} />
        </>
      )}
    </div>
  );
}

export default Home;
