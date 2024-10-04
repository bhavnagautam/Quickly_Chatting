// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux"; // For authentication state management

// const UserProfile = () => {
//   const dispatch = useDispatch();
//   const userId = useSelector((state) => state.userId); // Get the logged-in user's ID from Redux
//   const token = useSelector((state) => state.token);
//   const email= useSelector((state) => state.email) // Token for making API requests

//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Fetch existing user profile data when component loads
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/getUserProfile/:email${email}`, // Replace with your API URL
//           {
//             method: "GET",
//             headers: {
//               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
//               type: "superAdmin",
//               "Content-Type":"application/json"
//             },
//           }
//         );
//         const data = await response.json();
//         if (response.ok) {
//           setUserData({
//             name: data.name || "",
//             email: data.email || "",
//             phone: data.phone || "",
//           });
//         } else {
//           setError(data.message);
//         }
//       } catch (error) {
//         setError("Failed to fetch user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId && token) {
//       fetchUserProfile();
//     }
//   }, [userId, token]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   // Handle form submission for profile updates
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch(
//         process.env.REACT_APP_USERUPDATE_PROFILE_API_URL, // Replace with your update API URL
//         {
//           method: "POST",
//           headers: {
//             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
//             type:"superAdmin",
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(userData),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setSuccess("Profile updated successfully!");
//         // Optionally update user info in Redux if needed
//         dispatch({ type: "UPDATE_USER_PROFILE", payload: data });
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={userData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Phone</label>
//           <input
//             type="tel"
//             name="phone"
//             value={userData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded-lg w-full"
//         >
//           {loading ? "Updating..." : "Update Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UserProfile;

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { logout } from '../Redux/authAction'; // Adjust path to your authAction file

// const UserProfile = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const userId = useSelector((state) => state.userId);
//   const token = useSelector((state) => state.token);
//   const email = useSelector((state) => state.email);

// console.log({ userId, email, token }); // Check if these values are correct

//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Fetch existing user profile data when component loads
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/getUserProfile/:email${email}`, // Replace with your API URL
//           {
//             method: "GET",
//             headers: {
//               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
//               type: "superAdmin",
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const data = await response.json();
//         if (response.ok) {
//           setUserData({
//             name: data.name || "",
//             email: data.email || "",
//             phone: data.phone || "",
//           });
//         } else {
//           setError(data.message);
//         }
//       } catch (error) {
//         setError("Failed to fetch user data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId && token) {
//       fetchUserProfile();
//     }
//   }, [userId, token, email]);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData({ ...userData, [name]: value });
//   };

//   // Handle form submission for profile updates
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSuccess(null);

