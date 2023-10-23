import React, { useState } from 'react';
import io from 'socket.io-client';
import Config from '../Config';
import Button from 'react-bootstrap/Button';

const baseUrl = Config.Common.QuestionApiBaseUrl;
var socketId = '';
const socket = io.connect(baseUrl); // connect to backend
socket.on('connect', () => {
  socketId = socket.id;
});

const FilterBar = ({ label, values, setValue, className }) => {
  const [selectedValue, setSelectedValue] = useState("")
  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
    setValue(event.target.value);
  };

  console.log('Selected', selectedValue)
  return (
    <div className={className + ' d-flex flex-row gap-3 align-items-center'}>
      <label htmlFor={label} className='col-sm-1'>{label}</label>
      <select id={label} value={selectedValue} onChange={handleSelectChange} className='w-25'>
        <option disabled selected value="">None</option>
        {values.map((value) => <option key={value} option={value}>{value}</option>)}
      </select>
      <Button variant="danger"
        onClick={() => { setSelectedValue(""); setValue("") }}>Clear Filter
      </Button>
    </div>
  );
};

export default FilterBar;
