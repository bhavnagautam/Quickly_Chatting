// import React, { useState, useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { login } from "../Redux/authAction"; // Adjust the path as needed
// import Usersgroup from "../Chatting/Usersgroup";
// import UserProfile from "./UserProfile";
// import { useParams } from "react-router-dom";
// import Searchapi from "./Searchapi";

// const ChatField = () => {
//   const [users, setUsers] = useState([]);
//   const [groups, setGroups] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const socketRef = useRef(null);
//   const dispatch = useDispatch();
//   const isAuthenticated = useSelector((state) => state.isAuthenticated);
//   const senderId =
//     useSelector((state) => state.userId) || localStorage.getItem("userId");
//   // console.log("Sender ID from Redux or localStorage:", senderId);
//   const senderName =
//     useSelector((state) => state.name) || localStorage.getItem("Name");
//   console.log("YourName:", senderName); // Optional if storing the name // Logged-in user’s name
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const { userId } = useParams();

//   // Fetch all users from API
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(
//           "https://quick-chat-staging-bt9wd.ondigitalocean.app/v1/user/getAllUsers",
//           {
//             method: "GET",
//             headers: {
//               token:
//                 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YzliMjkzMzNmZjA4YjVlZjE2ZGI3MCIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNzI1NjI4MzI1fQ.1Eqw34EoDT1f0HH0PFferIfJJsuEelPtaeHNUj0IJLE", // Or from Redux
//               type: "superAdmin", // Or from Redux
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         const data = await response.json();
//         setUsers(data.items);
//         const user = data.items.find((user) => user._id === userId);
//         setSelectedUser(user);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       }
//     };

//     fetchUsers();
//   }, [userId]);

//   // Handle WebSocket connection
//   useEffect(() => {
//     if (isAuthenticated && selectedUser) {
//       const websocketURL = `wss://quick-chat-staging-bt9wd.ondigitalocean.app?userId=${senderId}`;
//       socketRef.current = new WebSocket(websocketURL);

//       socketRef.current.onopen = () => {
//         console.log("WebSocket connection established");
//       };

//       socketRef.current.onerror = (error) => {
//         console.error("WebSocket Error:", error);
//       };

//       socketRef.current.onmessage = (event) => {
//         try {
//           const receivedMessage = JSON.parse(event.data);

//           if (receivedMessage.error) {
//             console.error("Error received from server:", receivedMessage.error);
//             // Optionally, display an error message to the user
//             return;
//           }

//           if (
//             receivedMessage.sender &&
//             receivedMessage.receiver &&
//             selectedUser
//           ) {
//             if (
//               (receivedMessage.sender === senderId &&
//                 receivedMessage.receiver === selectedUser._id) ||
//               (receivedMessage.receiver === senderId &&
//                 receivedMessage.sender === selectedUser._id)
//             ) {
//               setMessages((prevMessages) => [...prevMessages, receivedMessage]);
//             } else {
//               console.log("Message not for this user:", receivedMessage);
//             }
//           } else {
//             console.error(
//               "Received message with missing fields or no selected user:",
//               receivedMessage
//             );
//           }
//         } catch (error) {
//           console.error("Error handling WebSocket message:", error);
//         }
//       };

//       socketRef.current.onclose = (event) => {
//         console.error("WebSocket Closed:", event);
//       };

//       return () => {
//         socketRef.current.close();
//       };
//     }
//   }, [isAuthenticated, senderId, selectedUser]);

//   const checkDuplicateUser = (newUser) => {
//     return users.some(
//       (user) => user.email === newUser.email || user.number === newUser.number
//     );
//   };

//   const sendMessage = () => {
//     console.log("SenderID:", senderId);
//     if (
//       message.trim() !== "" &&
//       socketRef.current &&
//       socketRef.current.readyState === WebSocket.OPEN
//     ) {
//       if (senderId) {
//         const messageData = {
//           sender: senderId,
//           receiver: selectedUser._id,
//           content: message,
//         };

//         console.log("Sending message:", messageData);

//         try {
//           socketRef.current.send(JSON.stringify(messageData));
//           setMessages((prevMessages) => [...prevMessages, messageData]);
//           setMessage("");
//         } catch (error) {
//           console.error("Error sending message:", error);
//         }
//       } else {
//         console.error("Cannot send message. Missing sender ID.");
//       }
//     } else {
//       console.error("WebSocket is not open or message is invalid.");
//     }
//   };

//   const selectUserForChat = (user) => {
//     setSelectedUser(user);
//     setMessages([]);
//   };

//   if (!isAuthenticated) {
//     return <div>You need to log in to view the chat.</div>;
//   }

//   return (
//     <div className="flex h-screen relative">
//       {/* Left column: Users list */}
//       <div
//         className={`${
//           selectedUser ? "hidden" : "block"
//         } md:block w-full md:w-1/4 p-4 bg-white shadow-md overflow-y-auto`}
//       >
//         <div className="flex justify-between items-center text-md relative">
//           <span className="text-lg font-bold">{senderName}</span>
//           <div className="flex items-center relative">
//             <div className="relative">
//               <Usersgroup className="text cursor-pointer" />
//             </div>
//             <div className="relative ">
//               <UserProfile className="text cursor-pointer" />
//             </div>
//           </div>
//         </div>

//         {/* <div>
//       <Searchapi  />
//     </div> */}

//         {users && users.length > 0 ? (
//           users.map((user) => (
//             <div
//               key={user._id}
//               className="p-2 mb-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
//               onClick={() => selectUserForChat(user)}
//             >
//               {user.Name}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">No users found.</p>
//         )}

//         {groups.map((group) => (
//           <div
//             key={group._id}
//             className="p-2 mb-2 bg-gray-200 rounded-lg cursor-pointer hover:bg-gray-300"
//             onClick={() => selectUserForChat(group)} // Handle group selection
//           >
//             {group.name}
//           </div>
//         ))}
//       </div>

//       {/* Right column: Chat window */}
//       <div
//         className={`${
//           selectedUser ? "block" : "hidden"
//         } w-full md:w-3/4 p-4 bg-gray-100 flex flex-col justify-between`}
//       >
//         {selectedUser ? (
//           <>
//             {/* Chat header with selected user name */}
//             <div className="bg-blue-500 text-white p-3 rounded-md mb-4 shadow-lg">
//               {selectedUser.Name}
//             </div>

//             {/* Chat messages */}
//             <div className="flex-grow overflow-y-auto bg-white p-4 rounded-md shadow-lg mb-4">
//               {messages.length === 0 ? (
//                 <p className="text-gray-500">No messages yet.</p>
//               ) : (
//                 messages.map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`p-2 my-2 ${
//                       msg.sender === senderId
//                         ? "bg-blue-500 text-white self-end justify-end"
//                         : "bg-gray-300 text-black self-start justify-start"
//                     } rounded-lg max-w-xs`}
//                   >
//                     <strong>
//                       {msg.sender === senderId ? "" : msg.senderName}
//                     </strong>
//                     {msg.content}
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* Message input */}
//             <div className="flex items-center">
//               <input
//                 type="text"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
//                 placeholder={`Message ${selectedUser.Name}`}
//               />
//               <button
//                 onClick={sendMessage}
//                 className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
//               >
//                 Send
//               </button>
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500">Select a user to start chatting</p>
//         )}
//       </div>
//     </div>
//   );
// };
// export default ChatField;


import React, { useState } from "react";
import UserList from "../Chattinglist/UserList"; // Import UserList
import Chatwindow from "./Chatwindow"; // Import ChatWindow
import { useSelector } from "react-redux";


const ChatField = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isGroupChat,setIsGroupChat] = useState(null);
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <div>You need to log in to view the chat.</div>;
  }

  return (
    <div className="flex h-screen">
      {/* User List */}
      <UserList setSelectedUser={setSelectedUser} setIsGroupChat={setIsGroupChat}/>
      {/* Chat Window */}
      <Chatwindow selectedUser={selectedUser} setSelectedUser={setSelectedUser}
      isGroupChat={isGroupChat} setIsGroupChat={setIsGroupChat}
      />
    </div>
  );
};
export default ChatField;
