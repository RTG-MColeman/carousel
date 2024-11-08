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

  //use useCarouselControl variables
  const isInstanceGridView = gridView[uniqueId] ?? false;





  

  //sync props with global
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





  
  


  // OnLoad of component:
  // 1) Count Instances.
  // 2) Add Carousel or GridView Counts.
  // 3) Add Paused Count
  useEffect(() => {
    addUniqueIds(uniqueId)
    addGlobalInstanceCount(uniqueId)

    if(propAutoPlay && !propGridView){
      addCarouselCount(uniqueId)
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
  }, []); //empty[] to run once




  useEffect(() => {
    //force gridview entry
    setGridView((prev) => ({
      ...prev,
      [uniqueId]: prev[uniqueId] ?? false,
    }));
  }, [uniqueId]);
  
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










  


  // Handling Autoplay Timing and Counting Slides
  // Purpose: Runs a timer when autoplay is active, incrementing slides at each interval.
  const hasMounted = useRef(false);
  /* prettier-ignore */
  useEffect(() => {
    if (propAutoPlay && !propGridView && !isGlobalGridView) {
  
      const intervalId = setInterval(() => {
        setCurrentSlide((prev) => {
          const newSlideIndex = (prev + 1) % propSlides.length;
          
          //has component mounted to safely update currentSlides
          if (hasMounted.current) {
            setTimeout(() => {
              setCurrentSlides((prevSlides) => {
                if (prevSlides[uniqueId] !== newSlideIndex) {
                  return { ...prevSlides, [uniqueId]: newSlideIndex };
                }
                return prevSlides;
              });
            }, 0); //delay state update to avoid updating during render
          }
  
          return newSlideIndex;
        });
      }, propSlideDelayInt * 1000);
  
      //mark as mounted after the first render
      hasMounted.current = true;
  
      //clear timer when unmounts
      return () => clearInterval(intervalId);
    }
  }, [propAutoPlay, propGridView, isGlobalGridView, uniqueId, propSlides, currentSlide, propSlideDelayInt]);
  
  
  
























  // Trigger the propOnTranssionEvent callback when relevant values change
  // Purpose: Allows functional interjection points for SEO or other needs
  /* prettier-ignore */
  useEffect(() => {
    if (propOnTranssionEvent) {
      propOnTranssionEvent({ propDescriptionTitle, propSlides, currentSlide, count, propStopAfter });
    }
  }, [propDescriptionTitle, propSlides, propOnTranssionEvent, currentSlide, count, propStopAfter]);






  





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
      
      {/* Grid View Toggle Button */}
      {propShowSwitch && (
        <GridViewButton uniqueId={uniqueId} gridView={propGridView} />
      )}
      
      {isInstanceGridView ? (
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
