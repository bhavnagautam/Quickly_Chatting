// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const CreateUserGroup = () => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.token); // Get token from Redux store for authenticated requests

//   // State for user group details
//   const [groupDetails, setGroupDetails] = useState({
//     groupName: "",
//     description: "",
//     members: [],
//   });
//   const [allUsers, setAllUsers] = useState([]); // List of all available users
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Fetch the list of users to add them to the group
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           process.env.REACT_APP_GET_ALL_USERPROFILE_API_URL, // Replace with your API endpoint
//           {
//             headers: {
//               token:
//                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
//               type: "superAdmin",
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const data = await response.json();
//         if (response.ok) {
//           setAllUsers(data.items); // Assuming the API returns an array of users
//         } else {
//           setError(data.message);
//         }
//       } catch (error) {
//         setError("Failed to load users.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setGroupDetails({ ...groupDetails, [name]: value });
//   };

//   // Handle selecting group members
//   const handleSelectMember = (userId) => {
//     setGroupDetails((prevDetails) => {
//       const isSelected = prevDetails.members.includes(userId);
//       if (isSelected) {
//         return {
//           ...prevDetails,
//           members: prevDetails.members.filter((id) => id !== userId),
//         };
//       } else {
//         return {
//           ...prevDetails,
//           members: [...prevDetails.members, userId],
//         };
//       }
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch(
//         process.env.REACT_APP_CREATEGROUP_API_URL, // Replace with your API endpoint for creating groups
//         {
//           method: "POST",
//           headers: {
//             token:
//               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
//             type: "superAdmin",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(groupDetails),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setSuccess("Group created successfully!");
//         // Optionally, you can dispatch this data to Redux or reset the form
//         setGroupDetails({
//           groupName: "",
//           description: "",
//           members: [],
//         });
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError("Failed to create group.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Create User Group</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Group Name</label>
//           <input
//             type="text"
//             name="groupName"
//             value={groupDetails.groupName}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             name="description"
//             value={groupDetails.description}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Add Members</label>
//           <div className="border border-gray-300 rounded-lg p-2">
//             {Array.isArray(allUsers) &&
//               allUsers.map((user) => (
//                 <div key={user._id}>
//                   <input
//                     type="checkbox"
//                     checked={groupDetails.members.includes(user._id)}
//                     onChange={() => handleSelectMember(user._id)}
//                   />
//                   <label className="ml-2">{user.name}</label>
//                 </div>
//               ))}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded-lg w-full"
//         >
//           {loading ? "Creating..." : "Create Group"}
//         </button>
//       </form>
//     </div>
//   );
// };
// export default CreateUserGroup;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import GroupAddIcon from '@mui/icons-material/GroupAdd';

// const CreateUserGroup = () => {
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.token); // Get token from Redux store for authenticated requests
//   const userId = useSelector((state) => state.userId) || localStorage.getItem("userId"); // Get the logged-in userId

//   const [groupDetails, setGroupDetails] = useState({
//     name: "",
//     members: [], // IDs of selected members
//     createdBy: userId, // Automatically set from Redux
//   });
//   const [allUsers, setAllUsers] = useState([]); // List of all available users
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Fetch the list of users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(process.env.REACT_APP_GET_ALL_USERPROFILE_API_URL, {
//           method: "GET",
//           headers: {
//             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE", // Securely handle tokens from Redux
//             type: "superAdmin",
//             "Content-Type": "application/json",
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch users");
//         }
//         const data = await response.json();
//         setAllUsers(data.items);
//       } catch (error) {
//         setError("Error fetching users.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setGroupDetails({ ...groupDetails, [name]: value });
//   };

//   const handleSelectMember = (userId) => {
//     setGroupDetails((prevDetails) => {
//       const isSelected = prevDetails.members.includes(userId);
//       return {
//         ...prevDetails,
//         members: isSelected
//           ? prevDetails.members.filter((id) => id !== userId)
//           : [...prevDetails.members, userId],
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       console.log("Submitting Group Details:", groupDetails);  // Log the group details
//       const response = await fetch(process.env.REACT_APP_CREATEGROUP_API_URL, {
//         method: "POST",
//         headers: {
//           token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE", // Token from Redux
//           type: "superAdmin",
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(groupDetails), // Ensure groupDetails has correct values
//       });

//       const data = await response.json();
//       console.log("API Response:", data); // Log the API response

//       if (response.ok) {
//         setSuccess("Group created successfully!");
//         setGroupDetails({
//           name: "",
//           members: [],
//           createdBy: userId, // Reset createdBy for the current user
//         });
//       } else {
//         setError(data.message || "Failed to create group.");
//       }
//     } catch (error) {
//       console.log("Error:", error); // Log any error in the request
//       setError("Failed to create group.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">< GroupAddIcon /></h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Group Name</label>
//           <input
//             type="text"
//             name="name"
//             value={groupDetails.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700">Add Members</label>
//           <div className="border border-gray-300 rounded-lg p-2">
//             {loading ? (
//               <p>Loading users...</p>
//             ) : Array.isArray(allUsers) && allUsers.length ? (
//               allUsers.map((user) => (
//                 <div key={user._id}>
//                   <input
//                     type="checkbox"
//                     checked={groupDetails.members.includes(user._id)}
//                     onChange={() => handleSelectMember(user._id)}
//                   />
//                   <label className="ml-2">{user.name}</label>
//                 </div>
//               ))
//             ) : (
//               <p>No users available</p>
//             )}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded-lg w-full"
//         >
//           {loading ? "Creating..." : "Create Group"}
//         </button>
//       </form>
//     </div>
//   );
// };
// export default CreateUserGroup;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupAddIcon from "@mui/icons-material/GroupAdd";

const CreateUserGroup = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const userId =
    useSelector((state) => state.userId) || localStorage.getItem("userId");

  const [groupDetails, setGroupDetails] = useState({
    name: "",
    members: [],
    createdBy: userId,
  });

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // New state to control dropdown visibility

  // Fetch the list of users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          process.env.REACT_APP_GET_ALL_USERPROFILE_API_URL,
          {
            method: "GET",
            headers: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
              type: "superAdmin",
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setAllUsers(data.items);
      } catch (error) {
        setError("Error fetching users.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroupDetails({ ...groupDetails, [name]: value });
  };

  const handleSelectMember = (userId) => {
    setGroupDetails((prevDetails) => {
      const isSelected = prevDetails.members.includes(userId);
      return {
        ...prevDetails,
        members: isSelected
          ? prevDetails.members.filter((id) => id !== userId)
          : [...prevDetails.members, userId],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(process.env.REACT_APP_CREATEGROUP_API_URL, {
        method: "POST",
        headers: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
          type: "superAdmin",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupDetails),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Group created successfully!");
        setGroupDetails({
          name: "",
          members: [],
          createdBy: userId,
        });
      } else {
        setError(data.message || "Failed to create group.");
      }
    } catch (error) {
      setError("Failed to create group.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="relative">
    //   <h2 className="text-2xl font-bold">
    //     <GroupAddIcon
    //       onClick={() => setShowDropdown(!showDropdown)}
    //       className="cursor-pointer"
    //     />
    //   </h2>
    //   {showDropdown && (
    //     <div className="absolute top-10 right-0 w-80 p-4 bg-white shadow-lg rounded-lg z-10">
    //       <h3 className="text-lg font-bold mb-2">Create Group</h3>
    //       {loading && <p>Loading...</p>}
    //       {error && <p className="text-red-500">{error}</p>}
    //       {success && <p className="text-green-500">{success}</p>}

    //       <form onSubmit={handleSubmit}>
    //         <div className="mb-2">
    //           <label className="block text-gray-700">Group Name</label>
    //           <input
    //             type="text"
    //             name="name"
    //             value={groupDetails.name}
    //             onChange={handleChange}
    //             className="w-full h-8 p-2 border border-gray-300 rounded-lg"
    //             required
    //           />
    //         </div>

    //         <div className="mb-2">
    //           <label className="block text-gray-700">Add Members</label>
    //           <div className="border border-gray-300 rounded-lg p-2 pl-4 max-h-40 overflow-y-auto">
    //             {loading ? (
    //               <p>Loading users...</p>
    //             ) : Array.isArray(allUsers) && allUsers.length ? (
    //               allUsers.map((user) => (
    //                 <div key={user._id} className="mb-1">
    //                   <input
    //                     type="checkbox"
    //                     checked={groupDetails.members.includes(user._id)}
    //                     onChange={() => handleSelectMember(user._id)}
    //                   />
    //                   <label className="ml-2">{user.Name}</label>
    //                 </div>
    //               ))
    //             ) : (
    //               <p>No users available</p>
    //             )}
    //           </div>
    //         </div>

    //         <button
    //           type="submit"
    //           className="bg-blue-500 text-white rounded-lg w-full h-8"
    //         >
    //           {loading ? "Creating..." : "Create Group"}
    //         </button>
    //       </form>
    //     </div>
    //   )}
    // </div>
    <div className="relative">
  <h2 className="text-2xl">
    <GroupAddIcon
      onClick={() => setShowDropdown(!showDropdown)}
      className="cursor-pointer"
    />
  </h2>
  {showDropdown && (
    <div className="absolute top-full right-0 mt-2 w-80 p-4 bg-white shadow-lg rounded-lg z-10">
      <h3 className="text-md font-bold mb-2">Create Group</h3>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="block text-gray-700">Group Name</label>
          <input
            type="text"
            name="name"
            value={groupDetails.name}
            onChange={handleChange}
            className="w-full h-8 p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700">Add Members</label>
          <div className="border border-gray-300 rounded-lg p-2 pl-4 max-h-40 overflow-y-auto">
            {loading ? (
              <p>Loading users...</p>
            ) : Array.isArray(allUsers) && allUsers.length ? (
              allUsers.map((user) => (
                <div key={user._id} className="mb-1 flex items-center">
                  <input
                    type="checkbox"
                    checked={groupDetails.members.includes(user._id)}
                    onChange={() => handleSelectMember(user._id)}
                    className="mr-2"
                  />
                  <label>{user.Name}</label>
                </div>
              ))
            ) : (
              <p>No users available</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg w-full h-8 mt-2"
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
      </form>
    </div>
  )}
</div>

  );
};

export default CreateUserGroup;
