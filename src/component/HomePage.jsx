import { Container } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
// port LoginPage from "./LoginPage";
import "./HomePage.css";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
export default function HomePage() {
  const [activeTab, setActiveTab] = useState(1);

  const handleClick = (idx) => {
    setActiveTab(idx);
  };

  return (
    <div className="h-screen w-screen min-h-screen flex  justify-center relative p-3 gap-4">
      <div className="bg-white w-[100vh] h-[40px] absolute flex justify-center items-center font-mono text-xl rounded-md">
        Chatify
      </div>
      <div className="bg-white w-[100vh] h-[450px] absolute m-16 flex justify-center font-mono rounded-md">
        <h2 className="pt-4 text-xl"> Start Your Chats </h2>
        <div className="flex flex-row justify-between px-20 absolute bg-white w-[100vh] h-[40px] top-12">
          <button
            className={`
             rounded-md
             w-[60px]
             ${activeTab === 1 ? "hover:bg-blue-700" : "hover:bg-gray-700"}
            ${
              activeTab === 1
                ? "border-blue-500 bg-blue-500 text-white"
                : `bg-gray-400`
            }`}
            onClick={() => handleClick(1)}
          >
            Login
          </button>
          <button
            className={`
             rounded-md
             w-[60px]
             ${activeTab === 2 ? "hover:bg-blue-700" : "hover:bg-gray-600"}
            ${
              activeTab === 2
                ? `border-blue-500 bg-blue-500 text-white`
                : `bg-gray-400`
            }`}
            onClick={() => handleClick(2)}
          >
            Signup
          </button>
        </div>
        {/* <div className="flex flex-row relative"> */}
        <div className="absolute bottom-16 flex flex-col gap-4">
          {activeTab === 1 && <LoginPage />}
          {activeTab === 2 && <SignUpPage />}
        </div>
      </div>
    </div>
  );
}
