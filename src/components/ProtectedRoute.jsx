import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../hooks/UserAuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUserAuth();

  if (!user) {
    console.log("protected");
    navigate("/");
  }

  return children;
};

export default ProtectedRoute;
