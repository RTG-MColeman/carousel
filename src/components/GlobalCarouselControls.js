import React from "react";
import { useCarouselControl } from "./CarouselContext";

const GlobalCarouselControls = () => {
  const {
    uniqueIds,
    globalInstanceCount,
    isGlobalGridView,
    toggleGlobalGridView,
    isGlobalPaused,
    toggleGlobalPause,
    carouselCount,
    gridViewCount,
  } = useCarouselControl();

  const mapIdsForAria = uniqueIds.map((id) => `${id}_title`).join(" ");

  return (
    <div>
      <button onClick={toggleGlobalPause} aria-describedby={mapIdsForAria}>
        {isGlobalPaused
          ? `Resume All Carousels Playing. Currently: `
          : `Pause All Carousels: Currently: `}
          ({carouselCount.length}) of ({carouselCount.length}) - ({isGlobalPaused.toString()})
      </button>
      
      <button onClick={toggleGlobalGridView} aria-describedby={mapIdsForAria}>
        {isGlobalGridView
          ? `Restore All to Carousel View. Currently: `
          : `Switch All to Grid View. Currently: `}
        ({gridViewCount.length}) of ({globalInstanceCount.length})
      </button>
    </div>
  );
};

export default GlobalCarouselControls;
