import { Server, Socket } from "socket.io";

export interface WebsocketHandler {
  setup(server: Server, socket: Socket): void;
}
