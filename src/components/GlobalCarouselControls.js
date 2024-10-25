// GlobalCarouselControls.js
import React from "react";
import { useCarouselControl } from "./CarouselContext";

const GlobalCarouselControls = () => {
  const {
    activeInstanceCount,
    isGlobalPaused,
    toggleGlobalPause,
    toggleGlobalGridView,
  } = useCarouselControl();

  return (
    <>
      <button onClick={toggleGlobalPause}>
        {isGlobalPaused
          ? `Resume All (${activeInstanceCount})`
          : `Pause All (${activeInstanceCount})`}
      </button>
      <button onClick={toggleGlobalGridView}>
        {`Switch All Carousels to Grid View (${activeInstanceCount})`}
      </button>
    </>
  );
};

export default GlobalCarouselControls;
