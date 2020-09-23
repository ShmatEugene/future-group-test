import React from 'react';
import axios from 'axios';

import classes from './Table.module.scss';

import Header from './Header/Header';
import Pagination from './Pagination/Pagination';
import Search from './Search/Search';
import MoreInfo from './MoreInfo/MoreInfo';
import AddRow from './AddRow/AddRow';
import Loader from './UI/Loader/Loader';

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === 'desc' ? comparison * -1 : comparison;
  };
}

export default function Table({ itemsPerPage = 50, link }) {
  const [table, setTable] = React.useState([]);
  const [sorting, setSorting] = React.useState({ field: '', order: '' });
  const [totalItems, setTotalItems] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [search, setSearch] = React.useState('');
  const [selectedRow, setSelectedRow] = React.useState({});
  const [isAddRowOpen, setIsAddRowOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  //Table headers setup
  const headers = [
    { name: 'ID', field: 'id', sortable: true },
    { name: 'First Name', field: 'firstName', sortable: true },
    { name: 'Last Name', field: 'lastName', sortable: true },
    { name: 'Email', field: 'email', sortable: true },
    { name: 'Phone', field: 'phone', sortable: true },
  ];

  //Fetch data from server
  React.useEffect(() => {
    //reset state
    setSorting({ field: '', order: '' });
    setCurrentPage(1);
    setSearch('');
    setSelectedRow({});
    setIsAddRowOpen(false);

    if (link) {
      setLoading(true);
      axios
        .get(link)
        .then((response) => {
          setTable(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [link]);

  const tableData = React.useMemo(() => {
    let newTable = [...table];

    //Search based on searchable fields
    const searchableFields = ['id', 'firstName', 'lastName', 'email', 'phone'];
    if (search) {
      newTable = newTable.filter((item) => {
        return searchableFields
          .map((header) => {
            return item[header].toString().toLowerCase().includes(search.toLowerCase());
          })
          .includes(true);
      });
    }

    //Set number of items after filtration
    setTotalItems(newTable.length);

    //Sorting table
    if (sorting.field) {
      newTable = newTable.sort(compareValues(sorting.field, sorting.order));
    }

    //Slice table for pagination
    return newTable.slice(
      (currentPage - 1) * itemsPerPage,
      (currentPage - 1) * itemsPerPage + itemsPerPage,
    );
  }, [table, sorting, currentPage, itemsPerPage, search]);

  //Add row
  const onRowAddHandler = (data) => {
    const insertData = {
      id: +data.id.value,
      firstName: data.firstName.value,
      lastName: data.lastName.value,
      email: data.email.value,
      phone: data.phone.value,
    };
    const newTable = [...table];
    newTable.unshift(insertData);
    setTable(newTable);
  };

  function renderTableBody() {
    return Object.keys(tableData).map((key, index) => {
      return (
        <tr onClick={() => setSelectedRow(tableData[key])} key={tableData[key].id + '-' + index}>
          <th scope="row">{tableData[key].id}</th>
          <td>{tableData[key].firstName}</td>
          <td>{tableData[key].lastName}</td>
          <td>{tableData[key].email}</td>
          <td>{tableData[key].phone}</td>
        </tr>
      );
    });
  }

  return (
    <div className={classes.Table}>
      <div className="d-flex flex-wrap pt-4 pb-4">
        <Search
          onSearch={(value) => {
            setSearch(value);
          }}
        />
        <button
          type="button"
          className="btn btn-dark ml-5"
          onClick={() => setIsAddRowOpen(!isAddRowOpen)}>
          Добавить
        </button>
      </div>
      {isAddRowOpen && <AddRow onRowAddHandler={onRowAddHandler} />}
      {loading && <Loader />}
      <table className="table">
        <Header headers={headers} onSorting={(field, order) => setSorting({ field, order })} />
        <tbody>{renderTableBody()}</tbody>
      </table>
      <Pagination
        total={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
      {Object.keys(selectedRow).length !== 0 && <MoreInfo content={selectedRow} />}
    </div>
  );
}
