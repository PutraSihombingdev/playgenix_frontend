import React from 'react';
import { Input } from 'antd';

const SearchBar = ({ onSearch }) => {
  return (
    <Input
      placeholder="Cari akun game..."
      onChange={e => onSearch(e.target.value)}
      style={{ marginBottom: '20px' }}
    />
  );
};

export default SearchBar;
