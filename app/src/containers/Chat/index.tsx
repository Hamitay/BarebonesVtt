import { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useSocketContext } from "../../context/socketContext";
import ChatLayout from "./components/ChatLayout";
import { ChatMessage } from "./components/ChatMessage";
import { Message } from "./types/Message";

type MessageListProps = {
  messages?: Message[];
};

const MessageListContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  borderRadius: theme.borderRadius,
  borderWidth: "1px",
  borderColor: "green",
  borderStyle: "solid",
  flexBasis: "85%",
}));

const ChatInputContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  flexBasis: "15%",
  padding: 10,
}));

const StyledChatInput = styled.textarea(({ theme }) => ({
  resize: "none",
}));

type ChatInputProps = {
  handleMessageSubmit: (messageContent: string) => void;
};

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <MessageListContainer>
      {messages?.map((m) => (
        <ChatMessage
          key={m.uuid}
          content={m.content}
          type={m.type}
        ></ChatMessage>
      ))}
    </MessageListContainer>
  );
};

const ChatInput: React.FC<ChatInputProps> = ({ handleMessageSubmit }) => {
  const [messageContent, setMessageContent] = useState<string>("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageContent(e.target.value);
  };

  const messageSubmit = (messageContent: string) => {
    handleMessageSubmit(messageContent);
    setMessageContent("");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    messageSubmit(messageContent);
  };

  const commentEnterSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.shiftKey == false) {
      e.preventDefault();
      messageSubmit(messageContent);
    }
  };

  return (
    <ChatInputContainer>
      <form id="messageForm" onSubmit={handleFormSubmit}>
        <StyledChatInput
          name="message"
          onKeyPress={commentEnterSubmit}
          form="messageForm"
          onChange={handleTextChange}
          value={messageContent}
          rows={5}
        />

        <input type="submit" value="Send message " />
      </form>
    </ChatInputContainer>
  );
};

const Chat = () => {
  const { socket } = useSocketContext();
  const [messages, setMessages] = useState<Message[] | undefined>();

  const sendMessage = (message: string) => {
    socket.emit("message:chat", { message });
  };

  const handleMessageReceived = useCallback(
    (newMessage: Message) => {
      const newMessages = messages ? [...messages, newMessage] : [newMessage];
      setMessages(newMessages);
    },
    [messages]
  );

  useEffect(() => {
    // Set socket
    socket.on("message:received", (args: any) => {
      handleMessageReceived(args);
    });

    // Pull existing messages from persistence layer
  }, [socket, handleMessageReceived]);

  const handleMessageSubmit = (messageContent: string) => {
    sendMessage(messageContent);
  };

  return (
    <ChatLayout>
      <MessageList messages={messages} />
      <ChatInput handleMessageSubmit={handleMessageSubmit} />
    </ChatLayout>
  );
};

export default Chat;
