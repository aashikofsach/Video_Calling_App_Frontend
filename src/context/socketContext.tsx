import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Peer from "peerjs";

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

  return (
    <SocketContext.Provider value={{ socket, user, stream }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
