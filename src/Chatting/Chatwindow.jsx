// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import GroupChatMenu from "../Chattinglist/GroupChatMenu";

// const ChatWindow = ({ selectedUser, isGroupChat }) => {
//   const [messagesMap, setMessagesMap] = useState({}); // Store chat history per user or group
//   const [message, setMessage] = useState("");
//   const socketRef = useRef(null);

//   const senderId =
//     useSelector((state) => state.userId) || localStorage.getItem("userId");

//   // WebSocket connection to handle chat messages and chat history
//   useEffect(() => {
//     if (selectedUser) {
//       const websocketURL = isGroupChat
//       ? `wss://quick-chat-staging-bt9wd.ondigitalocean.app?userId=${senderId}&groupId=${selectedUser._id}`
//       : `wss://quick-chat-staging-bt9wd.ondigitalocean.app?userId=${senderId}&receiverId=${selectedUser._id}`; 

//       if (!socketRef.current) {
//         socketRef.current = new WebSocket(websocketURL);

//         socketRef.current.onopen = () => {
//           console.log("WebSocket connection established");

//           // Request chat history when the connection is opened
//           socketRef.current.send(
//             JSON.stringify({
//               type: isGroupChat ? "group_history" : "1to1_history",
//               userId: senderId,
//               [isGroupChat ? "groupId" : "receiverId"]: selectedUser._id,
//             })
//           );
//         };

//         socketRef.current.onerror = (error) => {
//           console.error("WebSocket Error:", error);
//         };

//         socketRef.current.onmessage = (event) => {
//           const receivedMessage = JSON.parse(event.data);

//           if (receivedMessage.type === (isGroupChat ? "group_history" : "1to1_history")) {
//             // Handle chat history for selected user or group
//             setMessagesMap((prevMessagesMap) => ({
//               ...prevMessagesMap,
//               [selectedUser._id]: receivedMessage.messages,
//             }));
//           } else if (
//             (receivedMessage.sender === senderId && !isGroupChat) ||
//             (receivedMessage.receiver === senderId && !isGroupChat) ||
//             (receivedMessage.groupId === selectedUser._id && isGroupChat)
//           ) {
//             // Handle real-time chat messages for the current user or group
//             setMessagesMap((prevMessagesMap) => ({
//               ...prevMessagesMap,
//               [selectedUser._id]: [
//                 ...(prevMessagesMap[selectedUser._id] || []),
//                 receivedMessage,
//               ],
//             }));
//           }
//         };
//       }
//     }

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.close();
//         socketRef.current = null;
//       }
//     };
//   }, [selectedUser, senderId, isGroupChat]);

//   // Clear messages when a new user or group is selected
//   useEffect(() => {
//     if (selectedUser && !messagesMap[selectedUser._id]) {
//       setMessagesMap((prevMessagesMap) => ({
//         ...prevMessagesMap,
//         [selectedUser._id]: [], // Initialize chat history for the selected user or group
//       }));
//     }
//   }, [selectedUser, messagesMap]);

//   const sendMessage = () => {
//     if (message.trim() && socketRef.current?.readyState === WebSocket.OPEN) {
//       const messageData = {
//         sender: senderId,
//         [isGroupChat ? "groupId" : "receiver"]: selectedUser._id,
//         content: message,
//       };
//       socketRef.current.send(JSON.stringify(messageData));

//       // Update the messages map with the new message
//       setMessagesMap((prevMessagesMap) => ({
//         ...prevMessagesMap,
//         [selectedUser._id]: [
//           ...(prevMessagesMap[selectedUser._id] || []),
//           messageData,
//         ],
//       }));

//       setMessage(""); // Clear the input field after sending the message
//     }
//   };

//   return (
//     <div className="w-full md:w-3/4 p-4 bg-gray-100 flex flex-col justify-between">
//       {selectedUser ? (
//         <>
//           {/* Chat header */}
//           <div className="bg-blue-500 text-white p-3 rounded-md mb-4 shadow-lg flex justify-between items-center">
//             <span>{selectedUser.name}</span>
//             <GroupChatMenu />
//           </div>

//           {/* Chat messages */}
//           <div className="flex-grow overflow-y-auto bg-white p-4 rounded-md shadow-lg mb-4">
//             {!messagesMap[selectedUser._id] ||
//             messagesMap[selectedUser._id].length === 0 ? (
//               <p className="text-gray-500">No messages yet.</p>
//             ) : (
//               messagesMap[selectedUser._id].map((msg, index) => (
//                 <div
//                   key={index}
//                   className={`flex flex-col mb-2 ${
//                     msg.sender === senderId ? "items-end" : "items-start"
//                   }`}
//                 >
//                   <div
//                     className={`p-2 rounded-lg ${
//                       msg.sender === senderId
//                         ? "bg-blue-500 text-white"
//                         : "bg-gray-300 text-black"
//                     } max-w-xs`}
//                   >
//                     {msg.content}
//                   </div>
//                   <span className="text-xs text-gray-500 mt-1">
//                     {msg.sender === senderId ? "You" : selectedUser.name}
//                   </span>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Message input */}
//           <div className="flex items-center">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
//               placeholder={`Message ${selectedUser.name}`}
//             />
//             <button
//               onClick={sendMessage}
//               className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
//             >
//               Send
//             </button>
//           </div>
//         </>
//       ) : (
//         <p className="text-gray-500">Select a user or group to start chatting</p>
//       )}
//     </div>
//   );
// };

