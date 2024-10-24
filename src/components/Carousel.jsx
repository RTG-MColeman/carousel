import React, { useState, useEffect, useRef, useId } from "react";
import PropTypes from "prop-types";
import { ImageSlide, NextPrevControls, taskDone } from "./CarouselComps";
import "../styles/Carousel.scss";

// Track component instances globally
let instanceCount = 0;

const Carousel = ({
  descriptionTitle = "Title",
  slides = [],
  onlyImages = true,
  cellsToShow = 1,
  ariaLive = true,
  isGridView = false,
  showGridButton = true,
  autoplay = false,
  stopAfter = 100,
  slideDelayInt = 3,
  showControls = true,
  showSlideDots = true,
  showPrevNext = true,
  resetOnStop = false,
  onTranssionEvent,
}) => {
  const uniqueId = useId(); // Automatically generates a unique ID
  const [isFirstInstance, setIsFirstInstance] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);
  const [gridView, setGridView] = useState(isGridView);
  const [isFocused, setIsFocused] = useState(false);
  const [count, setCount] = useState(0);
  const slideContainer = useRef(null);
  const ariaLiveRef = useRef(null);
  const slideRefs = useRef([]);

  const announce = (text) => {
    if (ariaLive && ariaLiveRef?.current) {
      ariaLiveRef.current.textContent = text;
    }
  }

  // Track how many instances of the component are on the page
  useEffect(() => {
    instanceCount += 1;

    // Mark this as the first instance
    if (instanceCount === 1) {
      setIsFirstInstance(true);
    }

    // Cleanup on unmount
    return () => {
      instanceCount -= 1;
    };
  }, []);

  // Trigger the onTranssionEvent callback when relevant values change
  /* prettier-ignore */
  useEffect(() => {
    if (onTranssionEvent) {
      onTranssionEvent({ slides, currentSlide, count, stopAfter, gridView, isFocused });
    }
  }, [slides, currentSlide, count, stopAfter, gridView, isFocused, onTranssionEvent]);

  // Slide change logic with autoplay and counting
  /* prettier-ignore */
  useEffect(() => {
    let intervalId;
    if (isPlaying && !gridView) {
      intervalId = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount >= stopAfter) {
            setIsPlaying(false); // Stop autoplay after 100 transitions
            announce(`Carousel for ${descriptionTitle} Stopped`);
          }
          return newCount;
        });
      }, slideDelayInt * 1000);
    }

    return () => clearInterval(intervalId);
  }, [isPlaying, gridView, stopAfter, slides.length, slideDelayInt, announce, descriptionTitle]);

  // Announce slide changes for aria-live
  useEffect(() => {
    if (isFirstInstance && ariaLive && ariaLiveRef.current) {
      ariaLiveRef.current.textContent = `Slide ${currentSlide + 1} of ${
        slides.length
      }`;
    }

    // Add events to listen for CSS transition
    const container = slideContainer.current;
    const movementStart = () => {
      handleTransitionStart(currentSlide);
    };
    const movementEnd = () => {
      handleTransitionEnd(currentSlide);
    };
    if (container) {
      container.addEventListener("transitionstart", movementStart);
      container.addEventListener("transitionend", movementEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener("transitionstart", movementStart);
        container.removeEventListener("transitionend", movementEnd);
      }
    };
  }, [currentSlide, ariaLive, slides.length, isFirstInstance]);

  // Listen for CSS animation start/end
  const handleTransitionStart = (currentSlide) => {
    // console.log("Transition has begun!", currentSlide);
    // Do something after the transition ends
  };
  const handleTransitionEnd = (currentSlide) => {
    // console.log("Transition has ended!", currentSlide);
    // Do something after the transition ends
  };

  // Play, Pause, and Stop controls
  const handlePlay = (event) => {
    announce(`Carousel for ${descriptionTitle} Play`);
    setIsPlaying(true);

    if(count >= stopAfter) setCount(1)
  };
  const handlePause = (event) => {
    setIsPlaying(false);
    announce(`Carousel for ${descriptionTitle} Stopped`);
    if (event?._reactName === "onMouseEnter") return;

    if (resetOnStop) {
      setCurrentSlide(0);
    }
  };

  const handleFocus = (event, index, currentSlide) => {
    setIsPlaying(false);
    setIsFocused(true);
    // setCurrentSlide(index);
  };

  // Keydown slides blur event
  const handleBlur = () => {
    if (isFocused) {
      setIsFocused(false);
    }
  };

  const handleKeyDown = (event) => {
    if (gridView) return; // Disable keydown in gridView

    let newSlide;
    const setSlideDelay = (newSlide) => {
      setCurrentSlide(newSlide);

      /* prettier-ignore */
      taskDone(() => {
        if (slideRefs.current[newSlide]) {
          slideRefs.current[newSlide].firstChild.focus();
        }
      }, 250, "focusSlide");
    };

    if (event.key === "ArrowLeft" || event.keyCode === 37) {
      event.preventDefault();
      newSlide =
        (currentSlide - 1 + slideRefs.current.length) %
        slideRefs.current.length;

      setSlideDelay(newSlide);
    } else if (event.key === "ArrowRight" || event.keyCode === 39) {
      event.preventDefault();
      newSlide = (currentSlide + 1) % slideRefs.current.length;

      setSlideDelay(newSlide);
    }
  };

  // Toggle between carousel and grid views
  const toggleGridView = () => {
    setGridView(!gridView);
  };

  // Handle next and previous slide actions
  const handleNext = () => {
    if (gridView) return; // Disable next in gridView
    setIsPlaying(false);
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    if (gridView) return; // Disable prev in gridView
    setIsPlaying(false);
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  // Handle dot click to navigate to specific slide
  const handleDotClick = (index) => {
    if (gridView) return; // Disable dot click in gridView
    setIsPlaying(false);
    setCurrentSlide(index);
  };

  return (
    <div className="carousel-container">
      <span id={`${uniqueId}_title`} className="hide508">
        {descriptionTitle}
      </span>

      {/* ARIA live region for announcements */}
      {isFirstInstance && ariaLive && (
        <>
          <span className="hide508" aria-live="polite" ref={ariaLiveRef}></span>
          <span id="carouselAdditionalInstructions" className="hide508">
            Use arrow keys to navigate between slides.
          </span>
        </>
      )}

      {/* Grid View Toggle Button */}
      {showGridButton && (
        <div className="carousel-switch-view">
          <button className="carousel-switch-btn" onClick={toggleGridView}>
            {gridView ? "Switch to Carousel View" : "Switch to Grid View"}
          </button>
        </div>
      )}

      {/* Carousel or Grid View */}
      <div className={gridView ? "grid-view" : "carousel-view"}>
        {!gridView ? (
          <ul
            ref={slideContainer}
            className="carousel"
            aria-describedby={`${uniqueId}_title carouselAdditionalInstructions`}
          >
            {slides.map((slide, index) => {
              let slideClass = "";

              if (index === currentSlide) {
                slideClass = "active";
              } else if (
                index ===
                (currentSlide - 1 + slides.length) % slides.length
              ) {
                slideClass = "previous";
              } else if (index === (currentSlide + 1) % slides.length) {
                slideClass = "next";
              }

              return (
                <li
                  ref={(el) => (slideRefs.current[index] = el)}
                  key={index}
                  className={`carousel-slide ${slideClass}`}
                  onKeyDown={handleKeyDown}
                  // tabIndex={index === currentSlide ? "0" : "1"}
                  // aria-hidden={index !== currentSlide ? "true" : null}
                  // inert={index !== currentSlide ? "true" : null}
                >
                  {onlyImages ? (
                    <ImageSlide
                      currentSlide={currentSlide}
                      slide={slide}
                      index={index}
                      handlePlay={handlePlay}
                      handlePause={handlePause}
                      handleFocus={handleFocus}
                      handleBlur={handleBlur}
                    />
                  ) : (
                    <h2>html stuff</h2>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="grid">
            {slides.map((slide, index) => (
              <li key={index} className="grid-item">
                {onlyImages ? (
                  <ImageSlide
                    gridView={gridView}
                    currentSlide={currentSlide}
                    slide={slide}
                    index={index}
                    handleFocus={handleFocus}
                    handleBlur={handleBlur}
                  />
                ) : (
                  <h2>html stuff</h2>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Carousel Previous Play/Pause {dots} Next */}
      {!gridView && showControls && (
        <NextPrevControls
          isPlaying={isPlaying}
          resetOnStop={resetOnStop}
          handlePause={handlePause}
          handlePlay={handlePlay}
          handleDotClick={handleDotClick}
          handlePrev={handlePrev}
          handleNext={handleNext}
          slides={slides}
          currentSlide={currentSlide}
          showPrevNext={showPrevNext}
          showSlideDots={showSlideDots}
        />
      )}
    </div>
  );
};

Carousel.propTypes = {
  descriptionTitle: PropTypes.string.isRequired, // default: 'Title' - When multiple instances of the control are used it is best to give them a unique name for accessibility reasons
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired, // Slides array containing objects with image and alt keys
  onlyImages: PropTypes.bool, // default: true - If carousel slides are only images
  cellsToShow: PropTypes.number, // default: 1 - Number of columns per-slide
  ariaLive: PropTypes.bool, // default: true - 508 Announce slide change
  isGridView: PropTypes.bool, // default: false - Turns slides into top stacked content on load
  showGridButton: PropTypes.bool, // default: true - Show toggle for stacked content or carousel
  autoplay: PropTypes.bool, // default: true - Play slides on load
  stopAfter: PropTypes.number, // default: 100 - Used to prevent the carousel from transsioning forever
  slideDelayInt: PropTypes.number, // default: 3 - Delay in seconds for autoplay
  showControls: PropTypes.bool, // default: true - Show Play, Pause, Stop controls
  showSlideDots: PropTypes.bool, // default: true - Show the slide dot navigation
  showPrevNext: PropTypes.bool, // default: true - Show Previous / Next Buttons
  resetOnStop: PropTypes.bool, // default: true - Stop on current slide or reset to the first slide
  onTranssionEvent: PropTypes.func, // default: null - Will trigger when a slide starts to transsion
};

export default Carousel;
