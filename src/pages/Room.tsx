import type React from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../context/socketContext";
import UserFeedPlayer from "../components/UserFeedPlayer";

const Room: React.FC = () => {
  const { id } = useParams();
  const { socket, user, stream, peers } = useContext(SocketContext);
  console.log("here we have the user as ", user , "coming in peers ", peers);

  useEffect(() => {
    // this message we sent when the new user create the room and joined and also
    // when the some other user is entering  in the room which is laready created
    // console.log("yeh bhi chalna chahiye tha ",user)
    if (user && id) 
    {
      user.on("open", ()=>{

         socket.emit("joined-room", { roomId: id, peerId : user._id });
      })

     

    }
    console.log(peers, "Our Peers");
  }, [user, socket, id]);
  return (
    <div>
      <p>room is : {id} </p>
      <h1>Below Stream is own user feed</h1>
      <UserFeedPlayer stream={stream} />
      <div>
        <h2>Below Streams is for other users</h2>
        <div>
          {Object.keys(peers).map((peerId) => (
            <UserFeedPlayer key={peerId} stream={peers[peerId].stream} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Room;
