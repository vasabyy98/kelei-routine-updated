import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// utils
import { fadeOutPageTransition } from "../utils/animations/pageTransition";
// auth status hook
import { useAuthListener } from "../hooks/authStatus";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { currentUser } = useAuthListener();

  // console.log(currentUser);

  const navigateOutFunction = (url) => {
    const navigateFunc = () => {
      navigate(url);
    };
    fadeOutPageTransition(navigateFunc);
  };

  if (!user) {
    console.log("protected");
    navigateOutFunction("/");
  }

  return children;
};

export default ProtectedRoute;
