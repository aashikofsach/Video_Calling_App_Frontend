import React, { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Peer from "peerjs";
import { peerReducer } from "../Reducers/peerReducer";

const WS_Server = "http://localhost:5500";

const socket: Socket = io(WS_Server);

export const SocketContext = createContext<Socket | null>(null);
// export const SocketContext = createContext<{ socket: Socket; user?: Peer; stream?: MediaStream } | null>(null);

interface Props {
  children: React.ReactNode;
}

const fetchParticipantsList = ({
  room,
  participants,
}: {
  room: string;
  participants: string[];
}) => {
  console.log(room, participants);
};

// }
const SocketProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  // state variable to store the new user Id , every time when new user join the room
  const [user, setUser] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});

  const fetchUserFeed = async () => {
    // below one is browser api and not the react thing
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setStream(stream);
  };

  useEffect(() => {
    const userId = uuidv4();

    const newPeer = new Peer(userId, {
      host: "localhost",
      port: 9000,
      path: "/myapp",
    });

    setUser(newPeer);
    fetchUserFeed();

    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", enterRoom);

    socket.on("get-users", fetchParticipantsList);
  }, []);

  // below code bhi like ki new user ki peerId ko hum already present user call karenge

  useEffect(() => {
    if (!user || !stream) return;
    socket.on("user-joined", ({ peerId }) => {
      const call = user.call(peerId, stream);
      console.log("calling the new peer ", peerId);
    });

    user.on("call", (call) => {
      // this event is what new user do to other already present user ,  when new user present

      console.log("recieving a call");
      call.answer(stream);
    });
    // this below event emit when the new user is joined ()
    // here new user is joined with his user peer id and stream , that' why we emit this emit event here
    // so that backend(SFU user ) can tell other sockets in room to make communicatioon with this
    // new user

    socket.emit("ready");
  }, [user, stream]);

  return (
    <SocketContext.Provider value={{ socket, user, stream }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
