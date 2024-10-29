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
    announce // Access announce function from context
  } = useCarouselControl();

  // Generate a space-separated string of IDs for aria-describedby
  const mapIdsForAria = uniqueIds.map((id) => `${id}_title`).join(" ");

  return (
    <div>
      {activeInstanceCount !== 0 && (
        <button
          onClick={() => {
            toggleGlobalPause();
            announce(`${isGlobalPaused ? "Played" : "Paused"} All (${instanceCount}) Carousel Instances`);
          }}
          aria-describedby={mapIdsForAria}
        >
          {isGlobalPaused
            ? `Resume All (${instanceCount})`
            : `Pause All (${activeInstanceCount})`}
        </button>
      )}
      <button
        onClick={() => {
          toggleGlobalGridView();
          announce(`${isGlobalGridView ? "Carousel view enabled" : "Grid view enabled"} for All (${instanceCount}) Instances`);
        }}
        aria-describedby={mapIdsForAria}
      >
        {isGlobalGridView
          ? `Restore All to Carousel View (${instanceCount})`
          : `Switch All to Grid View (${activeInstanceCount})`}
      </button>
    </div>
  );
};

export default GlobalCarouselControls;
