import React, { useState } from 'react';
import { Search, Grid, List, Plus, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  viewMode,
  onViewModeChange,
  categories,
  selectedCategory,
  onCategoryFilter,
  onAddTask
}) => {
  const [showAddDropdown, setShowAddDropdown] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All tasks' },
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

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
        {/* View Toggle */}
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`}
            onClick={() => onViewModeChange('kanban')}
          >
            <Grid size={16} />
          </button>
          <button
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
          >
            <List size={16} />
          </button>
        </div>

        {/* Filter Dropdown */}
        <div className="filter-dropdown">
          <select
            value={filterStatus}
            onChange={(e) => onFilterChange(e.target.value)}
            className="filter-select"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>
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
            onClick={() => setShowAddDropdown(!showAddDropdown)}
          >
            <Plus size={16} />
            <span>Add</span>
            <ChevronDown size={14} />
          </button>
          {showAddDropdown && (
            <div className="add-dropdown-menu">
              <button onClick={() => { onAddTask(); setShowAddDropdown(false); }}>
                Add Task
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
