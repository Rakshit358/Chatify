import axios from "axios";
import { useEffect, useState } from "react";

export default function ChatPage() {
  const [data, setData] = useState([]);

  const fetchChats = () => {
    axios
      .get("http://localhost:5000/")
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Here");
    fetchChats();
    console.log(data);
  }, []);

  return (
    <div>
      {data.map((d) => {
        return <p key={d._id}>{d.chatName}</p>;
      })}
    </div>
  );
}
