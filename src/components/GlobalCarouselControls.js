import React from "react";
import { useCarouselControl } from "./CarouselContext";

const GlobalCarouselControls = () => {
  const {
    // hooks
    // useAddRemoveHandlers, //removed need for add/remove{X}
    
    // props
    // stopAfter = 100,
    
    // global variables
    // isMobileView,
    uniqueIds,
    // addUniqueIds,
    // removeUniqueIds,

    // announce,
    globalInstanceCount,
    // addGlobalInstanceCount,
    // removeGlobalInstanceCount,

    isGlobalGridView,
    toggleGlobalGridView,

    isGlobalPaused,
    toggleGlobalPause,

    // carousel, paused and gridview counts
    carouselCount,
    // setCarouselCount,
    // addCarouselCount,
    // removeCarouselCount,

    pauseCount,
    // setPauseCount,
    // addPauseCount,
    // removePauseCount,

    gridViewCount,
    // setGridViewCount,
    // addGridViewCount,
    // removeGridViewCount,

    // animation info
    // autoPlay,
    // updateAutoPlay,
    // slideDelayInt,
    // updateSlideDelayInt,
    // currentSlides,


    // controls
    // showControls,
    // updateShowControls,
    // showPrevNext,
    // updateShowPrevNext,
    // showSlideDots,
    // updateShowSlideDots,
  } = useCarouselControl();

  const mapIdsForAria = uniqueIds.map((id) => `${id}_title`).join(" ");

  // console.log("isGlobalPaused:",isGlobalPaused, "isGlobalGridView:",isGlobalGridView)
  return (
    <div>
      <button onClick={toggleGlobalPause} aria-describedby={mapIdsForAria}>
        {pauseCount.length === 0
          ? `Pause All Carousels: Currently: `
          : `Resume All Carousels Playing. Currently:`}
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
