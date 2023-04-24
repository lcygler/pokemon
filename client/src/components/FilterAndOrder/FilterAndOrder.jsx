import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByOrigin,
  filterByType,
  getAll,
  getTypes,
  orderByAttack,
  orderByName,
  resetFilters,
} from "../../redux/actions";

import styles from "./FilterAndOrder.module.css";

function FilterAndOrder() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const filterByTypeSelect = useRef(null);
  const filterByOriginSelect = useRef(null);
  const orderByNameSelect = useRef(null);
  const orderByAttackSelect = useRef(null);

  const handleFilterByType = (e) => {
    dispatch(filterByType(e.target.value));
  };

  const handleFilterByOrigin = (e) => {
    dispatch(filterByOrigin(e.target.value));
  };

  const handleOrderByName = (e) => {
    dispatch(orderByName(e.target.value));
  };

  const handleOrderByAttack = (e) => {
    dispatch(orderByAttack(e.target.value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
    filterByTypeSelect.current.value = "All";
    filterByOriginSelect.current.value = "All";
    orderByNameSelect.current.value = "Default";
    orderByAttackSelect.current.value = "Default";
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterContainer}>
        <label htmlFor="filterByTypeSelect" className={styles.filterLabel}>
          Filter by Type:
        </label>
        <select
          name="filterByTypeSelect"
          ref={filterByTypeSelect}
          onChange={handleFilterByType}
          className={styles.select}
        >
          <option value="All" selected></option>
          {types.map((element) => (
            <option key={element.id} value={element.name}>
              {element.name.charAt(0).toUpperCase() + element.name.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.filterContainer}>
        <label htmlFor="filterByOriginSelect" className={styles.filterLabel}>
          Filter by Origin:
        </label>
        <select
          name="filterByOriginSelect"
          ref={filterByOriginSelect}
          onChange={handleFilterByOrigin}
          className={styles.select}
        >
          <option value="All" selected></option>
          <option value="API">API</option>
          <option value="DB">DB</option>
        </select>
      </div>

      <div className={styles.orderContainer}>
        <label htmlFor="orderByNameSelect" className={styles.orderLabel}>
          Order by ID:
        </label>
        <select name="orderByNameSelect" ref={orderByNameSelect} onChange={handleOrderByName} className={styles.select}>
          <option value="Default" selected></option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>

      <div className={styles.orderContainer}>
        <label htmlFor="orderByAttackSelect" className={styles.orderLabel}>
          Order by Attack:
        </label>
        <select
          name="orderByAttackSelect"
          ref={orderByAttackSelect}
          onChange={handleOrderByAttack}
          className={styles.select}
        >
          <option value="Default" selected></option>
          <option value="Ascending">Ascending</option>
          <option value="Descending">Descending</option>
        </select>
      </div>

      <button value="reset" onClick={handleReset} className={styles.resetButton}>
        Reset filters
      </button>
    </div>
  );
}

export default FilterAndOrder;
