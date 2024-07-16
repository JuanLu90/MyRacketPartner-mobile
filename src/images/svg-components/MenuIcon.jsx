import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const MenuIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    height={128}
    viewBox="0 0 72 72"
    {...props}
  >
    <Path
      d="M56 48a4 4 0 0 1 0 8H16a4 4 0 0 1 0-8h40zm0-16a4 4 0 0 1 0 8H16a4 4 0 0 1 0-8h40zm0-16a4 4 0 0 1 0 8H16a4 4 0 0 1 0-8h40z"
      fill={props.pathFill || "currentColor"}
    />
  </Svg>
);
