import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const useDimension = () => {
  const [width, setWidth] = useState(Dimensions.get("window").width);
  const [height, setHeight] = useState(Dimensions.get("window").height);

  useEffect(() => {
    Dimensions.addEventListener("change", ({ window, screen }) => {
      setWidth(window.width);
      setHeight(window.height);
    });

    return () =>
      Dimensions.removeEventListener("change", ({ window, screen }) => {
        setWidth(window.width);
        setHeight(window.height);
      });
  }, []);

  return { width, height };
};

export default useDimension;
