import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPokemons,
  resetFilters,
  updateAttackOrder,
  updateNameOrder,
  updateOriginFilter,
  updateTypeFilter,
} from "../../redux/actions";
import styles from "./FilterAndSort.module.css";

function FilterAndSort({ changePage }) {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  const typeFilter = useSelector((state) => state.typeFilter);
  const originFilter = useSelector((state) => state.originFilter);
  const nameOrder = useSelector((state) => state.nameOrder);
  const attackOrder = useSelector((state) => state.attackOrder);

  const typeSelect = useRef(null);
  const originSelect = useRef(null);
  const nameSelect = useRef(null);
  const attackSelect = useRef(null);

  useEffect(() => {
    typeSelect.current.value = typeFilter;
    originSelect.current.value = originFilter;
    nameSelect.current.value = nameOrder;
    attackSelect.current.value = attackOrder;
  }, [typeFilter, originFilter, nameOrder, attackOrder]);

  const handleFilters = (e) => {
    const { name: selectName, value: selectValue } = e.target;
    if (selectName === "typeSelect") {
      dispatch(updateTypeFilter(selectValue));
    } else if (selectName === "originSelect") {
      dispatch(updateOriginFilter(selectValue));
    } else if (selectName === "nameSelect") {
      dispatch(updateNameOrder(selectValue));
    } else if (selectName === "attackSelect") {
      dispatch(updateAttackOrder(selectValue));
    }
    dispatch(filterPokemons());
    changePage(1);
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(filterPokemons());
    changePage(1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectContainer}>
        <label htmlFor="typeSelect" className={styles.label}>
          Filter by Type
        </label>
        <select
          defaultValue="All"
          name="typeSelect"
          ref={typeSelect}
          onChange={handleFilters}
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
        <label htmlFor="originSelect" className={styles.label}>
          Filter by Origin
        </label>
        <select
          defaultValue="All"
          name="originSelect"
          ref={originSelect}
          onChange={handleFilters}
          className={styles.select}
        >
          <option value="All">All origins</option>
          <option value="API">API</option>
          <option value="Database">Database</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label htmlFor="nameSelect" className={styles.label}>
          Sort by Name
        </label>
        <select
          defaultValue="Default"
          name="nameSelect"
          ref={nameSelect}
          onChange={handleFilters}
          className={styles.select}
        >
          <option value="Default">Default</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <label htmlFor="attackSelect" className={styles.label}>
          Sort by Attack
        </label>
        <select
          defaultValue="Default"
          name="attackSelect"
          ref={attackSelect}
          onChange={handleFilters}
          className={styles.select}
        >
          <option value="Default">Default</option>
          <option value="Low-High">Low-High</option>
          <option value="High-Low">High-Low</option>
        </select>
      </div>

      <button value="reset" onClick={handleReset} className={styles.resetButton}>
        Reset
      </button>
    </div>
  );
}

export default FilterAndSort;
