import React from 'react';
import BG from '../../assets/Group-725.png';

const EditUserModal = ({ 
  showEditModal, 
  selectedUser, 
  formData, 
  handleInputChange, 
  handleUpdateUser, 
  closeEditModal, 
  isSubmitting 
}) => {
  return (
    <>
      {showEditModal && (
        <div className="fixed inset-0 w-screen h-screen bg-opacity-50 flex items-center justify-center z-50">
          <img src={BG} alt="Background" className="w-full h-full object-cover absolute top-0 left-0 z-9" />
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 w-full max-w-md z-10">
            <h2 className="text-xl font-bold mb-4 text-[#45054A]">Edit User</h2>
            <form onSubmit={handleUpdateUser}>
              <div className="mb-6">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="w-full h-10 sm:h-[5vh] outline-none border-b-2 border-[#45054A] mt-2 bg-transparent text-white  placeholder-white"
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="w-full h-10 sm:h-[5vh] outline-none border-b-2 border-[#45054A] mt-2 bg-transparent text-white  placeholder-white"
                  required
                />
              </div>
              <div className="mb-8">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full h-10 sm:h-[5vh] outline-none border-b-2 border-[#45054A] mt-2 bg-transparent text-white  placeholder-white"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="px-4 py-2 text-[#45054A] border-2 border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#45054A] text-white border-2 border-[#45054A] rounded-lg px-4 py-2 transition duration-500 hover:bg-white hover:text-[#45054A] cursor-pointer"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditUserModal; 