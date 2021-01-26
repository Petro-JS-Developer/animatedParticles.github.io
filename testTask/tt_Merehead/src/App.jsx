import React from 'react';
import './App.css';
import { Pagination } from './Components/Pagination/Pagination';
import { Table } from './Components/Table/Table';
import { Form } from './Components/FormForAddNewUser/Form';

function App() {
  return (
    <div className="App">
      <div className="container2">
      <Table />
      <Form />
      </div>
      <Pagination />
    </div>
  );
}

export default App;
