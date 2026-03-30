import React, { createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

const WS_Server = "http://localhost:5500";

const socket: Socket = io(WS_Server);

export const SocketContext = createContext<Socket | null>(null);

interface Props {
  children: React.ReactNode;
}

const SocketProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate() ;
  useEffect(()=>{
    const enterRoom = ({roomId} : {roomId : string})=>{
      navigate(`/room/${roomId}`)
    }

    socket.on('room-created', enterRoom)

  }, [])

  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
