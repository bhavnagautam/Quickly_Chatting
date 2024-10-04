import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import GroupChatMenu from "../Chattinglist/GroupChatMenu"; // Assuming you have this component

const ChatwindowGroup = ({ selectedGroup }) => {
  const [messagesMap, setMessagesMap] = useState({}); // Store chat history per group
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);
  const senderId = useSelector((state) => state.userId) || localStorage.getItem("userId");

  useEffect(() => {
    const setupWebSocket = () => {
      if (!selectedGroup || !selectedGroup._id) {
        console.error("selectedGroup is null or does not have an _id");
        return;
      }

      // WebSocket URL for group chat
      const websocketURL = `wss://quick-chat-staging-bt9wd.ondigitalocean.app?userId=${senderId}&groupId=${selectedGroup._id}`;
      socketRef.current = new WebSocket(websocketURL);

      socketRef.current.onopen = () => {
        console.log("WebSocket connection established for group chat");
      };

      socketRef.current.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data);
        console.log("Message received from WebSocket:", incomingMessage);

        if (incomingMessage.type === "group_history") {
          // Handle group chat history
          if (incomingMessage.messages && incomingMessage.messages.length > 0) {
            console.log("Group chat history:", incomingMessage.messages);
            setMessagesMap((prevMessagesMap) => ({
              ...prevMessagesMap,
              [selectedGroup._id]: incomingMessage.messages, // Store messages for the selected group
            }));
          } else {
            console.log("No messages found for this group.");
          }
        } else if (incomingMessage.type === "new_message") {
          // Handle new incoming messages for group chats
          setMessagesMap((prevMessagesMap) => ({
            ...prevMessagesMap,
            [selectedGroup._id]: [
              ...(prevMessagesMap[selectedGroup._id] || []),
              incomingMessage, // Add new message to chat history
            ],
          }));
        }
      };

      socketRef.current.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      socketRef.current.onclose = () => {
        console.log("WebSocket connection closed for group chat");
      };
    };

    if (senderId && selectedGroup) {
      setupWebSocket();
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [selectedGroup, senderId]);

  const sendMessage = () => {
    console.log("Current message:", message); // Log the current message
    if (!message.trim()) {
      console.error("Message is empty");
      return;
    }

    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not open, cannot send message");
      return;
    }

    const messageData = {
      sender: senderId,
      content: message,
      groupId: selectedGroup._id,
      type: "new_message",
    };

    console.log("Sending message:", messageData); // Log the message being sent

    try {
      socketRef.current.send(JSON.stringify(messageData));
      setMessagesMap((prevMessagesMap) => ({
        ...prevMessagesMap,
        [selectedGroup._id]: [
          ...(prevMessagesMap[selectedGroup._id] || []),
          messageData,
        ],
      }));
      setMessage(""); // Clear input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="w-full md:w-3/4 bg-gray-100 flex flex-col justify-between">
      {selectedGroup ? (
        <>
          <div className="bg-blue-500 text-white p-3 rounded-md mb-4 shadow-lg flex justify-between items-center">
            <span>{selectedGroup.name}</span>
            <GroupChatMenu />
          </div>

          <div className="flex-grow overflow-y-auto bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-md shadow-lg mb-4">
            {!messagesMap[selectedGroup._id] || messagesMap[selectedGroup._id].length === 0 ? (
              <p className="text-gray-500">No messages yet.</p>
            ) : (
              messagesMap[selectedGroup._id].map((msg, index) => (
                <div key={index} className={`flex flex-col mb-2 ${msg.sender === senderId ? "items-end" : "items-start"}`}>
                  <div className={`p-2 rounded-lg ${msg.sender === senderId ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} max-w-xs`}>
                    {msg.content}
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{msg.sender === senderId ? "You" : msg.sender}</span>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder={`Message ${selectedGroup.name}`}
            />
            <button onClick={sendMessage} className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none">
              Send
            </button>
          </div>
        </>
      ) : (
        <p className="p-4">Select a group to start chatting</p>
      )}
    </div>
  );
};

export default ChatwindowGroup;
