import React, { createContext } from "react";
import { io, Socket } from "socket.io-client";

const WS_Server = "http://localhost:5500";

const socket: Socket = io(WS_Server);

export const SocketContext = createContext<Socket | null>(null);

interface Props {
  children: React.ReactNode;
}

const SocketProvider: React.FC<Props> = ({ children }) => {
  return (
    <SocketContext.Provider value={{socket}}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
