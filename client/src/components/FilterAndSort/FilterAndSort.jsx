import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByOrigin, filterByType, resetFilters, sortByAttack, sortByName } from "../../redux/actions";

import styles from "./FilterAndSort.module.css";

function FilterAndSort({ resetPage }) {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  const typeFilter = useSelector((state) => state.typeFilter);
  const originFilter = useSelector((state) => state.originFilter);
  const nameOrder = useSelector((state) => state.nameOrder);
  const attackOrder = useSelector((state) => state.attackOrder);

  const filterByTypeSelect = useRef(null);
  const filterByOriginSelect = useRef(null);
  const sortByNameSelect = useRef(null);
  const sortByAttackSelect = useRef(null);

  useEffect(() => {
    filterByTypeSelect.current.value = typeFilter;
    filterByOriginSelect.current.value = originFilter;
    sortByNameSelect.current.value = nameOrder;
    sortByAttackSelect.current.value = attackOrder;
  }, [typeFilter, originFilter, nameOrder, attackOrder]);

  const handleFilterByType = (e) => {
    const selectedType = e.target.value;
    dispatch(filterByType(selectedType));
    resetPage();
  };

  const handleFilterByOrigin = (e) => {
    const selectedOrigin = e.target.value;
    dispatch(filterByOrigin(selectedOrigin));
    resetPage();
  };

  const handleSortByName = (e) => {
    const selectedOrder = e.target.value;
    dispatch(sortByName(selectedOrder));
    sortByAttackSelect.current.value = "Default";
    resetPage();
  };

  const handleSortByAttack = (e) => {
    const selectedOrder = e.target.value;
    dispatch(sortByAttack(selectedOrder));
    sortByNameSelect.current.value = "Default";
    resetPage();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    filterByTypeSelect.current.value = "All";
    filterByOriginSelect.current.value = "All";
    sortByNameSelect.current.value = "Default";
    sortByAttackSelect.current.value = "Default";
    resetPage();
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <label htmlFor="filterByTypeSelect" className={styles.label}>
          Filter by Type
        </label>
        <select
          defaultValue="All"
          name="filterByTypeSelect"
          ref={filterByTypeSelect}
          onChange={handleFilterByType}
          className={styles.select}
        >
          <option value="All">All types</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label htmlFor="filterByOriginSelect" className={styles.label}>
          Filter by Origin
        </label>
        <select
          defaultValue="All"
          name="filterByOriginSelect"
          ref={filterByOriginSelect}
          onChange={handleFilterByOrigin}
          className={styles.select}
        >
          <option value="All">All origins</option>
          <option value="API">API</option>
          <option value="Database">Database</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label htmlFor="sortByNameSelect" className={styles.label}>
          Sort by Name
        </label>
        <select
          defaultValue="Default"
          name="sortByNameSelect"
          ref={sortByNameSelect}
          onChange={handleSortByName}
          className={styles.select}
        >
          <option value="Default">Default</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label htmlFor="sortByAttackSelect" className={styles.label}>
          Sort by Attack
        </label>
        <select
          defaultValue="Default"
          name="sortByAttackSelect"
          ref={sortByAttackSelect}
          onChange={handleSortByAttack}
          className={styles.select}
        >
          <option value="Default">Default</option>
          <option value="Low-High">Low-High</option>
          <option value="High-Low">High-Low</option>
        </select>
      </div>

      <button value="reset" onClick={handleReset} className={styles.resetButton}>
        Reset filters
      </button>
    </div>
  );
}

export default FilterAndSort;
