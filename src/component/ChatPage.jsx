import { useEffect, useState } from "react";
import ChatCard from "./Chatcard";
import InputBox from "./InputBox";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const endpoint = "http://localhost:5000";
// var socket, selectedChatCompare;

export default function ChatPage() {
  const [chatSelected, setChatSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log("Inside use effect");
  //   const socket = io(endpoint);
  //   socket.emit("setup", "669e4e108ead953bfbae42c4");
  // }, []);

  async function getAllUsers() {
    const { data } = await axios.get("http://localhost:5000/api/user/");
    console.log(data);
    setUsers(data);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  // Dummy data
  const dummyUsers = [
    { id: 1, name: "User1" },
    { id: 2, name: "User2" },
    { id: 3, name: "User3" },
  ];

  const dummyChats = {
    1: [
      { id: 1, text: "Hello, how are you?", type: "received" },
      { id: 2, text: "I'm good, thanks!", type: "sent" },
    ],
    2: [
      { id: 3, text: "Are you coming to the party?", type: "received" },
      { id: 4, text: "Yes, I'll be there!", type: "sent" },
    ],
    3: [
      { id: 5, text: "What time is the meeting?", type: "received" },
      { id: 6, text: "It's at 10 AM.", type: "sent" },
    ],
  };

  async function handleChatClick(e, user) {
    e.preventDefault();
    console.log("Handle chat clicked called");
    const token = localStorage.getItem("token");
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get("http://localhost:5000/api/chat", config);

    console.log(`Data from here`);
    console.log(data);
    setChatSelected(user);
    setMessages(dummyChats[user.id] || []);
  }

  function handleOnChange(e) {
    setMessage(e.target.value);
  }

  function handleSendClick(e) {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, type: "sent" },
      ]);
      setMessage("");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    console.log("log out");
    navigate("/");
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-none w-1/3 m-2 flex flex-col">
        <div className="flex items-start">
          <button
            onClick={handleLogout}
            className="text-gray-700 text-xl font-bold"
          >
            Logout
          </button>
        </div>
        {users.map((user) => (
          <ChatCard
            key={user._id}
            id={user._id}
            name={user.name}
            onClick={(e) => handleChatClick(e, user)}
          />
        ))}
      </div>
      <div className="flex-grow w-2/3 bg-white flex flex-col justify-between">
        {chatSelected ? (
          <div className="flex flex-col flex-grow">
            <div className="bg-gray-300 p-4 flex gap-4">
              <div>
                <Avatar />
              </div>
              <h1 className="text-lg text-teal-900 font-bold">
                {chatSelected.name}
              </h1>
            </div>
            <div className="flex-grow p-4 flex flex-col gap-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.type === "sent" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      msg.type === "sent"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-black"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="min-h-screen items-center flex justify-center">
            <h1 className="p-4 text-gray-700 text-2xl font-bold">
              Select a chat
            </h1>
          </div>
        )}
        <div className="p-4">
          <InputBox
            value={message}
            onChange={handleOnChange}
            onClick={handleSendClick}
          />
        </div>
      </div>
    </div>
  );
}
