export type NewMessageDTO = {
  content: {
    text: string;
    uuid: string;
  };
  authorId: string;
  gameId: string;
};
