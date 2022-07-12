import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GameView } from "../views/GameView";
import LoginView from "../views/LoginView";
import TableView from "../views/TableView";

export const urls = {
  tableUrl: () => "/table",
  gameUrl: () => "/games",
  loginUrl: () => "/",
};

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path={urls.tableUrl()} element={<TableView />} />
      <Route path={urls.gameUrl()} element={<GameView />} />
      <Route path={urls.loginUrl()} element={<LoginView />} />
    </Routes>
  </BrowserRouter>
);
