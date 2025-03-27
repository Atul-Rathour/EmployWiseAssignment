import React from 'react';

const UserFilter = ({ 
  searchTerm, 
  setSearchTerm, 
  showAdvancedFilters, 
  toggleAdvancedFilters, 
  filterCriteria, 
  setFilterCriteria, 
  sortBy, 
  setSortBy, 
  handleClearFilters,
  filteredUsers
}) => {
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search users by name or email..."
            className="w-full pl-10 pr-14 py-3 border-b-2 border-[#45054A] bg-white outline-none placeholder-gray-500"
          />
          <div className="absolute left-3 top-3 text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            onClick={toggleAdvancedFilters}
            className="absolute right-3 top-3 text-[#45054A] hover:text-[#5a0762] focus:outline-none transition duration-300 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
      </div>
      
      {showAdvancedFilters && (
        <div className="p-6 border-t border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="block text-sm font-medium text-[#45054A] mb-2">
                Filter by Name
              </p>
              <div className="relative">
                <select
                  value={filterCriteria}
                  onChange={handleFilterChange}
                  className="block w-full pl-3 pr-10 py-2 border-b-2 border-[#45054A] bg-white outline-none text-gray-800 cursor-pointer"
                >
                  <option value="all">All Users</option>
                  <option value="a-m">Names A-M</option>
                  <option value="n-z">Names N-Z</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#45054A]">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <p className="block text-sm font-medium text-[#45054A] mb-2">
                Sort by
              </p>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="block w-full pl-3 pr-10 py-2 border-b-2 border-[#45054A] bg-white outline-none text-gray-800 cursor-pointer"
                >
                  <option value="name_asc">Name (A-Z)</option>
                  <option value="name_desc">Name (Z-A)</option>
                  <option value="email_asc">Email (A-Z)</option>
                  <option value="email_desc">Email (Z-A)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#45054A]">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 flex items-end justify-end">
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center px-4 py-2 border-2 border-[#45054A] rounded-lg text-sm font-medium text-white bg-[#45054A] hover:bg-white hover:text-[#45054A] transition duration-500 cursor-pointer"
              >
                <svg className="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Reset Filters
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="px-6 py-3 border-t border-gray-100 bg-white text-sm text-gray-600 flex justify-between items-center">
        <span>
          {filteredUsers.length === 0 ? 'No users found' : 
            `Showing ${filteredUsers.length} ${filteredUsers.length === 1 ? 'user' : 'users'}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </span>
        {filterCriteria !== 'all' && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#45054A] text-white">
            {filterCriteria === 'a-m' ? 'Names A-M' : 'Names N-Z'}
          </span>
        )}
      </div>
    </div>
  );
};

export default UserFilter; 