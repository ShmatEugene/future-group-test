import React from 'react';
import Table from './components/DataTable/Table';
import NavBar from './components/NavBar/NavBar';

function App() {
  const [selectedDataType, setSelectedDataType] = React.useState('');

  let link = '';
  if (selectedDataType === 'small') {
    link =
      'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
  } else if (selectedDataType === 'big') {
    link =
      'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
  }
  return (
    <div className="container">
      <NavBar onSelectDataType={(type) => setSelectedDataType(type)} active={selectedDataType} />
      <Table link={link || ''} />
    </div>
  );
}

export default App;
