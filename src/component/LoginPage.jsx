import { useState } from "react";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName);
    console.log(password);
    setUserName("");
    setPassWord("");
  };
  return (
    <div className="flex flex-col absolute bottom-16 right-[-104px]">
      <label className="ml-4">Username</label>
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
