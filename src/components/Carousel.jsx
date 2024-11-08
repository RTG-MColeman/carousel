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
  autoPlay: propAutoPlay = true,
  ariaLive: propAriaLive = true,
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
    addUniqueIds,
    removeUniqueIds,
    addGlobalInstanceCount,
    removeGlobalInstanceCount,
    isGlobalGridView,
    addCarouselCount,
    removeCarouselCount,
    playingStatus, 
    setPlayingStatus,
    autoPlay,
    addPlayCount,
    pauseCount,
    addPauseCount,
    removePauseCount,
    gridView,
    setGridView,
    updateGridView,
    addGridViewCount,
    removeGridViewCount,
    updateSlideDelayInt,
    setCurrentSlides,
    updateShowControls,
    showPrevNext,
    updateShowPrevNext,
    showSlideDots,
    updateShowSlideDots,
  } = useCarouselControl();

  //use useCarouselControl variables
  const isInstanceGridView = gridView[uniqueId] ?? false;
  const isPlaying = playingStatus[uniqueId] && !pauseCount.includes(uniqueId);

  
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
    updateGridView,
    updateSlideDelayInt,
    updateShowControls,
    updateShowSlideDots,
    updateShowPrevNext,
  ]);


useEffect(() => {
  if (!playingStatus[uniqueId] && autoPlay) {
    // Set the initial play state to true if autoPlay is true and not yet set
    setPlayingStatus((prev) => ({ ...prev, [uniqueId]: true }));
  }
}, [uniqueId, autoPlay, setPlayingStatus]);


  


  // OnLoad of component:
  // 1) Count Instances.
  // 2) Add Carousel or GridView Counts.
  // 3) Add Paused Count
  useEffect(() => {
    addUniqueIds(uniqueId)
    addGlobalInstanceCount(uniqueId)

    if(propAutoPlay && !propGridView){
      addCarouselCount(uniqueId)
      addPlayCount(uniqueId)
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

  useEffect(() => {
    if (propAutoPlay && !propGridView && !isGlobalGridView && isPlaying) {
      const intervalId = setInterval(() => {
        setCurrentSlide((prev) => {
          const newSlideIndex = (prev + 1) % propSlides.length;

          if (hasMounted.current) {
            setTimeout(() => {
              setCurrentSlides((prevSlides) => {
                if (prevSlides[uniqueId] !== newSlideIndex) {
                  return { ...prevSlides, [uniqueId]: newSlideIndex };
                }
                return prevSlides;
              });
            }, 0);
          }

          return newSlideIndex;
        });
      }, propSlideDelayInt * 1000);

      hasMounted.current = true;

      return () => clearInterval(intervalId);
    }
  }, [isPlaying, propAutoPlay, propGridView, isGlobalGridView, uniqueId, propSlides, propSlideDelayInt, pauseCount]);

























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
          slides={propSlides}
        />
      ) : (
        <CarouselListItems
          uniqueId={uniqueId}
          slides={propSlides}
          currentSlide={currentSlide}
          propGridView={propGridView}
          handleKeyDown={handleKeyDown}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
        />
      )}

      {/* Carousel Previous Play/Pause {dots} Next */}
      {!isInstanceGridView && (
        <NextPrevControls
          uniqueId={uniqueId}
          isPlaying={isPlaying}
          slides={propSlides}
          resetOnStop={propResetOnStop}
          currentSlide={currentSlide}
          showPrevNext={showPrevNext}
          showSlideDots={showSlideDots}
          handlePrev={handlePrev}
          handleNext={handleNext}
          handleDotClick={handleDotClick}
        />
      )}

    </div>
  );
};

export default Carousel;
