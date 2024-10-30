import React, { useEffect } from "react";
import { useCarouselControl } from "./CarouselContext";

const GlobalCarouselControls = () => {
  const {
    uniqueIds,

    isGlobalPaused,
    toggleGlobalPause,

    isGlobalGridView,
    toggleGlobalGridView,

    globalInstanceCount,
    addGlobalInstanceCount,
    removeGlobalInstanceCount,

    carouselActiveCount,
    addCarouselActiveCount,
    removeCarouselActiveCount,

    carouselPauseCount,
    addCarouselPauseCount,
    removeCarouselPauseCount,

    instanceCount,

    incrementInstanceCount,
    decrementInstanceCount,
  } = useCarouselControl();

  // Generate a space-separated string of IDs for aria-describedby
  const mapIdsForAria = uniqueIds.map((id) => `${id}_title`).join(" ");

  useEffect(() => {
    console.log("Updated carouselPauseCount:", carouselPauseCount);
  }, [carouselPauseCount]); // Logs when carouselPauseCount updates

  return (
    <div>
      {!isGlobalGridView && (
        <button
          onClick={() => {
            toggleGlobalPause();
          }}
          aria-describedby={mapIdsForAria}
        >
          {isGlobalGridView || carouselPauseCount.length === 0
            ? `Resume All Carousels Playing. Currently:(${carouselPauseCount.length}) of (${globalInstanceCount.length})`
            : `Pause All Carousels: Currently:(${carouselPauseCount.length}) of (${globalInstanceCount.length})`}
        </button>
      )}

      <button
        onClick={() => {
          toggleGlobalGridView();
        }}
        aria-describedby={mapIdsForAria}
      >
        {carouselActiveCount.length === 0
          ? "Restore All to Carousel View. Currently:"
          : "Switch All to Grid View. Currently:"}
        ({carouselActiveCount.length}) of ({globalInstanceCount.length})
      </button>
    </div>
  );
};

export default GlobalCarouselControls;
