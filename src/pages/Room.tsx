import type React from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socketContext";

const Room: React.FC = () => {
  const { id } = useParams();
  const { socket, user } = useContext(SocketContext);
  console.log("here we have the user as ", user);

  useEffect(() => {
    // this message we sent when the new user create the room and joined and also
    // when the some other user is entering  in the room which is laready created
    if (user) socket.emit("joined-room", { roomId: id, peerId: user._id });
  }, [user,socket,id]);
  return <div>room is : {id} </div>;
};
export default Room;
