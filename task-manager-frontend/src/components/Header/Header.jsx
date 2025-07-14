//import React, { useState } from 'react';
import { Search, Grid, List, Plus, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = ({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryFilter,
  onAddTask
}) => {


  return (
    <header className="header">
      <div className="header-left">
        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        

        {/* Category Filter Dropdown */}
        <div className="filter-dropdown">
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>

        {/* Add Task Button */}
        <div className="add-dropdown">
          <button 
            className="add-btn" 
            onClick={onAddTask}
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
