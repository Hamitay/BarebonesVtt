export enum ChatMessageType {
  TEXT = "TEXT",
  ROLL = "ROLL",
}

export type Message = {
  content: string;
  uuid: string;
  type: ChatMessageType;
};
