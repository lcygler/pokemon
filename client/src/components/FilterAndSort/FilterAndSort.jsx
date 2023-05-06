import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterPokemons,
  resetFilters,
  updateOrder,
  updateOriginFilter,
  updateTypeFilter,
} from "../../redux/actions";
import styles from "./FilterAndSort.module.css";

function FilterAndSort({ changePage }) {
  const dispatch = useDispatch();

  const types = useSelector((state) => state.types);
  const typeFilter = useSelector((state) => state.typeFilter);
  const originFilter = useSelector((state) => state.originFilter);
  const order = useSelector((state) => state.order);

  const typeSelect = useRef(null);
  const originSelect = useRef(null);
  const orderSelect = useRef(null);

  useEffect(() => {
    typeSelect.current.value = typeFilter;
    originSelect.current.value = originFilter;
    orderSelect.current.value = order;
  }, [typeFilter, originFilter, order]);

  const handleFilters = (e) => {
    const { name: selectName, value: selectValue } = e.target;
    if (selectName === "typeSelect") {
      dispatch(updateTypeFilter(selectValue));
    } else if (selectName === "originSelect") {
      dispatch(updateOriginFilter(selectValue));
    } else if (selectName === "orderSelect") {
      dispatch(updateOrder(selectValue));
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
        <select
          defaultValue="All"
          name="typeSelect"
          ref={typeSelect}
          onChange={handleFilters}
          className={styles.select}
        >
          <option value="All">All Types</option>
          {types.map((type) => (
            <option key={type.id} value={type.name}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.selectContainer}>
        <select
          defaultValue="All"
          name="originSelect"
          ref={originSelect}
          onChange={handleFilters}
          className={styles.select}
        >
          <option value="All">All Origins</option>
          <option value="API">API</option>
          <option value="Database">Database</option>
        </select>
      </div>

      <div className={styles.selectContainer}>
        <select
          defaultValue="Default"
          name="orderSelect"
          ref={orderSelect}
          onChange={handleFilters}
          className={styles.select}
        >
          <option value="Default">Sort By</option>
          <option value="Name (A-Z)">Name (A-Z)</option>
          <option value="Name (Z-A)">Name (Z-A)</option>
          <option value="Attack (Asc)">Attack (Asc)</option>
          <option value="Attack (Desc)">Attack (Desc)</option>
        </select>
      </div>

      <button value="reset" onClick={handleReset} className={styles.resetButton}>
        Reset
      </button>
    </div>
  );
}

export default FilterAndSort;
