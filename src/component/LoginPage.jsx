import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: userName,
          password: password,
        }
      );
      console.log(data);
      localStorage.setItem("token", data.token);
      alert("User saved successfully");
      navigate("/chatscreen");
    } catch (error) {
      console.log(error);
      alert("login failed try again later");
    }
    console.log(userName);
    console.log(password);
    setUserName("");
    setPassWord("");
  };
  return (
    <div className="flex flex-col absolute bottom-16 right-[-104px]">
      <label className="ml-4">Email</label>
      <input
        className="bg-gray-300 m-4 h-[35px]"
        type="text"
        value={userName}
        onChange={handleUserNameChange}
      ></input>
      <label className="ml-4">Password</label>
      <input
        className="bg-gray-300 m-4 h-[35px]"
        type="password"
        value={password}
        onChange={(e) => setPassWord(e.target.value)}
      ></input>
      <button
        className="bg-blue-300 hover:bg-blue-600 h-[30px] w-[80px] absolute top-48 right-14 rounded-md"
        onClick={handleSubmit}
      >
        Login
      </button>
    </div>
  );
}
