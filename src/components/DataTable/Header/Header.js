import React from 'react';
import classes from './Header.module.scss';

export default function Header({ headers, onSorting }) {
  const [sortingField, setSortingField] = React.useState('');
  const [sortingOrder, setSortingOrder] = React.useState('asc');

  const sortClickHandler = (field) => {
    //change sorting order
    const order = field === sortingField && sortingOrder === 'asc' ? 'desc' : 'asc';
    setSortingField(field);
    setSortingOrder(order);
    onSorting(field, order);
  };

  //render table header based on props
  function renderTableHeader() {
    return headers.map(({ name, field, sortable }, index) => {
      // specify icon classes
      const cls = [classes.sort_icon];
      if (sortingField === field && sortingOrder === 'desc') cls.push(classes.rotated);

      return (
        <th
          key={index}
          //debouce is used to handle click spamming
          onClick={() => (sortable ? sortClickHandler(field) : null)}
          scope="col">
          {name}
          {sortingField === field ? (
            <svg
              className={cls.join(' ')}
              width="10"
              height="6"
              viewBox="0 0 10 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                fill="#ffffff"
              />
            </svg>
          ) : null}
        </th>
      );
    });
  }

  return (
    <thead className="thead-dark">
      <tr>{renderTableHeader()}</tr>
    </thead>
  );
}
