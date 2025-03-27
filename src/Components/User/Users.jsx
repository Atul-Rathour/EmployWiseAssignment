import React, { useState, useEffect } from 'react';
import { authApi } from '../../Utils/AxiosApis';
import Loading from '../Loading/Loading';
import UserFilter from './UserFilter';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState('name_asc');

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/';
      return;
    }

    fetchUsers(currentPage);
  }, [currentPage]);

  // Apply filtering and searching to users
  useEffect(() => {
    if (!users.length) return;
    
    let result = [...users];
    
    // Apply search
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      result = result.filter(user => 
        user.first_name.toLowerCase().includes(lowerCaseSearch) ||
        user.last_name.toLowerCase().includes(lowerCaseSearch) ||
        user.email.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply filter
    if (filterCriteria !== 'all') {
      if (filterCriteria === 'a-m') {
        result = result.filter(user => 
          user.first_name.toLowerCase().charAt(0) >= 'a' && 
          user.first_name.toLowerCase().charAt(0) <= 'm'
        );
      } else if (filterCriteria === 'n-z') {
        result = result.filter(user => 
          user.first_name.toLowerCase().charAt(0) >= 'n' && 
          user.first_name.toLowerCase().charAt(0) <= 'z'
        );
      }
    }
    
    // Apply sorting
    result = sortUsers(result, sortBy);
    
    setFilteredUsers(result);
  }, [users, searchTerm, filterCriteria, sortBy]);

  
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const sortUsers = (usersToSort, sortingOption) => {
    switch (sortingOption) {
      case 'name_asc':
        return [...usersToSort].sort((a, b) => 
          `${a.first_name} ${a.last_name}`.localeCompare(`${b.first_name} ${b.last_name}`)
        );
      case 'name_desc':
        return [...usersToSort].sort((a, b) => 
          `${b.first_name} ${b.last_name}`.localeCompare(`${a.first_name} ${a.last_name}`)
        );
      case 'email_asc':
        return [...usersToSort].sort((a, b) => a.email.localeCompare(b.email));
      case 'email_desc':
        return [...usersToSort].sort((a, b) => b.email.localeCompare(a.email));
      default:
        return usersToSort;
    }
  };

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
      const response = await authApi.get(`/api/users?page=${page}`);
      setUsers(response.data.data);
      setFilteredUsers(response.data.data);
      setTotalPages(response.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
      setLoading(false);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenValidity');
    window.location.href = '/';
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
    setFormData({
      first_name: '',
      last_name: '',
      email: ''
    });
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterCriteria('all');
    setSortBy('name_asc');
    setShowAdvancedFilters(false);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await authApi.put(`/api/users/${selectedUser.id}`, formData);
      console.log('Update response:', response.data);
      
      // Update user in local state
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      
      setSuccessMessage(`User ${formData.first_name} ${formData.last_name} updated successfully!`);
      closeEditModal();
    } catch (error) {
      console.error('Error updating user:', error);
      setError(`Failed to update user: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async () => {
    setIsSubmitting(true);
    
    try {
      await authApi.delete(`/api/users/${selectedUser.id}`);
      
      // Remove user from local state
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
      
      setSuccessMessage(`User ${selectedUser.first_name} ${selectedUser.last_name} deleted successfully!`);
      closeDeleteModal();
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(`Failed to delete user: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {(loading && users.length === 0) && <Loading />}
      {isSubmitting && <Loading />}
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#45054A]">Users List</h1>
          <button 
            onClick={handleLogout}
            className="bg-[#45054A] text-white px-4 py-2 rounded hover:bg-[#5a0762] transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex justify-between">
            <span>{successMessage}</span>
            <button onClick={() => setSuccessMessage('')} className="font-bold cursor-pointer">×</button>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between">
            <span>{error}</span>
            <button onClick={() => setError('')} className="font-bold cursor-pointer">×</button>
          </div>
        )}

        
        <UserFilter 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          showAdvancedFilters={showAdvancedFilters}
          toggleAdvancedFilters={() => setShowAdvancedFilters(!showAdvancedFilters)}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleClearFilters={handleClearFilters}
          filteredUsers={filteredUsers}
        />

        {filteredUsers.length === 0 && !loading ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
            <svg className="mx-auto h-12 w-12 text-[#45054A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-[#45054A]">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
            <div className="mt-6">
              <button
                onClick={handleClearFilters}
                className="inline-flex items-center px-4 py-2 border-2 border-[#45054A] rounded-lg text-sm font-medium text-white bg-[#45054A] hover:bg-white hover:text-[#45054A] transition duration-500 cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {filteredUsers.map(user => (
              <div key={user.id} className="group relative overflow-hidden rounded-2xl">

                <div className="absolute inset-0 bg-gradient-to-br from-[#45054A]/80 via-[#45054A]/40 to-black/30 z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm z-0"></div>
                <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm z-0"></div>
                
                <img 
                  src={user.avatar} 
                  alt={`${user.first_name} ${user.last_name}`} 
                  className="absolute inset-0 w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                
                <div className="relative h-80 flex flex-col justify-end p-6 z-20">
                  <div className="backdrop-blur-sm bg-white/10 rounded-xl p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h2 className="text-xl font-bold text-white">{user.first_name} {user.last_name}</h2>
                        <p className="text-white/80 text-sm truncate">{user.email}</p>
                      </div>
                      <div className="bg-[#45054A] rounded-full p-2 shadow-lg hidden group-hover:block animate-fadeIn">
                        <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 gap-3">
                      <button 
                        onClick={() => openEditModal(user)} 
                        className="w-1/2 group-hover:bg-white group-hover:text-[#45054A] group-hover:bg-opacity-20 border border-white/30 text-white rounded-lg px-3 py-2 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-white hover:text-[#45054A] cursor-pointer"
                      >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => openDeleteModal(user)} 
                        className="w-1/2 group-hover:bg-white group-hover:text-[#45054A] group-hover:bg-opacity-20 border border-white/30 text-white rounded-lg px-3 py-2 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-[#45054A] hover:border-[#45054A] cursor-pointer"
                      >
                        <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!searchTerm && filterCriteria === 'all' && (
          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handlePrevPage} 
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg border-2 ${currentPage === 1 ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#45054A] text-[#45054A] hover:bg-[#45054A] hover:text-white transition-colors duration-300 cursor-pointer'}`}
              >
                Previous
              </button>
              <button 
                onClick={handleNextPage} 
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg border-2 ${currentPage === totalPages ? 'border-gray-200 text-gray-300 cursor-not-allowed' : 'border-[#45054A] text-[#45054A] hover:bg-[#45054A] hover:text-white transition-colors duration-300 cursor-pointer'}`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        <EditUserModal 
          showEditModal={showEditModal}
          selectedUser={selectedUser}
          formData={formData}
          handleInputChange={handleInputChange}
          handleUpdateUser={handleUpdateUser}
          closeEditModal={closeEditModal}
          isSubmitting={isSubmitting}
        />

        <DeleteUserModal 
          showDeleteModal={showDeleteModal}
          selectedUser={selectedUser}
          handleDeleteUser={handleDeleteUser}
          closeDeleteModal={closeDeleteModal}
          isSubmitting={isSubmitting}
        />
      </div>
    </>
  );
};

export default Users; 