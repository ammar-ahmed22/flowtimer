import React, { useContext } from "react";
import ModeContext from "../../context";
import BreakDisplay from "./BreakDisplay";
import WorkDisplay from "./WorkDisplay";

const ModeDisplay: React.FC = () => {
  const { mode } = useContext(ModeContext);

  if (mode === "work") {
    return (
      <WorkDisplay />
    )
  } else {
    return (
      <BreakDisplay />
    )
  }
}

export default ModeDisplay;