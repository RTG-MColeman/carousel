import React, { useEffect, useId, useRef, useState } from 'react';
import { useCarouselControl } from './CarouselContext';
import { GridViewButton, CarouselListItems, GridlListItems, NextPrevControls } from './CarouselComps'

import "../styles/Carousel.scss";

const Carousel = ({
  descriptionTitle: propDescriptionTitle = "Title",
  showSwitch: propShowSwitch = true,
  slides: propSlides = [],
  slideDelayInt: propSlideDelayInt = 3,
  onTranssionEvent: propOnTranssionEvent,
  stopAfter: propStopAfter = 100,
  gridView: propGridView = false,





  ariaLive: propAriaLive = true,
  
  autoPlay: propAutoPlay = true,

  

  
  showControls: propShowControls = true,
  showSlideDots: propShowSlideDots = true,
  showPrevNext: propShowPrevNext = true,
  resetOnStop: propResetOnStop = false,
}) => {

  const uniqueId = useId();
  const ariaLiveRef = useRef(null);

  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(propAutoPlay);
  const [currentSlide, setCurrentSlide] = useState(0);










  const {
    // hooks
    // useAddRemoveHandlers, //removed need for add/remove{X}
    
    // props
    // stopAfter = 100,

    // global variables
    // isMobileView,
    // uniqueIds,
    addUniqueIds,
    removeUniqueIds,

    // announce,
    // globalInstanceCount,
    addGlobalInstanceCount,
    removeGlobalInstanceCount,

    isGlobalGridView,
    // toggleGlobalGridView,

    // isGlobalPaused,
    // toggleGlobalPause,

    // carousel, paused and gridview counts
    // carouselCount,
    // setCarouselCount,
    addCarouselCount,
    removeCarouselCount,

    // pauseCount,
    // setPauseCount,
    addPauseCount,
    removePauseCount,

    gridView,
    // gridViewCount,
    // setGridViewCount,
    setGridView,
    addGridViewCount,
    removeGridViewCount,

    // animation info
    // autoPlay, 
    // updateAutoPlay,
    updateGridView,
    // slideDelayInt,
    updateSlideDelayInt,
    currentSlides,
    setCurrentSlides,
    updateCurrentSlide,

    // controls
    // showControls,
    updateShowControls,
    showPrevNext,
    updateShowPrevNext,
    showSlideDots,
    updateShowSlideDots,
  } = useCarouselControl();

  
  const isInstanceGridView = gridView[uniqueId] ?? false; // Default to false if undefined





  useEffect(() => {
    if (typeof propGridView === 'boolean') {
      setGridView((prev) => {
        if (prev[uniqueId] !== propGridView) {
          return { ...prev, [uniqueId]: propGridView };
        }
        return prev;
      });
    }
  }, [propGridView, uniqueId]);
  

  // Sync local props with global context values
  useEffect(() => {
    updateSlideDelayInt(propSlideDelayInt);
    updateShowControls(propShowControls);
    updateShowSlideDots(propShowSlideDots);
    updateShowPrevNext(propShowPrevNext);
  }, [
    uniqueId,
    propAutoPlay,
    propGridView,
    propSlideDelayInt,
    propShowControls,
    propShowSlideDots,
    propShowPrevNext,
    // updateAutoPlay,
    updateGridView,
    updateSlideDelayInt,
    updateShowControls,
    updateShowSlideDots,
    updateShowPrevNext,
  ]);


useEffect(() => {
  setGridView((prev) => ({
    ...prev,
    [uniqueId]: prev[uniqueId] ?? false, // Ensure entry exists
  }));
}, [uniqueId]);


  
  


  // OnLoad of component:
  // 1) Count Instances.
  // 2) Add Carousel or GridView Counts.
  // 3) Add Paused Count
  useEffect(() => {
    addUniqueIds(uniqueId)
    addGlobalInstanceCount(uniqueId)

    if(propAutoPlay && !propGridView){
      addCarouselCount(uniqueId)
      // if (!autoPlay[uniqueId]) {
      //   updateAutoPlay(uniqueId, !autoPlay[uniqueId])
      // }
    }
    if(!propAutoPlay && !propGridView){
      addPauseCount(uniqueId)
    }

    if(propGridView){
      addGridViewCount(uniqueId)
    }



    return () => {
      removeUniqueIds(uniqueId)
      removeGlobalInstanceCount(uniqueId);

      if(propAutoPlay){
        removeCarouselCount(uniqueId)
      }else{
        removePauseCount(uniqueId)
      }

      if(propGridView){
        removeGridViewCount(uniqueId)
      }
      
    };
  }, []); // Empty array ensures this runs only once on mount and unmount















  


  // Handling Autoplay Timing and Counting Slides
  // Purpose: Runs a timer when autoplay is active, incrementing slides at each interval.
  const hasMounted = useRef(false);
  /* prettier-ignore */
  //TODO: working here
  useEffect(() => {
    
  
    if (propAutoPlay && !propGridView && !isGlobalGridView) {
      console.log("useEffect running with currentSlide:", currentSlide);
  
      const intervalId = setInterval(() => {
        setCurrentSlide((prev) => {
          const newSlideIndex = (prev + 1) % propSlides.length;
          
          // Check if the component has mounted to safely update currentSlides
          if (hasMounted.current) {
            setTimeout(() => {
              setCurrentSlides((prevSlides) => {
                if (prevSlides[uniqueId] !== newSlideIndex) {
                  console.log("Directly updating current slides in useEffect for uniqueId:", uniqueId);
                  return { ...prevSlides, [uniqueId]: newSlideIndex };
                }
                return prevSlides;
              });
            }, 0); // Defer state update to avoid updating during render
          }
  
          return newSlideIndex;
        });
      }, propSlideDelayInt * 1000);
  
      // Mark as mounted after the first render cycle
      hasMounted.current = true;
  
      // Cleanup function to clear the interval when the component unmounts or dependencies change
      return () => clearInterval(intervalId);
    }
  }, [propAutoPlay, propGridView, isGlobalGridView, uniqueId, propSlides, currentSlide, propSlideDelayInt]);
  
  
  // HAS CONSOLE ERROR
  // useEffect(() => {
  //   let mounted = true; // Assume the component is mounted
  
  //   let intervalId;
  //   if (propAutoPlay && !propGridView && !isGlobalGridView) {
  //     intervalId = setInterval(() => {
  //       if (mounted) {
  //         setCurrentSlide((prev) => {
  //           const newSlideIndex = (prev + 1) % propSlides.length;
  
  //           if (!propGridView && !isGlobalGridView) {
  //             updateCurrentSlide(uniqueId, newSlideIndex);
  //           }
  
  //           return newSlideIndex;
  //         });
  
  //         setCount((prevCount) => {
  //           const newCount = prevCount + 1;
  //           if (newCount >= propStopAfter) {
  //             setIsPlaying(false); // Stop autoPlay after reaching the limit
  //             clearInterval(intervalId);
  //           }
  //           return newCount;
  //         });
  //       }
  //     }, propSlideDelayInt * 1000);
  //   }
  
  //   // Cleanup function to clear the interval when component unmounts or conditions change
  //   return () => {
  //     mounted = false; // Mark as unmounted
  //     if (intervalId) clearInterval(intervalId);
  //   };
  // }, [propAutoPlay, propGridView, isGlobalGridView, uniqueId, propSlides, propStopAfter, propSlideDelayInt]);
  
  
  // useEffect(() => {
  //   let intervalId;

  //   if(propAutoPlay && !propGridView){
  //     intervalId = setInterval(() => {
  //       setCurrentSlide((prev) => (prev + 1) % propSlides.length);
  //       setCount((prevCount) => {
  //         const newCount = prevCount + 1;
  //         if (newCount >= propStopAfter) {
  //           setIsPlaying(false); // Stop autoPlay after 100 transitions
  //           // announce(`Carousel for ${descriptionTitle} Stopped`);
  //         }
  //         return newCount;
  //       });
  //     }, propSlideDelayInt * 1000);
  
  //     return () => clearInterval(intervalId);
  //   }
  // }, [propAutoPlay, propGridView, propSlides, propDescriptionTitle, propStopAfter, propSlideDelayInt,]);


























  // Trigger the propOnTranssionEvent callback when relevant values change
  // Purpose: Allows functional interjection points for SEO or other needs
  /* prettier-ignore */
  useEffect(() => {
    if (propOnTranssionEvent) {
      propOnTranssionEvent({ propDescriptionTitle, propSlides, currentSlide, count, propStopAfter });
    }
  }, [propDescriptionTitle, propSlides, propOnTranssionEvent, currentSlide, count, propStopAfter]);








// TODO: commented out to fix console error - NEEDED?
  // Sync currentSlide with the global context whenever it changes
  // Prevent useEffect from updating state continuously
  // useEffect(() => {
  //   if (currentSlides[uniqueId] !== currentSlide) {
  //     updateCurrentSlide(uniqueId, currentSlide);
  //   }
  // }, [uniqueId, currentSlide, currentSlides, updateCurrentSlide]);


  








  // HANDLE EVENTS
  const handleKeyDown = (event) => {}
  const handlePlay = (event) => {}
  const handlePause = (event) => {}
  const handleFocus = (event) => {}
  const handleBlur = (event) => {}

  // NAVIGATION EVENTS
  const handlePrev = (event) => {}
  const handleNext = (event) => {}
  const handleDotClick = (event) => {}

  return (
    <div className="carousel-container">
      <span id={`${uniqueId}_title`} className="hide508">
        {propDescriptionTitle}
      </span>

      {/* ARIA live region for announcements */}
      TODO: Make sure this renders only once with the first control
      {propAriaLive && (
        <>
          <span className="hide508" aria-live="polite" ref={ariaLiveRef}></span>
          <span id="carouselAdditionalInstructions" className="hide508">
            Use arrow keys to navigate between slides.
          </span>
        </>
      )}
      
      {/* Grid View Toggle Button */}
      {propShowSwitch && (
        <GridViewButton uniqueId={uniqueId} gridView={propGridView} />
      )}
      
      {isGlobalGridView || isInstanceGridView ? (
        <GridlListItems
          uniqueId={uniqueId}
          slides={propSlides}
          currentSlide={currentSlide}
          propGridView={propGridView}
          handleKeyDown={handleKeyDown}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
      ) : (
        <CarouselListItems
          uniqueId={uniqueId}
          slides={propSlides}
          currentSlide={currentSlide}
          propGridView={propGridView}
          handleKeyDown={handleKeyDown}
          handlePlay={handlePlay}
          handlePause={handlePause}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
      )}

      {/* Carousel Previous Play/Pause {dots} Next */}
      {!isInstanceGridView && (
        <NextPrevControls
          slides={propSlides}
          resetOnStop={propResetOnStop}
          currentSlide={currentSlide}
          showPrevNext={showPrevNext}
          showSlideDots={showSlideDots}
          handlePause={handlePause}
          handlePlay={handlePlay}
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleDotClick={handleDotClick}
        />
      )}

    </div>
  );
};

export default Carousel;
