import styled from "styled-components";

const ChatContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  flexBasis: "20%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

export default ChatContainer;