//     try {
//       const response = await fetch(
//         process.env.REACT_APP_USERUPDATE_PROFILE_API_URL, // Replace with your update API URL
//         {
//           method: "POST",
//           headers: {
//             token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
//             type: "superAdmin",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(userData),
//         }
//       );
//       const data = await response.json();
//       if (response.ok) {
//         setSuccess("Profile updated successfully!");
//         // Optionally update user info in Redux if needed
//         dispatch({ type: "UPDATE_USER_PROFILE", payload: data });
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError("Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     dispatch(logout());
//     localStorage.removeItem("token");
//     localStorage.removeItem("email");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("userName");
//     navigate('/'); // Redirect to home or login page after logout
//   };

//   return (
//     <div className="max-w-md mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
//       {success && <p className="text-green-500">{success}</p>}

//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={userData.name}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={userData.email}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Phone</label>
//           <input
//             type="tel"
//             name="phone"
//             value={userData.phone}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded-lg w-full mb-4"
//         >
//           {loading ? "Updating..." : "Update Profile"}
//         </button>
//       </form>

//       <button
//         onClick={handleLogout}
//         className="bg-red-500 text-white p-2 rounded-lg w-full"
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default UserProfile;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../Redux/authAction"; // Adjust path to your authAction file
import { FaEllipsisV, FaEdit } from "react-icons/fa";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepPurple } from "@mui/material/colors"; // Import an icon for editing
import UserList from "../Chattinglist/UserList";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useSelector((state) => state.userId);
  const token = useSelector((state) => state.token);
  const email = useSelector((state) => state.email);
  // console.log({ userId, email, token }); // Check if these values are correct

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    companyId: "", // Added companyId to the userData
  });
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  // Fetch existing user profile data when component loads
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/getUserProfile/${email}`, // Replace with your API URL
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
        const data = await response.json();
        if (response.ok) {
          setUserData({
            name: data.items.Name || "",
            email: data.items.Email || "",
            phone: data.items.Number || "",
            companyId: data.items.companyId || "", // Added companyId
          });
          // localStorage.setItem("Name:",userData.name);
          console.log("UserData:", data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    if (userId && token) {
      fetchUserProfile();
    }
  }, [userId, token, email]);
  localStorage.setItem("Name", userData.name);

  // Handle form input changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission for profile updates
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch(
        process.env.REACT_APP_USERUPDATE_PROFILE_API_URL, // Replace with your update API URL
        {
          method: "POST",
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE",
            type: "superAdmin",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setSuccess("Profile updated successfully!");
        dispatch({ type: "UPDATE_USER_PROFILE", payload: data });
        setIsEditing(false); // Exit edit mode
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("Name");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/"); // Redirect to home or login page after logout
  };

  return (
    // <div className="max-w-md mx-auto p-4">
    //   <div className="flex justify-end">
    //     {/* Three-dot menu (dropdown button) */}
    //     {/* <FaEllipsisV
    //       className="text-gray-600 cursor-pointer"
    //       onClick={() => setIsProfileOpen(!isProfileOpen)} // Toggle profile visibility
    //     /> */}
    //     <Stack direction="row">
    //       <Avatar sx={{ bgcolor: deepPurple[500] }}
    //       onClick={() => setIsProfileOpen(!isProfileOpen)}
    //       ></Avatar>
    //     </Stack>
    //   </div>

    //   {/* Conditional rendering of user profile based on dropdown state */}
    //   {isProfileOpen && (
    //     <div className="border p-4 rounded-lg shadow-md mt-2">
    //       {loading && <p>Loading...</p>}
    //       {error && <p className="text-red-500">{error}</p>}
    //       {success && <p className="text-green-500">{success}</p>}

    //       <div className="flex justify-between items-center mb-4">
    //         <h2 className="text-2xl mb-4">{userData.name}</h2>
    //         <FaEdit
    //           onClick={() => setIsEditing(!isEditing)}
    //           className="text-blue-500 cursor-pointer"
    //         />
    //       </div>

    //       {isEditing ? (
    //         <form onSubmit={handleSubmit}>
    //           <div className="mb-4">
    //             <label className="block text-gray-700">Name</label>
    //             <input
    //               type="text"
    //               name="name"
    //               value={userData.name}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-lg"
    //               required
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700">Email</label>
    //             <input
    //               type="email"
    //               name="email"
    //               value={userData.email}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-lg"
    //               required
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700">Phone</label>
    //             <input
    //               type="tel"
    //               name="phone"
    //               value={userData.phone}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-lg"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700">Company ID</label>
    //             <input
    //               type="text"
    //               name="companyId"
    //               value={userData.companyId}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-lg"
    //             />
    //           </div>
    //           <button
    //             type="submit"
    //             className="bg-blue-500 text-white p-2 rounded-lg w-full mb-4"
    //           >
    //             {loading ? "Updating..." : "Update Profile"}
    //           </button>
    //         </form>
    //       ) : (
    //         <div>
    //           <p>
    //             <strong>Name:</strong> {userData.name}
    //           </p>
    //           <p>
    //             <strong>Email:</strong> {userData.email}
    //           </p>
    //           <p>
    //             <strong>Phone:</strong> {userData.phone}
    //           </p>
    //           <p>
    //             <strong>Company ID:</strong> {userData.companyId}
    //           </p>
    //         </div>
    //       )}
    //       <button
    //         onClick={handleLogout}
    //         className="bg-red-500 text-white rounded-lg w-full h-8 mt-4"
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   )}
    // </div>
    //   <div className="relative max-w-md sm:max-w-full lg:max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
    //     {/* <ChatField username={userData.name} /> */}
    //   <div className="flex justify-end">
    //     <Stack direction="row">
    //       {/* Avatar Button */}
    //       <Avatar
    //         sx={{ bgcolor: deepPurple[500] }}
    //         onClick={() => setIsProfileOpen(!isProfileOpen)}
    //       />
    //     </Stack>
    //   </div>

    //   {/* Conditional rendering of the user profile based on dropdown state */}
    //   {isProfileOpen && (
    //     <div className="absolute top-full right-0 mt-2 border p-4 sm:p-6 lg:p-8 rounded-lg shadow-md z-50 bg-white">
    //       {loading && <p>Loading...</p>}
    //       {error && <p className="text-red-500">{error}</p>}
    //       {success && <p className="text-green-500">{success}</p>}

    //       <div className="flex justify-between items-center mb-4">
    //         <h2 className="text-xl sm:text-2xl lg:text-3xl mb-4">{userData.name}</h2>
    //         <FaEdit
    //           onClick={() => setIsEditing(!isEditing)}
    //           className="text-blue-500 cursor-pointer"
    //         />
    //       </div>

    //       {isEditing ? (
    //         <form onSubmit={handleSubmit}>
    //           <div className="mb-4">
    //             <label className="block text-gray-700">Name</label>
    //             <input
    //               type="text"
    //               name="name"
    //               value={userData.name}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-lg"
    //               required
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700">Email</label>
    //             <input
    //               type="email"
    //               name="email"
    //               value={userData.email}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-lg"
    //               required
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700">Phone</label>
    //             <input
    //               type="tel"
    //               name="phone"
    //               value={userData.phone}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-lg"
    //             />
    //           </div>
    //           <div className="mb-4">
    //             <label className="block text-gray-700">Company ID</label>
    //             <input
    //               type="text"
    //               name="companyId"
    //               value={userData.companyId}
    //               onChange={handleChange}
    //               className="w-full p-2 border border-gray-300 rounded-lg"
    //             />
    //           </div>
    //           <button
    //             type="submit"
    //             className="bg-blue-500 text-white p-2 rounded-lg w-full mb-4"
    //           >
    //             {loading ? "Updating..." : "Update Profile"}
    //           </button>
    //         </form>
    //       ) : (
    //         <div>
    //           <p>
    //             <strong>Name:</strong> {userData.name}
    //           </p>
    //           <p>
    //             <strong>Email:</strong> {userData.email}
    //           </p>
    //           <p>
    //             <strong>Phone:</strong> {userData.phone}
    //           </p>
    //           <p>
    //             <strong>Company ID:</strong> {userData.companyId}
    //           </p>
    //         </div>
    //       )}
    //       <button
    //         onClick={handleLogout}
    //         className="bg-red-500 text-white rounded-lg w-full h-10 mt-4"
    //       >
    //         Logout
    //       </button>
    //     </div>
    //   )}
    // </div>
    <div className="relative max-w-md sm:max-w-full lg:max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Avatar Button */}
      <div className="flex justify-end">
        <Stack direction="row">
          <Avatar
            sx={{ bgcolor: deepPurple[500] }}
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="cursor-pointer"
          />
        </Stack>
      </div>

      {/* Conditional rendering of the user profile */}
      {isProfileOpen && (
        <div className="absolute top-full right-0 mt-2 border p-4 sm:p-6 lg:p-8 rounded-lg shadow-md z-50 bg-white w-72 sm:w-96 lg:w-112">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl sm:text-2xl lg:text-2xl">{userData.name}</h2>
            <FaEdit
              onClick={() => setIsEditing(!isEditing)}
              className="text-blue-500 cursor-pointer"
            />
          </div>

          {isEditing ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                   name="name"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your name"
                  value={userData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Company ID</label>
                <input
                  type="text"
                  name="companyId"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="Enter your company ID"
                  value={userData.companyId}
                  onChange={handleChange}
                />
              </div>
              <button className="bg-blue-500 text-white p-2 rounded-lg w-full"
               type="submit"
              >
                Update Profile
              </button>
            </form>
          ) : (
            <div className="space-y-2 text-gray-500">
              <p>
                <strong className="text-black">Name:</strong> {userData.name}
              </p>
              <p>
                <strong className="text-black">Email:</strong> {userData.email}
              </p>
              <p>
                <strong className="text-black">Phone:</strong> {userData.phone}
              </p>
              <p>
                <strong className="text-black">Company ID:</strong>{" "}
                {userData.companyId}
              </p>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white p-2 rounded-lg w-full mt-4"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default UserProfile;
