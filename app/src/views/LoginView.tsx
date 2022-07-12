import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const LoginView = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnClick = () => {
    login("Admin");
    navigate("/game");
  };

  return <button onClick={handleOnClick}>Login</button>;
};

export default LoginView;
