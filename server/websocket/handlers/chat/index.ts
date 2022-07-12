import { Server, Socket } from "socket.io";
import crypto from "crypto";
import { WebsocketHandler } from "../WebsocketHandler";
import DiceRollerService from "../../../core/diceroller/DiceRollerService";
import gameService from "../../../core/game/gameService";
import { NewMessageDTO } from "../../../core/message/types";

const EVENTS = {
  MESSAGE_RECEIVED: "message:received",
  NEW_CHAT_MESSAGE: "message:chat",
};

const ROLL_PATTERN = /^(\/r)/;

interface TextMessage {
  message: string;
  gameId: string;
  authorId: string;
}

type NewTextMessage = {
  uuid: string;
  content: string;
  type: MessageType;
};

enum MessageType {
  ROLL = "ROLL",
  TEXT = "TEXT",
}

export class ChatMessageHandler implements WebsocketHandler {
  #diceRollerService: DiceRollerService;

  constructor() {
    this.#diceRollerService = new DiceRollerService();
  }

  #buildRollMessage(messageContent: string) {
    const rollFormula = messageContent.replace(ROLL_PATTERN, "").trim();
    return "You rolled: " + this.#diceRollerService.roll(rollFormula);
  }

  #sendMessageToClients(server: Server, message: NewTextMessage) {
    server.emit(EVENTS.MESSAGE_RECEIVED, message);
  }

  #inferMessageType(messageContent: string) {
    if (messageContent.match(ROLL_PATTERN)) {
      return MessageType.ROLL;
    }

    return MessageType.TEXT;
  }

  #processMessageContent(messageContent: string, messageType: MessageType) {
    if (messageType === MessageType.TEXT) {
      return messageContent;
    }

    return this.#buildRollMessage(messageContent);
  }

  #buildHandler(server: Server) {
    const handler = async (payload: TextMessage) => {
      const { message, authorId, gameId } = payload;

      const messageType = this.#inferMessageType(message);
      const processedText = this.#processMessageContent(message, messageType);

      const messageUuid = crypto.randomUUID();

      const newMessageResponse = {
        uuid: messageUuid,
        content: processedText,
        type: messageType,
      };

      const newMessageDto: NewMessageDTO = {
        content: {
          text: processedText,
          uuid: messageUuid,
        },
        gameId,
        authorId,
      };

      await gameService.addMessageToGame(newMessageDto);

      this.#sendMessageToClients(server, newMessageResponse);
    };

    return handler;
  }

  setup(server: Server, socket: Socket): void {
    socket.on(EVENTS.NEW_CHAT_MESSAGE, this.#buildHandler(server));
  }
}
