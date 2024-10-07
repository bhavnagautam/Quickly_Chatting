import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "../Chatting/UserProfile";
import Usersgroup from "../Chatting/Usersgroup";
import SearchUser from "./SearchUser";
import { useSelector } from "react-redux";

const UserList = ({ setSelectedUser, setIsGroupChat }) => {
  const [oneToOneChats, setOneToOneChats] = useState([]);
  const [groupChats, setGroupChats] = useState([]);
  const { userId, groupId } = useParams();

  const loggedInUserId =
    useSelector((state) => state.userId) || localStorage.getItem("userId");

  const addUserToList = (user) => {
    // If the user is already in the one-to-one chats, do not add again
    const isAlreadyInChats = oneToOneChats.some(
      (chat) => chat._id === user._id
    );

    if (!isAlreadyInChats) {
      setOneToOneChats((prevChats) => [...prevChats, user]); // Add user to the one-to-one chats
    }
  };

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(
          `https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/sender/${loggedInUserId}`,
          {
            method: "GET",
            headers: {
              token:
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE", // Replace with your actual token or retrieve from Redux
              type: "superAdmin",
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setOneToOneChats(data.oneToOneChats || []); // Store 1-to-1 chats
        setGroupChats(data.groupChats || []); // Store group chats
        // console.log(data.groupChats,"dat")
        const user = data?.find((user) => user._id === userId);
        setSelectedUser(user);
        setIsGroupChat(user);
      } catch (error) {
        console.error("Error fetching users and groups:", error);
      }
    };

    fetchChats();
  }, [loggedInUserId, userId, groupId, setSelectedUser, setIsGroupChat]);

  // const handleUserClick = (user) => {
  //   console.log(user,"users.");
  //   setSelectedUser(user);
  //   setIsGroupChat(user);
  // };

  const handleUserClick = (user) => {
    setSelectedUser(user);

    // Check if the chat is a group chat and set `setIsGroupChat` accordingly
    if (user.type === "group") {
      setIsGroupChat(true);
    } else {
      setIsGroupChat(false);
    }
  };

  return (
    <div className="w-full md:w-1/4 p-4 bg-white shadow-md overflow-y-auto">
      <div className="flex justify-between items-center text-md relative">
        <span className="text-lg font-bold">Messages</span>
        <div className="flex items-center relative">
          <div className="relative">
            <Usersgroup className="text cursor-pointer" />
          </div>
          <div className="relative ">
            <UserProfile className="text cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="relative ">
        <SearchUser
          addUserToList={addUserToList}
          className="text cursor-pointer w-full rounded border"
        />
      </div>
      <div className="pt-4">
        {/* Combine One-to-One and Group Chats */}
        {[...oneToOneChats, ...groupChats].length > 0 && (
          <table className="table-auto w-full border-collapse ">
            <tbody>
              {[...oneToOneChats, ...groupChats]
                .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                .map((chat) => (
                  <tr
                    key={chat._id}
                    className="cursor-pointer hover:bg-gray-300"
                    onClick={() => handleUserClick(chat)}
                  >
                    <td className="p-2 border-b bg-white">
                      {chat.name} {chat.isGroup ? "" : ""}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Show message if no chats are available */}
      {oneToOneChats.length === 0 && groupChats.length === 0 && (
        <p className="text-gray-500">No chats found.</p>
      )}
    </div>
  );
};
export default UserList;

// const UserList = ({ setSelectedUser, setIsGroupChat }) => {
//   const [oneToOneChats, setOneToOneChats] = useState([]);
//   const [groupChats, setGroupChats] = useState([]);
//   const { userId, groupId } = useParams();

//   const loggedInUserId =
//     useSelector((state) => state.userId) || localStorage.getItem("userId");

//   const addUserToList = (user) => {
//     // If the user is already in the one-to-one chats, do not add again
//     const isAlreadyInChats = oneToOneChats.some(
//       (chat) => chat._id === user._id
//     );

//     if (!isAlreadyInChats) {
//       setOneToOneChats((prevChats) => [...prevChats, user]); // Add user to the one-to-one chats
//     }
//   };

//   const fetchChats = async () => {
//     try {
//       const response = await fetch(
//         `https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/sender/${loggedInUserId}`,
//         {
//           method: "GET",
//           headers: {
//             token:
//               "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE", // Replace with your actual token or retrieve from Redux
//             type: "superAdmin",
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       console.log("API Response:", data); // Log the entire response

//       setOneToOneChats(data.oneToOneChats || []); // Store 1-to-1 chats
//       setGroupChats(data.groupChats || []); // Store group chats

//       // If you are trying to find a specific user from a list, ensure you're targeting an array
//       const user =
//         data.oneToOneChats?.find((user) => user._id === userId) || null;
//       setSelectedUser(user);
//       setIsGroupChat(user?.type === "group"); // Only set as group if the type is 'group'
//     } catch (error) {
//       console.error("Error fetching users and groups:", error);
//     }
//   };

//   useEffect(() => {
//     fetchChats();
//   }, [userId, groupId]);

//   const handleUserClick = (user) => {
//     console.log(user, "selected chat.");
//     setSelectedUser(user);

//     // Check if the chat is a group chat and set `setIsGroupChat` accordingly
//     if (user.type === "group") {
//       setIsGroupChat(true);
//     } else {
//       setIsGroupChat(false);
//     }
//   };

//   return (
//     <div className="w-full md:w-1/4 p-4 bg-white shadow-md overflow-y-auto">
//       <div className="flex justify-between items-center text-md relative">
//         <span className="text-lg font-bold">Messages</span>
//         <div className="flex items-center relative">
//           <div className="relative">
//             <Usersgroup className="text cursor-pointer" />
//           </div>
//           <div className="relative">
//             <UserProfile className="text cursor-pointer" />
//           </div>
//         </div>
//       </div>

//       <div className="relative">
//         <SearchUser
//           addUserToList={addUserToList}
//           className="text cursor-pointer w-full rounded border"
//         />
//       </div>
//       <div className="pt-4">
//         {/* Combine One-to-One and Group Chats */}
//         {[...oneToOneChats, ...groupChats].length > 0 && (
//           <table className="table-auto w-full border-collapse">
//             <tbody>
//               {[...oneToOneChats, ...groupChats]
//                 .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
//                 .map((chat) => (
//                   <tr
//                     key={chat._id}
//                     className="cursor-pointer hover:bg-gray-300"
//                     onClick={() => handleUserClick(chat)}
//                   >
//                     <td className="p-2 border-b bg-white">
//                       {chat.name} {chat.isGroup ? "(Group)" : ""}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Show message if no chats are available */}
//       {oneToOneChats.length === 0 && groupChats.length === 0 && (
//         <p className="text-gray-500">No chats found.</p>
//       )}
//     </div>
//   );
// };
// export default UserList;
