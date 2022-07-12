import React from "react";
import io, { Socket } from "socket.io-client";

type SocketContextType = {
  socket: Socket;
};

export const SocketContext = React.createContext({} as SocketContextType);

export const useSocketContext = () => {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error("Undefined socket context!");
  }

  return context;
};

export const SocketContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const socket = io("ws://localhost:4000");

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