// export default ChatWindow;


import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import GroupChatMenu from "../Chattinglist/GroupChatMenu";

const ChatWindow = ({ selectedUser, isGroupChat }) => {
  const [messagesMap, setMessagesMap] = useState({}); // Store chat history per user or group
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);

  const senderId =
    useSelector((state) => state.userId) || localStorage.getItem("userId");

  // WebSocket connection to handle chat messages and chat history
  useEffect(() => {
    if (selectedUser) {
      const websocketURL = isGroupChat
        ? `wss://quick-chat-staging-bt9wd.ondigitalocean.app?userId=${senderId}&groupId=${selectedUser._id}`
        : `wss://quick-chat-staging-bt9wd.ondigitalocean.app?userId=${senderId}&receiverId=${selectedUser._id}`;

      console.log("WebSocket URL:", websocketURL); // Debugging the WebSocket URL

      if (!socketRef.current) {
        socketRef.current = new WebSocket(websocketURL);

        socketRef.current.onopen = () => {
          console.log("WebSocket connection established");

          // Request chat history when the connection is opened
          const historyRequest = {
            type: isGroupChat ? "group_history" : "1to1_history",
            userId: senderId,
            [isGroupChat ? "groupId" : "receiverId"]: selectedUser._id,
          };
          console.log("Requesting chat history:", historyRequest); // Debugging the history request
          socketRef.current.send(JSON.stringify(historyRequest));
        };

        socketRef.current.onerror = (error) => {
          console.error("WebSocket Error:", error);
        };

        socketRef.current.onmessage = (event) => {
          const receivedMessage = JSON.parse(event.data);
          console.log("Received WebSocket message:", receivedMessage); // Debugging received message

          if (receivedMessage.type === (isGroupChat ? "group_history" : "1to1_history")) {
            // Handle chat history for selected user or group
            console.log("Received chat history:", receivedMessage.messages); // Debugging chat history
            setMessagesMap((prevMessagesMap) => ({
              ...prevMessagesMap,
              [selectedUser._id]: receivedMessage.messages,
            }));
          } else if (
            (!isGroupChat && receivedMessage.sender === selectedUser._id) || // 1-to-1 message from selected user
            (isGroupChat && receivedMessage.groupId === selectedUser._id) // Group message for the current group
          ) {
            // Handle real-time chat messages for the current user or group
            console.log("New chat message received:", receivedMessage); // Debugging new messages
            setMessagesMap((prevMessagesMap) => ({
              ...prevMessagesMap,
              [selectedUser._id]: [
                ...(prevMessagesMap[selectedUser._id] || []),
                receivedMessage,
              ],
            }));
          }
        };
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [selectedUser, senderId, isGroupChat]);

  // Clear messages when a new user or group is selected
  useEffect(() => {
    if (selectedUser && !messagesMap[selectedUser._id]) {
      setMessagesMap((prevMessagesMap) => ({
        ...prevMessagesMap,
        [selectedUser._id]: [], // Initialize chat history for the selected user or group
      }));
    }
  }, [selectedUser, messagesMap]);

  const sendMessage = () => {
    if (message.trim() && socketRef.current?.readyState === WebSocket.OPEN) {
      const messageData = {
        sender: senderId,
        content: message,
        [isGroupChat ? "groupId" : "receiver"]: selectedUser._id,
      };
      console.log("Sending message:", messageData); // Debugging message send

      socketRef.current.send(JSON.stringify(messageData));

      // Update the messages map with the new message
      setMessagesMap((prevMessagesMap) => ({
        ...prevMessagesMap,
        [selectedUser._id]: [
          ...(prevMessagesMap[selectedUser._id] || []),
          messageData,
        ],
      }));

      setMessage(""); // Clear the input field after sending the message
    }
  };

  return (
    <div className="w-full md:w-3/4 p-4 bg-gray-100 flex flex-col justify-between">
      {selectedUser ? (
        <>
          {/* Chat header */}
          <div className="bg-blue-500 text-white p-3 rounded-md mb-4 shadow-lg flex justify-between items-center">
            <span>{selectedUser.name}</span>
            <GroupChatMenu />
          </div>

          {/* Chat messages */}
          <div className="flex-grow overflow-y-auto bg-white p-4 rounded-md shadow-lg mb-4">
            {!messagesMap[selectedUser._id] ||
            messagesMap[selectedUser._id].length === 0 ? (
              <p className="text-gray-500">No messages yet.</p>
            ) : (
              messagesMap[selectedUser._id].map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col mb-2 ${
                    msg.sender === senderId ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      msg.sender === senderId
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-black"
                    } max-w-xs`}
                  >
                    {msg.content}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">
                    {msg.sender === senderId ? "You" : selectedUser.name}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Message input */}
          <div className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder={`Message ${selectedUser.name}`}
            />
            <button
              onClick={sendMessage}
              className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <p className="text-gray-500">Select a user or group to start chatting</p>
      )}
    </div>
  );
};

export default ChatWindow;
