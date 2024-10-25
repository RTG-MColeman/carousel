// GlobalPauseButton.js
import React from "react";
import { useCarouselControl } from "./CarouselContext";

const GlobalPauseButton = () => {
  const { isGlobalPaused, activeInstanceCount, toggleGlobalPause } =
    useCarouselControl();

  return (
    <button className="" onClick={toggleGlobalPause}>
      {isGlobalPaused
        ? `Resume All (${activeInstanceCount})`
        : `Pause All (${activeInstanceCount})`}
    </button>
  );
};

export default GlobalPauseButton;
