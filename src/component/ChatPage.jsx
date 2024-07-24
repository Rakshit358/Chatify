import { useEffect, useState } from "react";
import ChatCard from "./Chatcard";
import InputBox from "./InputBox";
import Avatar from "./Avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const endpoint = "http://localhost:5000";
var socket, selectedChatCompare;

export default function ChatPage() {
  const [chatSelected, setChatSelected] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [chatId, setChatId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Inside use effect");
    socket = io(endpoint);
    const userId = localStorage.getItem("userId");
    socket.emit("setup", userId);
    socket.on("connection", () => {
      setSocketConnected(true);
      console.log(`Here inside ${socketConnected}`);
    });
  }, []);

  async function getAllUsers() {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("http://localhost:5000/api/user/", config);
    console.log(data);
    setUsers(data);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  // useEffect(() => {
  //   socket.on("message received", (newMessageReceived) => {
  //     console.log(`The new message recieved is ${newMessageReceived}`);
  //     setMessages([...messages, newMessageReceived]);
  //   });
  // });

  async function fetchMessages() {
    if (!chatSelected) return;
    const token = localStorage.getItem("token");
    console.log(`chatId is ${chatId}`);
    console.log(`token is ${token}`);

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { data } = await axios.get(
      `http://localhost:5000/api/message/${chatId}`,
      config
    );
    console.log(data[0]);
    setMessages(
      data.map((message) => ({ text: message.content, type: "received" }))
    );
    console.log(messages);
    console.log("The data received is " + data[0].content);
  }

  useEffect(() => {
    fetchMessages();
    // selectedChatCompare =
  }, [chatSelected]);

  async function handleChatClick(e, user) {
    e.preventDefault();
    console.log(user);
    console.log("Handle chat clicked called");
    const token = localStorage.getItem("token");
    const userId = user._id;
    const body = {
      userId: userId,
    };
    console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/api/chat",
      body,
      config
    );

    console.log(`Data from here`);
    console.log(data);

    setChatId(data._id);
    setChatSelected(user);
    socket.emit("join chat", chatId);
  }

  function handleOnChange(e) {
    setMessage(e.target.value);
  }

  async function handleSendClick(e) {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/message",
        {
          content: message,
          chatId: chatId,
        },
        config
      );
      console.log("Success");
      console.log(data);
      const newMessage = {
        text: message,
        type: "sent",
      };
      messages.push(newMessage);
      socket.emit("new message", data);
      setMessage("");
    } catch (error) {}
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
