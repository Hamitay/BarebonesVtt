import styled from "styled-components";

export enum ChatMessageType {
  TEXT = "TEXT",
  ROLL = "ROLL",
}

type ChatMessageProps = {
  content: string;
  type: ChatMessageType;
};

type CommonMessageProps = {
  content: string;
};

const ChatMessageCard = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  margin: 10,
  borderColor: theme.palette.border.color,
  borderRadius: theme.borderRadius,
  borderWidth: "2px",
  borderStyle: "solid",
  boxShadow: "0 0 10px" + " " + theme.palette.border.color,
  color: theme.palette.border.color,
}));

const TextChatMessage: React.FC<CommonMessageProps> = ({ content }) => {
  return <div>{content}</div>;
};

const RollChatMessage: React.FC<CommonMessageProps> = ({ content }) => {
  return <div>{content}</div>;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ content, type }) => {
  const MessageComponent =
    type === ChatMessageType.TEXT ? TextChatMessage : RollChatMessage;

  return (
    <ChatMessageCard>
      <MessageComponent content={content} />
    </ChatMessageCard>
  );
};
