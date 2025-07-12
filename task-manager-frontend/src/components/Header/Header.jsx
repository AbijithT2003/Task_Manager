// frontend/src/components/Header.js
import React from 'react';
import { Search, Grid, List, Plus, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = ({
  projects,
  currentProject,
  onProjectChange,
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
  viewMode,
  onViewModeChange,
  members,
  onAddMember
}) => {
  const filterOptions = [
    { value: 'all', label: 'All tasks' },
    { value: 'todo', label: 'To Do' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <header className="header">
      <div className="header-left">
        {/* Project Dropdown */}
        <div className="project-dropdown">
          <select
            value={currentProject?.id || ''}
            onChange={(e) => {
              const project = projects.find(p => p.id === parseInt(e.target.value));
              onProjectChange(project);
            }}
            className="project-select"
          >
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="header-right">
        {/* View Mode Toggle */}
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

        {/* Add Member Button */}
        <button className="add-member-btn" onClick={onAddMember}>
          <Plus size={16} />
          Add member
        </button>

        {/* Member Avatars */}
        <div className="member-avatars">
          {members.slice(0, 5).map((member, index) => (
            <div key={member.id} className="member-avatar" style={{ zIndex: 5 - index }}>
              <img
                src={member.avatar || `https://ui-avatars.com/api/?name=${member.name}&background=random`}
                alt={member.name}
                title={member.name}
              />
            </div>
          ))}
          {members.length > 5 && (
            <div className="member-count">+{members.length - 5}</div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;