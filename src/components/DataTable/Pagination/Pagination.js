import React from 'react';
import classes from './Pagination.module.scss';

export default function Pagination({
  total = 0,
  itemsPerPage = 50,
  currentPage = 1,
  onPageChange,
}) {
  const [totalPages, setTotalPages] = React.useState(0);

  //set number of pages
  React.useEffect(() => {
    if (total > 0 && itemsPerPage > 0) {
      //calculation of the number of pages
      setTotalPages(Math.ceil(total / itemsPerPage));
    }
  }, [total, itemsPerPage]);

  //get pagination list
  const paginationItems = React.useMemo(() => {
    let items = [];
    for (let i = 1; i <= totalPages; i++) {
      //add item classes
      const cls = [classes.item, 'page-item'];
      if (i === currentPage) cls.push(classes.active);
      items.push(
        <li key={i} className={cls.join(' ')}>
          <span onClick={() => onPageChange(i)} className="page-link">
            {i}
          </span>
        </li>,
      );
    }
    return items;
  }, [totalPages, onPageChange, currentPage]);

  return (
    <nav>
      <ul className="pagination d-flex flex-wrap">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            type="button"
            className="page-link">
            Prev
          </button>
        </li>
        {paginationItems}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            type="button"
            className="page-link">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
