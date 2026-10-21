import React from 'react';
import { PRIORITIES } from '../data';

const FilterBar = ({ search, setSearch, filterPriority, setFilterPriority }) => {
  return (
    <div className="filter-bar">
      <label htmlFor="search">Tìm kiếm</label>
      <input 
        id="search" 
        type="text" 
        value={search} 
        onChange={(e) => setSearch(e.target.value)} 
      />

      <label htmlFor="filterPriority">Mức ưu tiên</label>
      <select 
        id="filterPriority" 
        value={filterPriority} 
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="Tất cả">Tất cả</option>
        {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
    </div>
  );
};

export default FilterBar;