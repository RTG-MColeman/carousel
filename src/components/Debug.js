import React from "react";
import { useCarouselControl } from "./CarouselContext";

export const Debug = () => {
  const {
    // hooks
    // useAddRemoveHandlers, //removed need for add/remove{X}

    // props
    // stopAfter = 100,
    
    // global variables
    isMobileView,
    uniqueIds,
    // addUniqueIds,
    // removeUniqueIds,

    // announce,
    globalInstanceCount,
    // addGlobalInstanceCount,
    // removeGlobalInstanceCount,

    isGlobalGridView,
    // toggleGlobalGridView,

    isGlobalPaused,
    // toggleGlobalPause,

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
    autoPlay,
    // updateAutoPlay,
    slideDelayInt,
    // updateSlideDelayInt,
    currentSlides,


    // controls
    showControls,
    // updateShowControls,
    showPrevNext,
    // updateShowPrevNext,
    showSlideDots,
    // updateShowSlideDots,
  } = useCarouselControl();

  return (
    <div
      className="debug-window"
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 1000,
      }}
    >
      <h3>Debug Window</h3>
      <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
        {JSON.stringify(
          {
            // props
            // stopAfter = 100,
            
            // global variables
            //working: isMobileView,
            //working: uniqueIds,
            autoPlay,
            //working: slideDelayInt,



            // announce,
            globalInstanceCount,


            isGlobalGridView,
            isGlobalPaused,


            // paused and gridview counts
            carouselCount,
            pauseCount,
            gridViewCount,

            // animation info
            
            // updateAutoPlay,
            
            // updateSlideDelayInt,
            currentSlides,


            // controls
            showControls,
            // updateShowControls,
            showPrevNext,
            // updateShowPrevNext,
            showSlideDots,
            // updateShowSlideDots,
          }, null, 2 )
        }
      </pre>
    </div>
  );
};
