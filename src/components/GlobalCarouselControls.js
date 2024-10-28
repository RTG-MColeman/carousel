import React from "react";
import { useCarouselControl } from "./CarouselContext";

const GlobalCarouselControls = () => {
  const {
    activeInstanceCount,
    toggleGlobalPause,
    toggleGlobalGridView,
    isGlobalPaused,
    isGlobalGridView,
  } = useCarouselControl();

  return (
    <div>
      {activeInstanceCount !== 0 && (
        <button onClick={toggleGlobalPause}>
          {isGlobalPaused ? "Resume All" : `Pause All (${activeInstanceCount})`}
        </button>
      )}
      <button onClick={toggleGlobalGridView}>
        {isGlobalGridView
          ? `Restore All to Carousel View (${activeInstanceCount})`
          : `Switch All to Grid View (${activeInstanceCount}) Instances`}
      </button>
    </div>
  );
};

export default GlobalCarouselControls;
