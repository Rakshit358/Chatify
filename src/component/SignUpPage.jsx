import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (!userName || !email || !password || !confirmPass) {
      alert("Please fill all the required details");
    }

    if (password != confirmPass) {
      alert("Password does not match");
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/user",
        { name: userName, email: email, password: password },
        config
      );
      localStorage.setItem("token", data.token);
      alert("User saved successfully");
      navigate("/chatscreen");
    } catch (error) {
      console.log(error);
      alert("Error registering the user try again later");
    }

    setUserName("");
    setEmail("");
    setPassWord("");
    setConfirmPass("");
  };

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <div className="flex flex-col">
      <label className="ml-4">Username</label>
      <input
        className="bg-gray-300 m-2 h-[35px]"
        type="text"
        value={userName}
        onChange={handleUserNameChange}
      ></input>
      <label className="ml-4">Email</label>
      <input
        className="bg-gray-300 m-2 h-[35px]"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <label className="ml-4">Password</label>
      <input
        className="bg-gray-300 m-2 h-[35px]"
        type="password"
        value={password}
        onChange={(e) => setPassWord(e.target.value)}
      ></input>
      <label className="ml-4">Confirm Password</label>
      <input
        className="bg-gray-300 m-2 h-[35px]"
        type="password"
        value={confirmPass}
        onChange={(e) => setConfirmPass(e.target.value)}
      ></input>
      <button
        className="bg-blue-300 hover:bg-blue-600 h-[30px] w-[80px] absolute top-80 right-14 rounded-md"
        onClick={handleSubmitRegister}
      >
        Sign-up
      </button>
    </div>
  );
}
