import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import PageLayout from "../common/components/PageLayout";
import Chat from "../containers/Chat";
import { AuthContext } from "../context/authContext";
import { urls } from "../routes";

const TableCanvaContainer = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  flexGrow: 2,
  height: "100%",
  color: "white",
}));

const PageContainer = styled(PageLayout)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));

const TableView = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    //return <Navigate to={urls.loginUrl()} replace />;
  }

  return (
    <PageContainer>
      <TableCanvaContainer>
        {`Table View + ${user?.username}`}
      </TableCanvaContainer>
      <Chat />
    </PageContainer>
  );
};

export default TableView;
