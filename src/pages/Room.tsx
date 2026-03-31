import type React from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import UserFeedPlayer from "../components/UserFeedPlayer";

const Room: React.FC = () => {
  const { id } = useParams();
  const { socket, user, stream } = useContext(SocketContext);
  console.log("here we have the user as ", user);

  useEffect(() => {
    // this message we sent when the new user create the room and joined and also
    // when the some other user is entering  in the room which is laready created
    // console.log("yeh bhi chalna chahiye tha ",user)
    if (user) socket.emit("joined-room", { roomId: id, peerId: user._id });
  }, [user, socket, id]);
  return (
    <div>
      <p>room is : {id} </p>
      <UserFeedPlayer stream={stream} />
    </div>
  );
};
export default Room;
