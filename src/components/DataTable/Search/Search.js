import React from 'react';
import classes from './Search.module.scss';

export default function Search({ onSearch }) {
  const [search, setSearch] = React.useState('');

  const onInputChange = (value) => {
    setSearch(value);
  };

  return (
    <div className={classes.search}>
      <input
        type="text"
        className="form-control"
        placeholder="Search"
        value={search}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <button onClick={() => onSearch(search)} type="button" className="btn btn-dark">
        Найти
      </button>
    </div>
  );
}
