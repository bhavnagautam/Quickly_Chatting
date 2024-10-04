import React, { useState } from 'react';

const GroupChatMenu = ({ groupId, token }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the dropdown menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle API calls for each action
  const handleAddMember = async () => {
    try {
      const response = await fetch('https://quick-chat-staging-btwd.ondigtalocean.app/v1/group/add-member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",  // pass token here
          type:"superAdmin"
        },
        body: JSON.stringify({ groupId, memberId: 'newMemberId' }),  // Replace 'newMemberId' with actual value
      });
      const data = await response.json();
      console.log('Member added:', data);
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  const handleRemoveMember = async () => {
    try {
      const response = await fetch('https://quick-chat-staging-btwd.ondigtalocean.app/v1/group/remove-member', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",  // pass token here
            type:"superAdmin"
          },
        body: JSON.stringify({ groupId, memberId: 'removeMemberId' }),  // Replace 'removeMemberId' with actual value
      });
      const data = await response.json();
      console.log('Member removed:', data);
    } catch (error) {
      console.error('Error removing member:', error);
    }
  };

  const handleDeleteGroup = async () => {
    try {
      const response = await fetch('https://quick-chat-staging-btwd.ondigtalocean.app/v1/group/delete_group', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",  // pass token here
            type:"superAdmin"
          },
        body: JSON.stringify({ groupId }),
      });
      const data = await response.json();
      console.log('Group deleted:', data);
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Three-dot menu button */}
      <button onClick={toggleMenu} className="inline-flex w-full p-2 text-md font-medium text-white rounded-full">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="1.5" />
          <circle cx="12" cy="12" r="1.5" />
          <circle cx="12" cy="19" r="1.5" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isMenuOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <button onClick={handleAddMember} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Add Member
            </button>
            <button onClick={handleRemoveMember} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Remove Member
            </button>
            <button onClick={handleDeleteGroup} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              Delete Group
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default GroupChatMenu;
