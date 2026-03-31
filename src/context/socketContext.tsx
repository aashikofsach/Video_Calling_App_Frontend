import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Peer from "peerjs";

const WS_Server = "http://localhost:5500";

const socket: Socket = io(WS_Server);

export const SocketContext = createContext<Socket | null>(null);

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
const SocketProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();

  // state variable to store the new user Id , every time when new user join the room
  const [user, setUser] = useState<Peer>();

  useEffect(() => {
    const userId = uuidv4();

    const newPeer = new Peer(userId);

    setUser(newPeer);

    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", enterRoom);

    socket.on("get-users", fetchParticipantsList);
  }, []);

  return (
    <SocketContext.Provider value={{ socket, user }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
