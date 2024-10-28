import React from "react";
import { useCarouselControl } from "./CarouselContext";

const GlobalCarouselControls = () => {
  const {
    uniqueIds,
    instanceCount,
    activeInstanceCount,
    toggleGlobalPause,
    toggleGlobalGridView,
    isGlobalPaused,
    isGlobalGridView,
  } = useCarouselControl();

  // Generate a space-separated string of IDs for aria-describedby
  const mapIdsForAria = uniqueIds.map((id) => `${id}_title`).join(" ");

  return (
    <div>
      {activeInstanceCount !== 0 && (
        <button onClick={toggleGlobalPause} aria-describedby={mapIdsForAria}>
          {isGlobalPaused
            ? `Resume All (${instanceCount})`
            : `Pause All (${activeInstanceCount})`}
        </button>
      )}
      <button onClick={toggleGlobalGridView} aria-describedby={mapIdsForAria}>
        {isGlobalGridView
          ? `Restore All to Carousel View (${instanceCount})`
          : `Switch All to Grid View (${activeInstanceCount})`}
      </button>
    </div>
  );
};

export default GlobalCarouselControls;
