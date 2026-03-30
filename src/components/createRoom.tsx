import type React from "react";
import { useContext } from "react";
import { SocketContext } from "../context/socketContext";

const CreateRoom: React.FC = () => {
  const { socket  } = useContext(SocketContext);

  function roomCreate() {
    socket.emit("create-room");
    console.log("room event triggered ")
  }

  return (
    <button
      onClick={() => roomCreate()}
      className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
    >
      Button
    </button>
  );
};

export default CreateRoom;
