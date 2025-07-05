import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const FilterBar = () => {
  const handleFilter = value => {
    console.log('Filter by:', value);
  };

  return (
    <Select
      placeholder="Filter Game"
      onChange={handleFilter}
      style={{ width: 200, marginBottom: '20px' }}
    >
      <Option value="Valorant">Valorant</Option>
      <Option value="Mobile Legend">Mobile Legend</Option>
      <Option value="PUBG">PUBG</Option>
    </Select>
  );
};

export default FilterBar;
