import React from 'react';
import BG from '../../assets/Group-725.png';

const DeleteUserModal = ({ 
  showDeleteModal,
  selectedUser,
  handleDeleteUser,
  closeDeleteModal,
  isSubmitting 
}) => {
  return (
    <>
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 w-screen h-screen bg-opacity-50 flex items-center justify-center z-50">
          <img src={BG} alt="Background" className="w-full h-full object-cover absolute top-0 left-0 z-9" />
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 w-full max-w-md z-10">
            <h2 className="text-xl font-bold mb-4 text-[#45054A]">Delete User</h2>
            <p className="mb-6 text-white">
              Are you sure you want to delete {selectedUser.first_name} {selectedUser.last_name}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 text-[#45054A] border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={isSubmitting}
                className="bg-[#45054A] text-white border-2 border-[#45054A] rounded-lg px-4 py-2 transition duration-500 hover:bg-white hover:text-[#45054A] cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUserModal; 