// import React, { useState, useEffect } from 'react';
// import useApi from '../CustomHook/useApi';// Adjust the import path as needed

// const Searchapi = () => {
//     const [searchTerm, setSearchTerm] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');

//   // Fetch data using the useApi hook
//   const { data, loading, error, fetchData } = useApi();

//   useEffect(() => {
//     // Debounce the search query
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         setSearchQuery(searchTerm);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounceFn); // Cleanup debounce
//   }, [searchTerm]);

//   useEffect(() => {
//     if (searchQuery) {
//       fetchData({ url: `https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/search_user?search=${searchQuery}`, method: 'GET' });
//     }
//   }, [searchQuery, fetchData]);

//     return (
//         <div className="p-4">
//       <input
//         type="text"
//         placeholder="Search by name, email, or number..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="p-2 border rounded w-full"
//       />
//       {loading && <p>Loading...</p>}
//       {error && (
//         <div className="text-red-500">
//           <p>Failed to fetch users: {error.message}</p>
//           <p>Check the console for more details.</p>
//         </div>
//       )}
//       {data && data.items && Array.isArray(data.items) && data.items.length > 0 && (
//         <ul className="mt-4 space-y-2">
//           {data.items.map(user => (
//             <li key={user.id} className="p-2 border-b">
//               <p><strong>Name:</strong> {user.name}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Number:</strong> {user.number}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//       {data && data.items && !data.items.length && !loading && (
//         <p>No users found</p>
//       )}
//     </div>
//     );
// };

// export default Searchapi;


// import React, { useState, useEffect } from 'react';
// import useApi from '../CustomHook/useApi'; // Adjust the import path as needed
// import { useNavigate } from 'react-router-dom';

// const SearchUser = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const navigate = useNavigate();

//   const { data, loading, error, fetchData } = useApi();

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       if (searchTerm) {
//         setSearchQuery(searchTerm);
//       }
//     }, 500);

//     return () => clearTimeout(delayDebounceFn); // Cleanup debounce
//   }, [searchTerm]);

//   useEffect(() => {
//     if (searchQuery) {
//       const url = `https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/search_user?search=${encodeURIComponent(searchQuery)}`;
//       console.log('Fetching URL:', url); // Debug URL

//       fetchData({
//         url,
//         method: 'GET',
//         headers: {
//           'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
//           'type': 'superAdmin'
//         }
//       });
//     }
//   }, [searchQuery, fetchData]);

//   const handleUserClick = (user) => {
//     setSelectedUser(user);
//     navigate(`/chat/${user._id}`);
//   };

//   return (
//     <div className="p-4">
//       <input
//         type="text"
//         placeholder="Search by name, email, or number..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="p-2 border rounded w-full"
//       />
//       {loading && <p>Loading...</p>}
//       {error && (
//         <div className="text-red-500">
//           <p>Failed to fetch users: {error.message}</p>
//           <p>Check the console for more details.</p>
//         </div>
//       )}
//       {data && data.items && Array.isArray(data.items) && data.items.length > 0 && (
//         <ul className="mt-4 space-y-2">
//           {data.items.map(user => (
//             <li
//               key={user._id}
//               className="p-2 border-b cursor-pointer flex items-center justify-between"
//               onClick={() => handleUserClick(user)}
//             >
//               <p>{user.Number}</p> {/* Display only the number */}
//               <span className="text-gray-500">{user.Name}</span> {/* Optional: Display the name */}
//             </li>
//           ))}
//         </ul>
//       )}
//       {data && data.items && !data.items.length && !loading && (
//         <p>No users found</p>
//       )}
//       {selectedUser && (
//         <div>
//           <h2>Starting chat with {selectedUser.Name}</h2>
//           {/* Render the chat component or navigate to the chat page */}
//           {/* For example: <ChatComponent user={selectedUser} /> */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchUser;


import React, { useState, useEffect } from 'react';
import useApi from '../CustomHook/useApi'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const SearchUser = ({ addUserToList }) => { // Add a prop to update the UserList
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [groupUser,setGroupUser] = useState(null);
  const navigate = useNavigate();

  const { data, loading, error, fetchData } = useApi();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        setSearchQuery(searchTerm);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn); // Cleanup debounce
  }, [searchTerm]);

  useEffect(() => {
    if (searchQuery) {
      const url = `https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/search_user?search=${encodeURIComponent(searchQuery)}`;
      fetchData({
        url,
        method: 'GET',
        headers: {
          'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
          'type': 'superAdmin'
        }
      });
    }
  }, [searchQuery, fetchData]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setGroupUser(user);
    addUserToList(user); // Add the user to the list when clicking
    navigate(`/chat/${user._id}`); // Navigate to the chat with the selected user
  };

  return (
    <div className="">
      <input
        type="text"
        placeholder="Search by name, email, or number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border rounded w-full"
      />
      {loading && <p>Loading...</p>}
      {error && (
        <div className="text-red-500">
          <p>Failed to fetch users: {error.message}</p>
        </div>
      )}
      {data && data.items && Array.isArray(data.items) && data.items.length > 0 && (
        <ul className="mt-4 space-y-2">
          {data.items.map(user => (
            <li
              key={user._id}
              className="p-2 border-b cursor-pointer flex items-center justify-between"
              onClick={() => handleUserClick(user)}
            >
              <p>{user.Number}</p> {/* Display the number */}
              <span className="text-gray-500">{user.Name}</span> {/* Display the name */}
            </li>
          ))}
        </ul>
      )}
      {data && data.items && !data.items.length && !loading && (
        <p>No users found</p>
      )}
    </div>
  );
};

export default SearchUser;