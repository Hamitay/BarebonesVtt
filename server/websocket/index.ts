import { Server, Socket } from "socket.io";
import { ChatMessageHandler } from "./handlers/chat";

// TODO: add config
const WS_PORT = 4000;
const CORS_ALLOW_ORIGIN = "*";

export class WebsocketController {
  #socket: Server;

  #chatMessageHandler: ChatMessageHandler;

  constructor() {
    this.#socket = new Server(WS_PORT, {
      cors: {
        origin: CORS_ALLOW_ORIGIN,
        methods: ["GET", "POST"],
      },
    });

    this.#chatMessageHandler = new ChatMessageHandler();
  }

  setUpHandlers(): void {
    console.log("Setting up websocket handlers");

    const onConnection = (socket: Socket) => {
      console.log(`New connection id: ${socket.id}, setting up handlers`);
      this.#chatMessageHandler.setup(this.#socket, socket);
    };

    this.#socket.on("connection", onConnection);

    console.log("Websocket has successfully setup");
  }
}
