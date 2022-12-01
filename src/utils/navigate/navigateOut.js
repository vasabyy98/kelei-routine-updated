import {
  fadeInPageTransition,
  fadeOutPageTransition,
  fadeOutTransition,
  fadeInTransition,
} from "../animations/pageTransition";

export const navigateOutFunction = (url) => {
  const navigateFunc = () => {
    navigate(url);
  };
  fadeOutPageTransition(navigateFunc);
};
